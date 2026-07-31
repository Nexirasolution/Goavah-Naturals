"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ShippingLabelPage() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOrder() {
      setLoading(true);
      try {
        const res = await fetch(`/api/orders/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Order not found");
        setOrder(data.order);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (id) loadOrder();
  }, [id]);

  if (loading) {
    return <div className="p-8 text-center text-sm text-muted">Loading label...</div>;
  }

  if (error || !order) {
    return (
      <div className="p-8 text-center">
        <p className="text-sm text-muted">{error || "Order not found."}</p>
        <button onClick={() => router.back()} className="mt-3 text-xs font-semibold text-forest hover:underline">
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-champagne/40 px-4 py-6 sm:px-6">
      {/* Screen-only controls, hidden when printing */}
      <div className="mx-auto mb-4 flex max-w-md items-center justify-between print:hidden">
        <button onClick={() => router.back()} className="text-sm font-semibold text-ink/70 hover:text-forest">
          &larr; Back
        </button>
        <button
          onClick={() => window.print()}
          className="rounded-full bg-forest px-5 py-2 text-sm font-semibold text-ivory shadow-card"
        >
          Print label
        </button>
      </div>

      {/* Label card — this is what gets printed */}
      <div
        id="label-print-area"
        className="mx-auto w-full max-w-md border-2 border-ink bg-white p-4 text-ink shadow-card sm:p-5 print:max-w-none print:border-0 print:shadow-none"
      >
        <div className="flex items-start justify-between border-b-2 border-ink pb-2">
          <div>
            <p className="text-[10px] uppercase tracking-wide text-muted">Order</p>
            <p className="text-lg font-bold sm:text-xl">{order.orderNumber}</p>
          </div>
          <span className="rounded border border-ink px-2 py-0.5 text-[11px] font-semibold uppercase">
            {order.paymentMethod}
          </span>
        </div>

        <div className="mt-3">
          <p className="text-[10px] uppercase tracking-wide text-muted">Ship to</p>
          <p className="text-base font-bold sm:text-lg">{order.customer.name}</p>
          <p className="mt-1 text-sm leading-snug">
            {order.customer.address}, {order.customer.city} {order.customer.pincode}, {order.customer.state}
          </p>
          <p className="mt-1 text-sm">Phone: {order.customer.phone}</p>
        </div>

        <div className="my-3 border-t border-dashed border-muted/50" />

        <table className="w-full text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-muted/30 text-[10px] uppercase text-muted">
              <th className="pb-1 text-left font-semibold">Item</th>
              <th className="pb-1 text-right font-semibold">Qty</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, i) => (
              <tr key={i} className="border-b border-muted/10">
                <td className="py-1 pr-2">{item.name}</td>
                <td className="py-1 text-right">{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-3 flex justify-between border-t-2 border-ink pt-2 text-sm font-bold sm:text-base">
          <span>Total</span>
          <span>₹{order.total}</span>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          @page {
            size: 4in 6in;
            margin: 0.15in;
          }
          body * {
            visibility: hidden;
          }
          #label-print-area,
          #label-print-area * {
            visibility: visible;
          }
          #label-print-area {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}