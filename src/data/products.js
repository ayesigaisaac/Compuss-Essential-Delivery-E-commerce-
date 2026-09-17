export const CATEGORIES = ['Stationery', 'Snacks', 'Data Bundles', 'Printing']

export const CATEGORY_ICONS = {
  Stationery: '📓',
  Snacks: '🥟',
  'Data Bundles': '📶',
  Printing: '🖨️',
}

export const products = [
  // Stationery
  { id: 1, name: 'Pen (Blue, Pack of 3)', category: 'Stationery', price: 1500, icon: '🖊️', rating: 4.5, sold: 312, tag: 'Best Seller' },
  { id: 2, name: 'A4 Notebook', category: 'Stationery', price: 3500, icon: '📓', rating: 4.7, sold: 208, tag: null },
  { id: 3, name: 'Ruler & Set Square Kit', category: 'Stationery', price: 4000, icon: '📐', rating: 4.3, sold: 96, tag: 'New' },
  { id: 4, name: 'Highlighter Set', category: 'Stationery', price: 6000, icon: '🖍️', rating: 4.6, sold: 141, tag: null },

  // Snacks
  { id: 5, name: 'Samosa (2 pcs)', category: 'Snacks', price: 2000, icon: '🥟', rating: 4.8, sold: 540, tag: 'Hot' },
  { id: 6, name: 'Rolex', category: 'Snacks', price: 3000, icon: '🌯', rating: 4.9, sold: 612, tag: 'Best Seller' },
  { id: 7, name: 'Soda (500ml)', category: 'Snacks', price: 2500, icon: '🥤', rating: 4.4, sold: 289, tag: null },
  { id: 8, name: 'Mandazi (3 pcs)', category: 'Snacks', price: 1500, icon: '🍩', rating: 4.6, sold: 375, tag: 'Hot' },

  // Data Bundles
  { id: 9, name: 'MTN 1GB Daily Bundle', category: 'Data Bundles', price: 2000, icon: '📶', rating: 4.5, sold: 890, tag: 'Best Seller' },
  { id: 10, name: 'Airtel 2GB Weekly Bundle', category: 'Data Bundles', price: 8000, icon: '📡', rating: 4.3, sold: 421, tag: null },
  { id: 11, name: 'MTN 5GB Monthly Bundle', category: 'Data Bundles', price: 20000, icon: '📱', rating: 4.7, sold: 356, tag: 'Sale' },
  { id: 12, name: 'Airtel Unlimited Social Bundle', category: 'Data Bundles', price: 3000, icon: '💬', rating: 4.4, sold: 498, tag: 'New' },

  // Printing
  { id: 13, name: 'B&W Print (per page)', category: 'Printing', price: 200, icon: '🖨️', rating: 4.6, sold: 1024, tag: null },
  { id: 14, name: 'Color Print (per page)', category: 'Printing', price: 1000, icon: '🖼️', rating: 4.5, sold: 302, tag: null },
  { id: 15, name: 'Spiral Binding', category: 'Printing', price: 5000, icon: '📄', rating: 4.8, sold: 187, tag: 'Sale' },
  { id: 16, name: 'Photocopy (per page)', category: 'Printing', price: 100, icon: '📃', rating: 4.7, sold: 1540, tag: 'Best Seller' },
]
