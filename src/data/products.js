export const CATEGORIES = ['Mattresses', 'Pillows', 'Bedding', 'Bed Bases']

export const CATEGORY_ICONS = {
  Mattresses: '🛏️',
  Pillows: '☁️',
  Bedding: '🧺',
  'Bed Bases': '🪵',
}

export const CATEGORY_TINT = {
  Mattresses: 'from-coral/20 via-coral/5 to-transparent',
  Pillows: 'from-navy/10 via-navy/5 to-transparent',
  Bedding: 'from-gold/50 via-gold/15 to-transparent',
  'Bed Bases': 'from-navy/10 via-coral/5 to-transparent',
}

export const products = [
  // Mattresses
  { id: 1, name: 'Roseform Classic Foam 4×6 (8")', category: 'Mattresses', price: 320000, icon: '🛏️', rating: 4.6, sold: 412, tag: 'Best Seller' },
  { id: 2, name: 'Roseform Orthopedic 5×6 (10")', category: 'Mattresses', price: 560000, icon: '🛏️', rating: 4.8, sold: 268, tag: 'Hot' },
  { id: 3, name: 'Roseform Spring Comfort 6×6 (12")', category: 'Mattresses', price: 890000, icon: '🛏️', rating: 4.7, sold: 154, tag: 'New' },
  { id: 4, name: 'Roseform Single 3×6 (6")', category: 'Mattresses', price: 180000, icon: '🛏️', rating: 4.5, sold: 530, tag: 'Sale' },

  // Pillows
  { id: 5, name: 'Fibre Pillow (Standard)', category: 'Pillows', price: 25000, icon: '☁️', rating: 4.5, sold: 640, tag: 'Best Seller' },
  { id: 6, name: 'Memory Foam Pillow', category: 'Pillows', price: 65000, icon: '💤', rating: 4.8, sold: 322, tag: 'Hot' },
  { id: 7, name: 'Orthopedic Neck Pillow', category: 'Pillows', price: 55000, icon: '🌙', rating: 4.6, sold: 187, tag: null },
  { id: 8, name: 'Kids Pillow', category: 'Pillows', price: 18000, icon: '🧸', rating: 4.4, sold: 145, tag: 'New' },

  // Bedding
  { id: 9, name: 'Cotton Bedsheet Set 5×6', category: 'Bedding', price: 75000, icon: '🧺', rating: 4.6, sold: 398, tag: null },
  { id: 10, name: 'Duvet with Cover 6×6', category: 'Bedding', price: 160000, icon: '🛌', rating: 4.7, sold: 211, tag: 'Sale' },
  { id: 11, name: 'Waterproof Mattress Protector', category: 'Bedding', price: 45000, icon: '💧', rating: 4.5, sold: 276, tag: 'Best Seller' },
  { id: 12, name: 'Fleece Blanket', category: 'Bedding', price: 50000, icon: '🧣', rating: 4.4, sold: 233, tag: null },

  // Bed Bases
  { id: 13, name: 'Wooden Bed Frame 5×6', category: 'Bed Bases', price: 650000, icon: '🪵', rating: 4.6, sold: 98, tag: null },
  { id: 14, name: 'Upholstered Bed 6×6', category: 'Bed Bases', price: 1250000, icon: '🛋️', rating: 4.8, sold: 64, tag: 'New' },
  { id: 15, name: 'Metal Bunk Bed 3×6', category: 'Bed Bases', price: 480000, icon: '🪜', rating: 4.5, sold: 121, tag: 'Sale' },
  { id: 16, name: 'Divan Base 4×6', category: 'Bed Bases', price: 420000, icon: '📦', rating: 4.4, sold: 87, tag: null },
]
