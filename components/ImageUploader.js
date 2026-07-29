"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export default function ImageUploader({ images, onChange, folder = "kmc-products", multiple = true }) {
  const inputRef = useRef();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function handleFiles(e) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setUploading(true);
    setError("");

    try {
      const uploaded = [];
      for (const file of files) {
        const base64 = await fileToBase64(file);
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64, folder }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Upload failed.");
        uploaded.push(data);
      }
      onChange(multiple ? [...images, ...uploaded] : uploaded);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function removeImage(idx) {
    onChange(images.filter((_, i) => i !== idx));
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {images.map((img, idx) => (
          <div key={img.publicId || idx} className="relative h-20 w-20 overflow-hidden rounded-lg border border-gold/30">
            <Image src={img.url} alt="" fill className="object-cover" />
            <button
              type="button"
              onClick={() => removeImage(idx)}
              className="absolute right-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-ink/70 text-[10px] text-ivory"
            >
              ×
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex h-20 w-20 flex-col items-center justify-center rounded-lg border border-dashed border-gold/40 text-xs text-muted hover:bg-champagne"
        >
          {uploading ? "..." : "+ Add"}
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={handleFiles}
        className="hidden"
      />
      {error && <p className="mt-2 text-xs text-terracotta">{error}</p>}
    </div>
  );
}
