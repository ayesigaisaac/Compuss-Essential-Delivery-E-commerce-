export const CATEGORIES = ['Mattresses', 'Pillows', 'Bedding', 'Bed Bases']

export function unsplash(id, width = 800) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`
}

export const HERO_IMAGE = '1582582621959-48d27397dc69'

export const CATEGORY_IMAGES = {
  Mattresses: '1588046130717-0eb0c9a3ba15',
  Pillows: '1629949009765-40fc74c9ec21',
  Bedding: '1616627561950-9f746e330187',
  'Bed Bases': '1617325247661-675ab4b64ae2',
}

export const products = [
  // Mattresses
  { id: 1, name: 'Roseform Classic Foam 4×6 (8")', category: 'Mattresses', price: 320000, image: '1631049307264-da0ec9d70304', rating: 4.6, sold: 412, tag: 'Best Seller' },
  { id: 2, name: 'Roseform Orthopedic 5×6 (10")', category: 'Mattresses', price: 560000, image: '1595526114035-0d45ed16cfbf', rating: 4.8, sold: 268, tag: 'Hot' },
  { id: 3, name: 'Roseform Spring Comfort 6×6 (12")', category: 'Mattresses', price: 890000, image: '1505692952047-1a78307da8f2', rating: 4.7, sold: 154, tag: 'New' },
  { id: 4, name: 'Roseform Single 3×6 (6")', category: 'Mattresses', price: 180000, image: '1522771739844-6a9f6d5f14af', rating: 4.5, sold: 530, tag: 'Sale' },

  // Pillows
  { id: 5, name: 'Fibre Pillow (Standard)', category: 'Pillows', price: 25000, image: '1584100936595-c0654b55a2e2', rating: 4.5, sold: 640, tag: 'Best Seller' },
  { id: 6, name: 'Memory Foam Pillow', category: 'Pillows', price: 65000, image: '1629949009765-40fc74c9ec21', rating: 4.8, sold: 322, tag: 'Hot' },
  { id: 7, name: 'Orthopedic Neck Pillow', category: 'Pillows', price: 55000, image: '1616627561950-9f746e330187', rating: 4.6, sold: 187, tag: null },
  { id: 8, name: 'Kids Pillow', category: 'Pillows', price: 18000, image: '1584100936595-c0654b55a2e2', rating: 4.4, sold: 145, tag: 'New' },

  // Bedding
  { id: 9, name: 'Cotton Bedsheet Set 5×6', category: 'Bedding', price: 75000, image: '1571508601891-ca5e7a713859', rating: 4.6, sold: 398, tag: null },
  { id: 10, name: 'Duvet with Cover 6×6', category: 'Bedding', price: 160000, image: '1505693416388-ac5ce068fe85', rating: 4.7, sold: 211, tag: 'Sale' },
  { id: 11, name: 'Waterproof Mattress Protector', category: 'Bedding', price: 45000, image: '1588046130717-0eb0c9a3ba15', rating: 4.5, sold: 276, tag: 'Best Seller' },
  { id: 12, name: 'Fleece Blanket', category: 'Bedding', price: 50000, image: '1615874959474-d609969a20ed', rating: 4.4, sold: 233, tag: null },

  // Bed Bases
  { id: 13, name: 'Wooden Bed Frame 5×6', category: 'Bed Bases', price: 650000, image: '1617325247661-675ab4b64ae2', rating: 4.6, sold: 98, tag: null },
  { id: 14, name: 'Upholstered Bed 6×6', category: 'Bed Bases', price: 1250000, image: '1582582621959-48d27397dc69', rating: 4.8, sold: 64, tag: 'New' },
  { id: 15, name: 'Metal Bunk Bed 3×6', category: 'Bed Bases', price: 480000, image: '1586105251261-72a756497a11', rating: 4.5, sold: 121, tag: 'Sale' },
  { id: 16, name: 'Divan Base 4×6', category: 'Bed Bases', price: 420000, image: '1540518614846-7eded433c457', rating: 4.4, sold: 87, tag: null },
]
