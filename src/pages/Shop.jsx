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
    setTimeout(() => setAddedId(null), 900)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-navy text-2xl sm:text-3xl font-extrabold mb-1">Shop</h1>
        <p className="text-navy/60 text-sm sm:text-base">
          {filteredProducts.length} item{filteredProducts.length !== 1 ? 's' : ''} available
        </p>
      </div>

      <div className="sticky top-[60px] sm:top-[68px] z-10 -mx-4 sm:mx-0 px-4 sm:px-0 py-3 mb-6 sm:mb-8 bg-offwhite/90 backdrop-blur-sm">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setCategoryFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                activeFilter === filter
                  ? 'bg-coral border-coral text-white shadow-sm shadow-coral/30'
                  : 'bg-white border-navy/15 text-navy hover:border-coral hover:text-coral'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
        {filteredProducts.map((product, i) => (
          <div
            key={product.id}
            style={{ animationDelay: `${(i % 10) * 40}ms` }}
            className="group bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all p-4 sm:p-5 flex flex-col hover:-translate-y-1 animate-fade-up"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-navy/5 flex items-center justify-center text-3xl sm:text-4xl transition-transform group-hover:scale-105">
                {product.icon}
              </div>
              <span className="text-[10px] sm:text-xs font-semibold text-navy/50 bg-navy/5 px-2 py-1 rounded-full">
                {product.category}
              </span>
            </div>
            <h3 className="text-navy font-semibold text-sm sm:text-base mb-1 flex-1 leading-snug">
              {product.name}
            </h3>
            <p className="text-coral font-extrabold text-base sm:text-lg mb-3">
              {formatUGX(product.price)}
            </p>
            <button
              onClick={() => handleAdd(product)}
              className={`text-sm font-semibold py-2.5 rounded-xl transition-all active:scale-95 ${
                addedId === product.id
                  ? 'bg-navy text-white'
                  : 'bg-coral hover:bg-coral-dark text-white'
              }`}
            >
              {addedId === product.id ? 'Added ✓' : 'Add to Cart'}
            </button>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-navy/60 text-center py-16">No products in this category.</p>
      )}
    </div>
  )
}
