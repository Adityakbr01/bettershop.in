// components/admin/dashboard/constants.ts
export const PALETTE = {
  cbg1: "#c4b7ec",
  cbg2: "#eeb0db",
  cbg3: "#9d80f6",
  cbg4: "#129d78",
  cbg5: "#ff7300",
  cbg6: "#f5fc35",
};

export const revenueMonthly = [
  { month: "Jan", revenue: 18400, orders: 320 },
  { month: "Feb", revenue: 20500, orders: 348 },
  { month: "Mar", revenue: 22350, orders: 372 },
  { month: "Apr", revenue: 26110, orders: 410 },
  { month: "May", revenue: 27980, orders: 432 },
  { month: "Jun", revenue: 30240, orders: 455 },
  { month: "Jul", revenue: 28990, orders: 441 },
  { month: "Aug", revenue: 31420, orders: 470 },
  { month: "Sep", revenue: 33670, orders: 489 },
  { month: "Oct", revenue: 35120, orders: 502 },
  { month: "Nov", revenue: 42010, orders: 580 },
  { month: "Dec", revenue: 49850, orders: 660 },
];

export const trendingProducts = [
  { productId: 101, name: "Blue T-Shirt", category: "Clothing", qtySold: 820, revenue: 15980 },
  { productId: 102, name: "Denim Jacket", category: "Clothing", qtySold: 610, revenue: 24400 },
  { productId: 103, name: "Grey Hoodie", category: "Clothing", qtySold: 540, revenue: 23200 },
  { productId: 104, name: "Cargo Pants", category: "Clothing", qtySold: 505, revenue: 22690 },
  { productId: 105, name: "Summer Dress", category: "Clothing", qtySold: 470, revenue: 25830 },
];

export const lowStockVariants = [
  { variantId: 201, product: "Blue T-Shirt", attributes: "M / Blue", stock: 4, threshold: 10 },
  { variantId: 202, product: "Grey Hoodie", attributes: "L / Grey", stock: 2, threshold: 8 },
  { variantId: 203, product: "Denim Jacket", attributes: "M / Indigo", stock: 1, threshold: 6 },
  { variantId: 204, product: "Summer Dress", attributes: "S / Yellow", stock: 5, threshold: 10 },
];

export const behaviorFeed = [
  { id: 1, user: "John D.", type: "purchase", meta: "Order #12034 ($129.99)", time: "2m ago" },
  { id: 2, user: "Amelia K.", type: "add_to_cart", meta: "Denim Jacket (M)", time: "6m ago" },
  { id: 3, user: "Maria S.", type: "search", meta: `"hoodie"`, time: "11m ago" },
  { id: 4, user: "David P.", type: "view_product", meta: "Cargo Pants", time: "15m ago" },
  { id: 5, user: "Jessie L.", type: "oauth_login", meta: "Google", time: "20m ago" },
  { id: 6, user: "Ravi N.", type: "add_to_wishlist", meta: "Summer Dress", time: "22m ago" },
];

export const returnsBreakdown = [
  { name: "Pending", value: 18, status: "pending" },
  { name: "Approved", value: 42, status: "approved" },
  { name: "Rejected", value: 7, status: "rejected" },
  { name: "Completed", value: 35, status: "completed" },
];

export const activeCoupons = [
  { code: "WELCOME10", description: "New user discount", discount_type: "percentage", discount_value: 10, used_count: 184, usage_limit: 1000, expires_at: "2025-12-31" },
  { code: "FREESHIP", description: "Free shipping over $50", discount_type: "fixed", discount_value: 5, used_count: 92, usage_limit: 800, expires_at: "2025-06-30" },
  { code: "HOLIDAY25", description: "Holiday sale", discount_type: "percentage", discount_value: 25, used_count: 310, usage_limit: 1500, expires_at: "2025-12-25" },
];
