"use client";

import { useRef, useState } from "react";
import Image from "next/image";

// Resizes/compresses an image file in the browser before upload.
// Skips GIFs (so animation isn't lost) and anything that isn't an image.
// This is usually the single biggest win for upload speed: a 6MB phone
// photo commonly comes down to 200-500KB with no visible quality loss.
async function compressImage(file, { maxDimension = 1600, quality = 0.82 } = {}) {
  if (!file.type.startsWith("image/") || file.type === "image/gif") {
    return file;
  }

  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));

    // Already small enough - don't bother re-encoding
    if (scale >= 1) {
      bitmap.close?.();
      return file;
    }

    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close?.();

    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", quality)
    );

    if (!blob) return file;

    // Keep it as a File so it still has a sensible name/extension
    const newName = file.name.replace(/\.[^/.]+$/, "") + ".jpg";
    return new File([blob], newName, { type: "image/jpeg" });
  } catch {
    // If compression fails for any reason, fall back to the original file
    // rather than blocking the upload.
    return file;
  }
}

export default function MediaUploader({
  media = [],
  onChange,
  folder = "abi-products",
  multiple = true,
}) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [error, setError] = useState("");

  async function handleFiles(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setUploading(true);
    setError("");
    setProgress({ done: 0, total: files.length });

    try {
      // 1. Ask our server for ONE signed upload, shared across every file in
      // this batch (they're all going to the same folder/timestamp, so one
      // signature is valid for all of them - no need to ask per file).
      const sigRes = await fetch("/api/upload-signature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder }),
      });

      const sigText = await sigRes.text();
      let sigData;
      try {
        sigData = JSON.parse(sigText);
      } catch {
        throw new Error(
          `Could not get upload permission (server said: "${sigText.slice(0, 100)}")`
        );
      }
      if (!sigRes.ok) {
        throw new Error(sigData.error || "Signature request failed");
      }

      const { signature, timestamp, apiKey, cloudName, folder: signedFolder } = sigData;

      if (!apiKey || !cloudName) {
        throw new Error("Cloudinary is not configured correctly on the server.");
      }

      // 2. Compress (images only) and upload every file IN PARALLEL instead
      // of one-by-one.
      const uploadOne = async (file) => {
        const mediaType = file.type.startsWith("video/") ? "video" : "image";
        const uploadFile = mediaType === "image" ? await compressImage(file) : file;

        const cloudForm = new FormData();
        cloudForm.append("file", uploadFile);
        cloudForm.append("api_key", apiKey);
        cloudForm.append("timestamp", timestamp);
        cloudForm.append("signature", signature);
        cloudForm.append("folder", signedFolder);

        const uploadRes = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/${mediaType}/upload`,
          { method: "POST", body: cloudForm }
        );

        const uploadText = await uploadRes.text();
        let uploadData;
        try {
          uploadData = JSON.parse(uploadText);
        } catch {
          throw new Error(
            `Upload failed (Cloudinary said: "${uploadText.slice(0, 150)}")`
          );
        }

        if (!uploadRes.ok) {
          throw new Error(uploadData.error?.message || "Upload failed");
        }

        setProgress((p) => ({ ...p, done: p.done + 1 }));

        return {
          url: uploadData.secure_url,
          publicId: uploadData.public_id,
          mediaType,
        };
      };

      const results = await Promise.allSettled(files.map(uploadOne));

      const uploaded = results
        .filter((r) => r.status === "fulfilled")
        .map((r) => r.value);

      const failed = results.filter((r) => r.status === "rejected");
      if (failed.length) {
        setError(
          failed.length === files.length
            ? failed[0].reason?.message || "All uploads failed"
            : `${failed.length} of ${files.length} file(s) failed to upload`
        );
      }

      if (uploaded.length) {
        onChange(multiple ? [...media, ...uploaded] : uploaded);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      setProgress({ done: 0, total: 0 });
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  function removeMedia(index) {
    onChange(media.filter((_, i) => i !== index));
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {media.map((item, index) => (
          <div
            key={item.publicId || index}
            className="relative h-24 w-24 overflow-hidden rounded-lg border"
          >
            {item.mediaType === "video" ? (
              <video
                src={item.url}
                className="h-full w-full object-cover"
                controls
              />
            ) : item.url ? (
              <Image
                src={item.url}
                alt="Product image"
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                No image
              </div>
            )}

            <button
              type="button"
              onClick={() => removeMedia(index)}
              className="absolute right-1 top-1 h-5 w-5 rounded-full bg-black text-white"
            >
              ×
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex h-24 w-24 items-center justify-center rounded-lg border border-dashed text-center text-xs disabled:opacity-60"
        >
          {uploading
            ? progress.total > 1
              ? `Uploading ${progress.done}/${progress.total}`
              : "Uploading..."
            : "+ Add"}
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        multiple={multiple}
        onChange={handleFiles}
        className="hidden"
      />

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}