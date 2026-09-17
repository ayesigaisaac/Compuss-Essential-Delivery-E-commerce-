import { useMemo, useState } from 'react'
import { products, CATEGORIES, CATEGORY_ICONS } from '../data/products.js'
import { useCart } from '../CartContext.jsx'

function formatUGX(amount) {
  return `UGX ${amount.toLocaleString()}`
}

function Stars({ rating }) {
  return (
    <span className="flex items-center gap-0.5 text-gold-dark text-xs">
      {'★'.repeat(Math.round(rating))}
      {'☆'.repeat(5 - Math.round(rating))}
      <span className="text-navy/40 ml-1">{rating.toFixed(1)}</span>
    </span>
  )
}

const tagStyles = {
  Hot: 'bg-coral text-white',
  'Best Seller': 'bg-navy text-white',
  New: 'bg-gold-dark text-navy',
  Sale: 'bg-emerald-500 text-white',
}

const sortOptions = [
  { key: 'popular', label: 'Most Popular' },
  { key: 'price-asc', label: 'Price: Low to High' },
  { key: 'price-desc', label: 'Price: High to Low' },
  { key: 'rating', label: 'Top Rated' },
]

export default function Shop({ categoryFilter, setCategoryFilter, searchQuery, setSearchQuery }) {
  const { addToCart } = useCart()
  const [addedId, setAddedId] = useState(null)
  const [sortBy, setSortBy] = useState('popular')

  const activeFilter = categoryFilter || 'All'

  const filteredProducts = useMemo(() => {
    let list = products
    if (activeFilter !== 'All') {
      list = list.filter((p) => p.category === activeFilter)
    }
    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase()
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      )
    }
    const sorted = [...list]
    if (sortBy === 'price-asc') sorted.sort((a, b) => a.price - b.price)
    else if (sortBy === 'price-desc') sorted.sort((a, b) => b.price - a.price)
    else if (sortBy === 'rating') sorted.sort((a, b) => b.rating - a.rating)
    else sorted.sort((a, b) => b.sold - a.sold)
    return sorted
  }, [activeFilter, searchQuery, sortBy])

  function handleAdd(product) {
    addToCart(product)
    setAddedId(product.id)
    setTimeout(() => setAddedId(null), 900)
  }

  function selectCategory(cat) {
    setCategoryFilter(cat)
    setSearchQuery('')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <nav className="text-xs text-navy/50 mb-4">
        <span className="hover:text-coral cursor-pointer" onClick={() => selectCategory('All')}>
          Home
        </span>
        <span className="mx-1.5">/</span>
        <span className="text-navy font-medium">{activeFilter === 'All' ? 'All Products' : activeFilter}</span>
      </nav>

      <div className="grid lg:grid-cols-[220px_1fr] gap-6">
        <aside className="hidden lg:block">
          <div className="bg-white rounded-2xl shadow-card p-4 sticky top-24">
            <h3 className="text-navy font-bold text-sm mb-3 px-1">Categories</h3>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => selectCategory('All')}
                className={`text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 ${
                  activeFilter === 'All'
                    ? 'bg-coral/10 text-coral'
                    : 'text-navy/70 hover:bg-navy/5'
                }`}
              >
                <span>🗂️</span> All Products
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => selectCategory(cat)}
                  className={`text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 ${
                    activeFilter === cat
                      ? 'bg-coral/10 text-coral'
                      : 'text-navy/70 hover:bg-navy/5'
                  }`}
                >
                  <span>{CATEGORY_ICONS[cat]}</span> {cat}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div>
          <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
            <div>
              <h1 className="text-navy text-xl sm:text-2xl font-extrabold">
                {activeFilter === 'All' ? 'All Products' : activeFilter}
              </h1>
              <p className="text-navy/50 text-xs sm:text-sm">
                {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''}
                {searchQuery ? ` for "${searchQuery}"` : ''}
              </p>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-navy/15 text-navy text-xs sm:text-sm font-medium rounded-xl px-3 py-2 focus:outline-none focus:border-coral"
            >
              {sortOptions.map((opt) => (
                <option key={opt.key} value={opt.key}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap gap-2 mb-5 lg:hidden">
            {['All', ...CATEGORIES].map((filter) => (
              <button
                key={filter}
                onClick={() => selectCategory(filter)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all border ${
                  activeFilter === filter
                    ? 'bg-coral border-coral text-white'
                    : 'bg-white border-navy/15 text-navy hover:border-coral hover:text-coral'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {filteredProducts.map((product, i) => (
              <div
                key={product.id}
                style={{ animationDelay: `${(i % 12) * 30}ms` }}
                className="group relative bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all p-3.5 sm:p-4 flex flex-col hover:-translate-y-1 animate-fade-up"
              >
                {product.tag && (
                  <span
                    className={`absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full z-10 ${tagStyles[product.tag]}`}
                  >
                    {product.tag}
                  </span>
                )}
                <div className="w-full aspect-square rounded-xl bg-navy/5 flex items-center justify-center text-4xl sm:text-5xl mb-3 transition-transform group-hover:scale-105">
                  {product.icon}
                </div>
                <h3 className="text-navy font-medium text-xs sm:text-sm mb-1 line-clamp-2 leading-snug min-h-[2.5em]">
                  {product.name}
                </h3>
                <Stars rating={product.rating} />
                <div className="flex items-baseline justify-between mt-1.5 mb-3">
                  <p className="text-coral font-extrabold text-sm sm:text-lg">
                    {formatUGX(product.price)}
                  </p>
                  <span className="text-navy/35 text-[10px] sm:text-xs">{product.sold} sold</span>
                </div>
                <button
                  onClick={() => handleAdd(product)}
                  className={`text-xs sm:text-sm font-semibold py-2 sm:py-2.5 rounded-xl transition-all active:scale-95 ${
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
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-navy/60">No products found. Try a different search or category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
