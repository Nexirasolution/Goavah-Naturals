"use client";

export default function Modal({ open, onClose, title, children, wide }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
      <div className={`max-h-[90vh] w-full ${wide ? "max-w-2xl" : "max-w-md"} overflow-y-auto rounded-xl2 bg-white p-6 shadow-soft`}>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-forest">{title}</h2>
          <button onClick={onClose} className="text-xl leading-none text-muted hover:text-ink">
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
