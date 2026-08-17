// Escape regex special characters so search terms like "gift+set" or "100%" don't break the query
export function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export const SORT_MAP = {
  newest: { createdAt: -1 },
  "price-asc": { price: 1 },
  "price-desc": { price: -1 },
  "name-asc": { name: 1 },
  "name-desc": { name: -1 },
};

// Products are ordered by SKU across the site by default; an explicit
// `sort` key overrides that. Shared so the API route and any server-side
// pre-fetch (e.g. the products page's initial render) always agree.
export function getSortSpec(sort) {
  return (sort && SORT_MAP[sort]) || { sku: 1 };
}

// Builds the same Mongo filter object /api/products uses, from a plain
// params object: { category, search, featured, activeOnly, minPrice, maxPrice }
export function buildProductFilter({ category, search, featured, activeOnly, minPrice, maxPrice } = {}) {
  const query = {};

  if (category) query.category = category;
  if (featured === "true" || featured === true) query.isFeatured = true;
  if (activeOnly === "true" || activeOnly === true) query.isActive = true;

  const trimmedSearch = (search || "").trim();
  if (trimmedSearch) {
    const safe = escapeRegex(trimmedSearch);
    query.$or = [
      { name: { $regex: safe, $options: "i" } },
      { description: { $regex: safe, $options: "i" } },
      { shortDescription: { $regex: safe, $options: "i" } },
      { sku: { $regex: safe, $options: "i" } },
      { tags: { $regex: safe, $options: "i" } },
    ];
  }

  if (minPrice || maxPrice) {
    const priceFilter = {};
    const min = Number(minPrice);
    const max = Number(maxPrice);
    if (minPrice && Number.isFinite(min)) priceFilter.$gte = min;
    if (maxPrice && Number.isFinite(max)) priceFilter.$lte = max;
    if (Object.keys(priceFilter).length > 0) query.price = priceFilter;
  }

  return query;
}