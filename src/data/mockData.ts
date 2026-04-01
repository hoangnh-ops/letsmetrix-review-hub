export const appInfo = {
  name: "JETVEO",
  icon: "https://cdn.shopify.com/app-store/listing_images/5e3a36fc1c2c9d4a18ff7c5b1d5c7e2a/icon/CL-KxZHEroMDEAE=.png",
  developer: "Jetveo s.r.o.",
  rating: 4.9,
  totalReviews: 2257,
  installs: "15,200+",
  pricingPlan: "Free plan available · From $9.99/mo",
  lastUpdated: "Mar 28, 2026",
  category: "Inventory management",
};

export const sentimentScores = [
  { label: "Hỗ trợ", score: 8.7, trend: "up" as const, delta: "+0.3" },
  { label: "Dễ sử dụng", score: 7.2, trend: "up" as const, delta: "+0.1" },
  { label: "Hiệu suất", score: 6.8, trend: "down" as const, delta: "-0.5" },
  { label: "Độ tin cậy", score: 5.4, trend: "flat" as const, delta: "0.0" },
  { label: "Giá trị giá", score: 7.9, trend: "up" as const, delta: "+0.2" },
];

export const spikeAlerts = [
  {
    cluster: "setup_difficulty",
    severity: "critical" as const,
    pctIncrease: 340,
    current: 53,
    baseline: 12,
  },
];

export const strengths = [
  { title: "Hỗ trợ khách hàng nhanh chóng", count: 342, quote: "Support team replied within 5 minutes!" },
  { title: "Giao diện trực quan, dễ dùng", count: 281, quote: "Very intuitive UI, no learning curve" },
  { title: "Tích hợp Shopify mượt mà", count: 198, quote: "Seamless integration with our store" },
  { title: "Giá cả hợp lý", count: 156, quote: "Great value for the price" },
  { title: "Cập nhật liên tục", count: 134, quote: "They keep improving the app" },
];

export const weaknesses = [
  { title: "Thiết lập ban đầu phức tạp", severity: 89, count: 187, isSpike: true, spikePct: 340 },
  { title: "Tốc độ tải chậm", severity: 72, count: 124 },
  { title: "Thiếu tùy chỉnh giao diện", severity: 45, count: 87 },
  { title: "Báo cáo chưa chi tiết", severity: 38, count: 65 },
];

export const featureRequests = [
  { title: "Bulk import/export CSV", description: "Allow importing products via CSV file", quote: '"I wish I could upload my inventory via CSV instead of adding one by one"', count: 187, signal: "HIGH" as const },
  { title: "Multi-language support", description: "Support for multiple languages in the interface", quote: '"Would love to see French and German translations"', count: 134, signal: "HIGH" as const },
  { title: "Advanced analytics dashboard", description: "More detailed analytics with custom date ranges", quote: '"Need better insights into my inventory trends"', count: 98, signal: "MED" as const },
  { title: "Mobile app", description: "Native mobile application for inventory management", quote: '"Managing inventory on the go would be amazing"', count: 76, signal: "MED" as const },
  { title: "API webhooks", description: "Real-time webhooks for inventory changes", quote: '"We need webhooks to sync with our ERP system"', count: 54, signal: "MED" as const },
  { title: "Barcode scanning", description: "Built-in barcode scanner for quick inventory updates", quote: '"Barcode scanning would save us hours"', count: 43, signal: "MED" as const },
  { title: "Custom fields", description: "User-defined custom fields for products", quote: '"Need to track custom attributes like color and size"', count: 31, signal: "LOW" as const },
  { title: "Scheduled reports", description: "Automated report generation and email delivery", quote: '"Would love weekly reports sent to my inbox"', count: 22, signal: "LOW" as const },
];

export const actionItems = [
  { priority: "P0" as const, title: "Cải thiện quy trình thiết lập ban đầu", description: "Tạo setup wizard 3 bước đơn giản thay vì form dài", impact: 23, triggerCount: 187 },
  { priority: "P0" as const, title: "Tối ưu tốc độ tải trang", description: "Áp dụng lazy loading và cache API responses", impact: 18, triggerCount: 124 },
  { priority: "P1" as const, title: "Thêm template tùy chỉnh giao diện", description: "Cho phép người dùng chọn theme và tùy chỉnh màu sắc", impact: 12, triggerCount: 87 },
  { priority: "P1" as const, title: "Bổ sung báo cáo chi tiết", description: "Thêm biểu đồ và export PDF cho báo cáo", impact: 9, triggerCount: 65 },
  { priority: "P2" as const, title: "Hỗ trợ đa ngôn ngữ", description: "Thêm bản dịch tiếng Pháp, Đức, Nhật", impact: 7, triggerCount: 42 },
];

export const reviews = [
  {
    id: 1, rating: 5, date: "Mar 25, 2026", author: "Sarah M.", country: "US",
    content: "Absolutely love this app! The support team is incredibly responsive and helpful. Setup was a breeze and the inventory management features are exactly what we needed for our growing store.",
    tags: ["support_praise", "ux_issue"] as const,
  },
  {
    id: 2, rating: 4, date: "Mar 23, 2026", author: "Takeshi K.", country: "JP",
    content: "Great functionality overall. The integration with Shopify is seamless. Only downside is the initial setup took a bit longer than expected. Would appreciate a guided wizard.",
    tags: ["support_praise", "feature_request"] as const,
  },
  {
    id: 3, rating: 2, date: "Mar 20, 2026", author: "Pierre D.", country: "FR",
    content: "The app has potential but the loading speed is terrible. Pages take 5+ seconds to load. Also, the reporting features are very basic compared to competitors.",
    tags: ["bug_report", "pricing_concern"] as const,
  },
  {
    id: 4, rating: 5, date: "Mar 18, 2026", author: "Maria G.", country: "ES",
    content: "Best inventory app on Shopify! Keeps everything organized and the price is very fair.",
    tags: ["support_praise"] as const,
  },
  {
    id: 5, rating: 1, date: "Mar 15, 2026", author: "John B.", country: "UK",
    content: "Cannot get this app to work properly. Support was not helpful at all. Uninstalling.",
    tags: ["bug_report"] as const,
  },
];

export const reviewStatusStats = {
  total: 2257,
  active: 1801,
  archived: 342,
  deleted: 114,
  activeDelta: +12,
  archivedDelta: +8,
  deletedDelta: +3,
  weeklyTrend: [
    { week: "W1", active: 28, archived: 5, deleted: 2 },
    { week: "W2", active: 32, archived: 3, deleted: 1 },
    { week: "W3", active: 25, archived: 7, deleted: 4 },
    { week: "W4", active: 35, archived: 4, deleted: 2 },
    { week: "W5", active: 30, archived: 6, deleted: 8 },
    { week: "W6", active: 22, archived: 8, deleted: 3 },
    { week: "W7", active: 38, archived: 5, deleted: 2 },
    { week: "W8", active: 33, archived: 9, deleted: 3 },
  ],
  transitions: [
    { from: "Active", to: "Archived", count: 342, arrow: "→" },
    { from: "Active", to: "Deleted", count: 89, arrow: "→" },
    { from: "Archived", to: "Active", count: 23, arrow: "→" },
    { from: "Archived", to: "Deleted", count: 15, arrow: "→" },
    { from: "Deleted", to: "Active", count: 4, arrow: "→" },
  ],
  ratingByStatus: {
    active: [18, 45, 112, 523, 1103],
    archived: [24, 38, 67, 121, 92],
    deleted: [14, 18, 22, 35, 25],
  },
};
