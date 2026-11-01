import { useMemo, useState } from 'react'
import { SearchX } from 'lucide-react'
import ProductCard from '../components/ProductCard.jsx'
import { products, CATEGORIES } from '../data/products.js'

const sortOptions = [
  { key: 'popular', label: 'Most Popular' },
  { key: 'price-asc', label: 'Price: Low to High' },
  { key: 'price-desc', label: 'Price: High to Low' },
  { key: 'rating', label: 'Top Rated' },
]

export default function Shop({ categoryFilter, setCategoryFilter, searchQuery, setSearchQuery }) {
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
                All Products
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
                  {cat}
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

          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <SearchX className="w-12 h-12 mx-auto mb-4 text-navy/25" strokeWidth={1.5} />
              <p className="text-navy/60">No products found. Try a different search or category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
