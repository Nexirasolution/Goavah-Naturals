"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Modal from "@/components/Modal";

const STATUSES = ["pending", "confirmed", "packed", "shipped", "delivered", "cancelled"];

const STATUS_COLORS = {
  pending: "bg-gold/20 text-gold-dark",
  confirmed: "bg-forest/10 text-forest",
  packed: "bg-forest/10 text-forest",
  shipped: "bg-terracotta/10 text-terracotta",
  delivered: "bg-forest text-ivory",
  cancelled: "bg-muted/10 text-muted",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [updating, setUpdating] = useState(false);

  async function loadOrders() {
    setLoading(true);
    const params = new URLSearchParams();
    if (filter) params.set("status", filter);
    const res = await fetch(`/api/orders?${params.toString()}`);
    const data = await res.json();
    setOrders(data.orders || []);
    setLoading(false);
  }

  useEffect(() => {
    loadOrders();
  }, [filter]);

  async function updateStatus(id, status) {
    setUpdating(true);
    const res = await fetch(`/api/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    setUpdating(false);
    if (res.ok) {
      setSelected(data.order);
      loadOrders();
    } else {
      alert(data.error);
    }
  }

  const filtered = orders.filter(
    (o) =>
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.phone.includes(search) ||
      o.customer.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-forest">Orders</h1>
          <p className="mt-1 text-sm text-muted">{orders.length} orders</p>
        </div>
        <input
          type="text"
          placeholder="Search by name, phone, order #..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-full border border-gold/30 bg-white px-4 py-2 text-sm outline-none focus:border-forest sm:w-72"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => setFilter("")}
          className={`rounded-full border px-4 py-1.5 text-xs font-semibold ${filter === "" ? "border-forest bg-forest text-ivory" : "border-gold/30 text-ink/70"}`}
        >
          All
        </button>
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold capitalize ${filter === s ? "border-forest bg-forest text-ivory" : "border-gold/30 text-ink/70"}`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Desktop table (hidden on mobile) */}
      <div className="mt-6 hidden overflow-x-auto rounded-xl2 border border-gold/15 bg-white shadow-card md:block">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gold/15 bg-champagne/50 text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3">Order #</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-muted">Loading...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-muted">No orders found.</td></tr>
            ) : (
              filtered.map((o) => (
                <tr key={o._id} className="border-b border-gold/10 last:border-0">
                  <td className="px-4 py-3 font-semibold text-ink">{o.orderNumber}</td>
                  <td className="px-4 py-3 text-ink/70">{o.customer.name}</td>
                  <td className="px-4 py-3 text-ink/70">{o.customer.phone}</td>
                  <td className="px-4 py-3 text-ink/70">₹{o.total}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${STATUS_COLORS[o.status]}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-ink/70">
                    {new Date(o.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-3">
                      <Link
                        href={`/admin/orders/${o._id}/label`}
                        className="text-xs font-semibold text-terracotta hover:underline"
                      >
                        Print label
                      </Link>
                      <button onClick={() => setSelected(o)} className="text-xs font-semibold text-forest hover:underline">
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile card list (hidden on desktop) */}
      <div className="mt-6 space-y-3 md:hidden">
        {loading ? (
          <p className="py-8 text-center text-sm text-muted">Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted">No orders found.</p>
        ) : (
          filtered.map((o) => (
            <div key={o._id} className="rounded-2xl border border-gold/15 bg-white p-4 shadow-card">
              <button onClick={() => setSelected(o)} className="block w-full text-left">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-ink truncate">{o.orderNumber}</p>
                    <p className="mt-0.5 text-sm text-ink/70 truncate">{o.customer.name}</p>
                    <p className="text-xs text-muted">{o.customer.phone}</p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium capitalize ${STATUS_COLORS[o.status]}`}
                  >
                    {o.status}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-gold/10 pt-3 text-sm">
                  <span className="text-muted">
                    {new Date(o.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </span>
                  <span className="font-semibold text-forest">₹{o.total}</span>
                </div>
              </button>

              <Link
                href={`/admin/orders/${o._id}/label`}
                className="mt-3 block w-full rounded-full border border-terracotta/40 py-2 text-center text-xs font-semibold text-terracotta"
              >
                Print shipping label
              </Link>
            </div>
          ))
        )}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.orderNumber || ""} wide>
        {selected && (
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase text-muted">Customer</p>
                <p className="mt-1 text-sm text-ink">{selected.customer.name}</p>
                <p className="text-sm text-ink/70">{selected.customer.phone}</p>
                {selected.customer.email && <p className="text-sm text-ink/70 break-all">{selected.customer.email}</p>}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-muted">Delivery Address</p>
                <p className="mt-1 text-sm text-ink/70">
                  {selected.customer.address}, {selected.customer.city} {selected.customer.pincode}, {selected.customer.state}
                </p>
              </div>
            </div>

            <div className="leaf-divider my-5" />

            <p className="text-xs font-semibold uppercase text-muted">Items</p>
            <div className="mt-2 space-y-2">
              {selected.items.map((item, i) => (
                <div key={i} className="flex justify-between gap-3 text-sm">
                  <span className="text-ink/80">{item.name} × {item.quantity}</span>
                  <span className="shrink-0 text-ink">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex justify-between gap-3 border-t border-gold/15 pt-3 font-display text-sm font-bold text-forest">
              <span>Total ({selected.paymentMethod})</span>
              <span>₹{selected.total}</span>
            </div>

            <div className="leaf-divider my-5" />

            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase text-muted">Update Status</p>
              <Link
                href={`/admin/orders/${selected._id}/label`}
                className="rounded-full border border-terracotta/40 px-4 py-1.5 text-xs font-semibold text-terracotta"
              >
                Print shipping label
              </Link>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  disabled={updating || selected.status === s}
                  onClick={() => updateStatus(selected._id, s)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold capitalize transition disabled:cursor-default sm:py-1.5 ${
                    selected.status === s ? "border-forest bg-forest text-ivory" : "border-gold/30 text-ink/70 hover:bg-champagne"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}