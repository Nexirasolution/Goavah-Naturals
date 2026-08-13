// lib/settings.js
import { connectDB } from "@/lib/mongodb";
import Settings from "@/models/Settings";

const DEFAULTS = {
  storeName: "Goavah Naturals",
  email: "goavahnaturals@gmail.com",
  phone: "+91 9626200999",
  whatsapp: "919626200999",
  address: "Zamin Uthukuli, Pollachi, Coimbatore District, Tamil Nadu - 642004",
  shippingFee: 49,
  freeShipping: 999,
  deliveryTime: "2-4 Days",
  instagram: "",
  facebook: "",
  youtube: "",
  seoTitle: "Goavah Naturals | Natural & Traditional Products",
  seoDescription:
    "Goavah Naturals brings you natural, traditionally made products from Zamin Uthukuli, Pollachi, Coimbatore District.",
  maintenanceMode: false,
};

export async function getSettings() {
  await connectDB();
  const settings = await Settings.findOne().lean();
  return settings ? JSON.parse(JSON.stringify(settings)) : DEFAULTS;
}