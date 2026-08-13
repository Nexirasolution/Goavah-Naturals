import mongoose from "mongoose";

const StateShippingRateSchema = new mongoose.Schema(
  {
    state: { type: String, required: true, trim: true },
    fee: { type: Number, required: true, default: 0 },
  },
  { _id: false }
);

const SettingsSchema = new mongoose.Schema(
  {
    storeName: { type: String, default: "Goavah Naturals" },
    email: { type: String, default: "goavahnaturals@gmail.com" },
    phone: { type: String, default: "+91 9626200999" },
    whatsapp: { type: String, default: "919626200999" },
    address: { type: String, default: "Zamin Uthukuli, Pollachi, Coimbatore District, Tamil Nadu - 642004" },

    // Default/fallback fee used when the customer's state has no specific rate below.
    shippingFee: { type: Number, default: 49 },
    // Order subtotal (₹) at or above which shipping is free, regardless of state.
    freeShipping: { type: Number, default: 999 },
    // Per-state overrides. Any state not listed here falls back to `shippingFee`.
    stateShippingRates: { type: [StateShippingRateSchema], default: [] },

    deliveryTime: { type: String, default: "2-4 Days" },

    instagram: { type: String, default: "" },
    facebook: { type: String, default: "" },
    youtube: { type: String, default: "" },

    seoTitle: { type: String, default: "Goavah Naturals | Natural & Traditional Products" },
    seoDescription: {
      type: String,
      default:
        "Goavah Naturals brings you natural, traditionally made products from Zamin Uthukuli, Pollachi, Coimbatore District.",
    },

    maintenanceMode: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Settings || mongoose.model("Settings", SettingsSchema);