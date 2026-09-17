import { useEffect, useState } from 'react'
import { useCart } from '../CartContext.jsx'
import { CATEGORIES, CATEGORY_ICONS } from '../data/products.js'

export default function Header({
  activePage,
  setActivePage,
  searchQuery,
  setSearchQuery,
  setCategoryFilter,
}) {
  const { itemCount } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [localQuery, setLocalQuery] = useState(searchQuery || '')

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { key: 'home', label: 'Home' },
    { key: 'shop', label: 'Shop' },
  ]

  function go(key) {
    setActivePage(key)
    setMenuOpen(false)
  }

  function submitSearch(e) {
    e.preventDefault()
    setSearchQuery(localQuery)
    setCategoryFilter('All')
    setActivePage('shop')
    setMobileSearchOpen(false)
    setMenuOpen(false)
  }

  return (
    <header
      className={`sticky top-0 z-30 transition-shadow duration-300 bg-navy text-white ${
        scrolled ? 'shadow-nav' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3 sm:gap-6">
        <button
          onClick={() => go('home')}
          className="flex items-center gap-2 font-extrabold text-base sm:text-lg tracking-tight shrink-0"
        >
          <span className="w-9 h-9 rounded-xl bg-coral flex items-center justify-center text-lg shrink-0">
            🎒
          </span>
          <span className="hidden md:inline">Campus Essentials</span>
        </button>

        <form
          onSubmit={submitSearch}
          className="hidden sm:flex flex-1 max-w-2xl items-center bg-white rounded-xl overflow-hidden shadow-sm"
        >
          <input
            type="text"
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            placeholder="Search for snacks, data bundles, printing..."
            className="flex-1 px-4 py-2.5 text-navy text-sm placeholder:text-navy/40 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-coral hover:bg-coral-dark text-white px-5 py-2.5 text-sm font-semibold transition-colors"
          >
            Search
          </button>
        </form>

        <div className="flex items-center gap-1.5 sm:gap-4 ml-auto">
          <nav className="hidden md:flex items-center gap-5">
            {navLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => go(link.key)}
                className={`relative text-sm font-medium transition-colors py-1 whitespace-nowrap ${
                  activePage === link.key ? 'text-gold' : 'text-white/85 hover:text-gold'
                }`}
              >
                {link.label}
                {activePage === link.key && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gold" />
                )}
              </button>
            ))}
          </nav>

          <button
            onClick={() => setMobileSearchOpen((v) => !v)}
            className="sm:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Toggle search"
          >
            <span className="text-lg">🔍</span>
          </button>

          <button
            onClick={() => go('cart')}
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition-all"
            aria-label="View cart"
          >
            <span className="text-xl">🛒</span>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-coral text-white text-[11px] font-bold rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center shadow-sm animate-fade-in">
                {itemCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Toggle menu"
          >
            <span className="text-lg">{menuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {mobileSearchOpen && (
        <form
          onSubmit={submitSearch}
          className="sm:hidden flex items-center bg-white mx-4 mb-3 rounded-xl overflow-hidden shadow-sm animate-fade-in"
        >
          <input
            type="text"
            autoFocus
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            placeholder="Search products..."
            className="flex-1 px-4 py-2.5 text-navy text-sm placeholder:text-navy/40 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-coral hover:bg-coral-dark text-white px-4 py-2.5 text-sm font-semibold transition-colors"
          >
            Go
          </button>
        </form>
      )}

      {menuOpen && (
        <nav className="md:hidden bg-navy-dark border-t border-white/10 px-4 py-3 flex flex-col gap-1 animate-fade-in">
          {navLinks.map((link) => (
            <button
              key={link.key}
              onClick={() => go(link.key)}
              className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activePage === link.key ? 'bg-white/10 text-gold' : 'text-white/85 hover:bg-white/5'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>
      )}

      <div className="hidden sm:block bg-navy-dark/60 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-5 overflow-x-auto no-scrollbar py-2">
          <button
            onClick={() => {
              setCategoryFilter('All')
              setSearchQuery('')
              setLocalQuery('')
              go('shop')
            }}
            className="text-xs sm:text-sm font-medium text-white/80 hover:text-gold whitespace-nowrap transition-colors"
          >
            All Categories
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategoryFilter(cat)
                setSearchQuery('')
                setLocalQuery('')
                go('shop')
              }}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-white/80 hover:text-gold whitespace-nowrap transition-colors"
            >
              <span>{CATEGORY_ICONS[cat]}</span>
              {cat}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
