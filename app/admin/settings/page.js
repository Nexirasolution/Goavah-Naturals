"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    storeName: "KMC Organic Farm",
    email: "admin@kmcorganicfarm.com",
    phone: "",
    whatsapp: "",
    address: "",

    shippingFee: "49",
    freeShipping: "999",
    deliveryTime: "2-4 Days",

    instagram: "",
    facebook: "",
    youtube: "",

    seoTitle: "KMC Organic Farm",
    seoDescription: "",

    maintenanceMode: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleReset = () => {
    setSettings({
      storeName: "KMC Organic Farm",
      email: "admin@kmcorganicfarm.com",
      phone: "",
      whatsapp: "",
      address: "",

      shippingFee: "49",
      freeShipping: "999",
      deliveryTime: "2-4 Days",

      instagram: "",
      facebook: "",
      youtube: "",

      seoTitle: "KMC Organic Farm",
      seoDescription: "",

      maintenanceMode: false,
    });
  };

  const saveSettings = () => {
    console.log(settings);

    // TODO:
    // await fetch("/api/settings", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(settings),
    // });

    alert("Settings Saved Successfully!");
  };

  return (
    <div className="min-h-screen bg-[#F8F7F2] p-5 md:p-8">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-8">
          Store Settings
        </h1>

        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Store Name */}
            <div className="md:col-span-2">
              <label className="font-semibold block mb-2">
                Store Name
              </label>

              <input
                type="text"
                name="storeName"
                value={settings.storeName}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-600 outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="font-semibold block mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="font-semibold block mb-2">
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                value={settings.phone}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            {/* WhatsApp */}
            <div>
              <label className="font-semibold block mb-2">
                WhatsApp Number
              </label>

              <input
                type="text"
                name="whatsapp"
                value={settings.whatsapp}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            {/* Delivery */}
            <div>
              <label className="font-semibold block mb-2">
                Delivery Time
              </label>

              <input
                type="text"
                name="deliveryTime"
                value={settings.deliveryTime}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="font-semibold block mb-2">
                Address
              </label>

              <textarea
                rows={3}
                name="address"
                value={settings.address}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            {/* Shipping */}
            <div>
              <label className="font-semibold block mb-2">
                Shipping Fee (₹)
              </label>

              <input
                type="number"
                name="shippingFee"
                value={settings.shippingFee}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            {/* Free Shipping */}
            <div>
              <label className="font-semibold block mb-2">
                Free Shipping Above (₹)
              </label>

              <input
                type="number"
                name="freeShipping"
                value={settings.freeShipping}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            {/* Instagram */}
            <div>
              <label className="font-semibold block mb-2">
                Instagram
              </label>

              <input
                type="url"
                name="instagram"
                value={settings.instagram}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            {/* Facebook */}
            <div>
              <label className="font-semibold block mb-2">
                Facebook
              </label>

              <input
                type="url"
                name="facebook"
                value={settings.facebook}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            {/* YouTube */}
            <div className="md:col-span-2">
              <label className="font-semibold block mb-2">
                YouTube
              </label>

              <input
                type="url"
                name="youtube"
                value={settings.youtube}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            {/* SEO Title */}
            <div className="md:col-span-2">
              <label className="font-semibold block mb-2">
                SEO Title
              </label>

              <input
                type="text"
                name="seoTitle"
                value={settings.seoTitle}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            {/* SEO Description */}
            <div className="md:col-span-2">
              <label className="font-semibold block mb-2">
                SEO Description
              </label>

              <textarea
                rows={4}
                name="seoDescription"
                value={settings.seoDescription}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            {/* Maintenance */}
            <div className="md:col-span-2 flex items-center gap-3">
              <input
                type="checkbox"
                name="maintenanceMode"
                checked={settings.maintenanceMode}
                onChange={handleChange}
                className="h-5 w-5"
              />

              <label className="font-semibold">
                Enable Maintenance Mode
              </label>
            </div>

          </div>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">

            <button
              onClick={saveSettings}
              className="rounded-xl bg-green-700 px-8 py-3 font-semibold text-white transition hover:bg-green-800"
            >
              Save Settings
            </button>

            <button
              onClick={handleReset}
              className="rounded-xl border border-gray-300 bg-white px-8 py-3 font-semibold hover:bg-gray-100"
            >
              Reset
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}