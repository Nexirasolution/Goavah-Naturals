"use client";
import ImageUploader from "@/components/ImageUploader";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import { CATEGORY_ICONS, LeafIcon } from "@/components/Icons";

const EMPTY_FORM = {
  name: "",
  description: "",
  icon: "leaf",
  image: null,
  imageUrl: "",
  isActive: true,
  sortOrder: 0,
};
const ICON_OPTIONS = ["leaf", "bag", "pot", "wood", "drop", "herb"];

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadData() {
    setLoading(true);
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data.categories || []);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  function openAdd() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setError("");
    setModalOpen(true);
  }

  function openEdit(c) {
  setEditingId(c._id);

  setForm({
    name: c.name,
    description: c.description || "",
    icon: c.icon || "leaf",
    image: c.image?.url ? [c.image] : [],
    isActive: c.isActive,
    sortOrder: c.sortOrder || 0,
  });

  setError("");
  setModalOpen(true);
}

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch(editingId ? `/api/categories/${editingId}` : "/api/categories", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, sortOrder: Number(form.sortOrder) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save category.");
      setModalOpen(false);
      loadData();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this category?")) return;
    const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) {
      alert(data.error);
      return;
    }
    loadData();
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-forest">Categories</h1>
          <p className="mt-1 text-sm text-muted">{categories.length} categories</p>
        </div>
        <button onClick={openAdd} className="rounded-full bg-forest px-6 py-2 text-sm font-semibold text-ivory shadow-soft hover:bg-forest-light">
          + Add Category
        </button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <p className="text-muted">Loading...</p>
        ) : categories.length === 0 ? (
          <p className="text-muted">No categories yet. Add your first category.</p>
        ) : (
          categories.map((c) => {
            const Icon = CATEGORY_ICONS[c.icon] || LeafIcon;
            return (
              <div key={c._id} className="rounded-xl2 border border-gold/15 bg-white p-5 shadow-card">
                <div className="flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-champagne text-forest">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${c.isActive ? "bg-forest/10 text-forest" : "bg-muted/10 text-muted"}`}>
                    {c.isActive ? "Active" : "Hidden"}
                  </span>
                </div>
                <p className="mt-3 font-display text-base font-bold text-ink">{c.name}</p>
                <p className="mt-1 text-xs text-muted line-clamp-2">{c.description || "No description"}</p>
                <div className="mt-4 flex gap-3">
                  <button onClick={() => openEdit(c)} className="text-xs font-semibold text-forest hover:underline">Edit</button>
                  <button onClick={() => handleDelete(c._id)} className="text-xs font-semibold text-terracotta hover:underline">Delete</button>
                </div>
              </div>
            );
          })
        )}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? "Edit Category" : "Add Category"}>
        <form onSubmit={handleSave} className="space-y-4">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-ink/70">Category Name *</span>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-xl border border-gold/30 px-4 py-2.5 text-sm outline-none focus:border-forest"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-ink/70">Description</span>
            <textarea
              rows={2}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full rounded-xl border border-gold/30 px-4 py-2.5 text-sm outline-none focus:border-forest"
            />
          </label>

          <div>
            <span className="mb-2 block text-xs font-semibold text-ink/70">Icon</span>
            <div className="flex flex-wrap gap-2">
              {ICON_OPTIONS.map((key) => {
                const Icon = CATEGORY_ICONS[key];
                return (
                  <button
                    type="button"
                    key={key}
                    onClick={() => setForm({ ...form, icon: key })}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border ${
                      form.icon === key ? "border-forest bg-forest text-ivory" : "border-gold/30 text-forest"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                );
              })}
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
            Active (visible in store)
          </label>

          {error && <p className="text-sm text-terracotta">{error}</p>}

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-full bg-forest px-8 py-3 text-sm font-semibold text-ivory shadow-soft hover:bg-forest-light disabled:opacity-60"
          >
            {saving ? "Saving..." : editingId ? "Save Changes" : "Add Category"}
          </button>
        </form>
      </Modal>
    </div>
  );
}
