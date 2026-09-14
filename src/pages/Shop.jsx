import { useState } from 'react'
import { products, CATEGORIES } from '../data/products.js'
import { useCart } from '../CartContext.jsx'

function formatUGX(amount) {
  return `UGX ${amount.toLocaleString()}`
}

export default function Shop({ categoryFilter, setCategoryFilter }) {
  const { addToCart } = useCart()
  const [addedId, setAddedId] = useState(null)

  const filters = ['All', ...CATEGORIES]
  const activeFilter = categoryFilter || 'All'

  const filteredProducts =
    activeFilter === 'All'
      ? products
      : products.filter((p) => p.category === activeFilter)

  function handleAdd(product) {
    addToCart(product)
    setAddedId(product.id)
    setTimeout(() => setAddedId(null), 1000)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-navy text-2xl sm:text-3xl font-bold mb-6">Shop</h1>

      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setCategoryFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
              activeFilter === filter
                ? 'bg-coral border-coral text-white'
                : 'bg-white border-navy/30 text-navy hover:border-navy'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col"
          >
            <div className="text-4xl mb-3 text-center">{product.icon}</div>
            <h3 className="text-navy font-semibold text-sm sm:text-base mb-1 flex-1">
              {product.name}
            </h3>
            <p className="text-coral font-bold mb-3">{formatUGX(product.price)}</p>
            <button
              onClick={() => handleAdd(product)}
              className="bg-coral hover:bg-coral-dark text-white text-sm font-semibold py-2 rounded-lg transition-colors"
            >
              {addedId === product.id ? 'Added ✓' : 'Add to Cart'}
            </button>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-navy/60 text-center py-12">No products in this category.</p>
      )}
    </div>
  )
}
