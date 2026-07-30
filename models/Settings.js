// models/Settings.js
import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema(
  {
    storeName: { type: String, default: "KMC Iyarkai Creation" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    whatsapp: { type: String, default: "" },
    address: { type: String, default: "" },

    shippingFee: { type: Number, default: 49 },
    freeShipping: { type: Number, default: 999 },
    deliveryTime: { type: String, default: "2-4 Days" },

    instagram: { type: String, default: "" },
    facebook: { type: String, default: "" },
    youtube: { type: String, default: "" },

    seoTitle: { type: String, default: "KMC Iyarkai Creation" },
    seoDescription: { type: String, default: "" },

    maintenanceMode: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Settings || mongoose.model("Settings", SettingsSchema);