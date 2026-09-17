import { useEffect, useState } from 'react'
import { useCart } from '../CartContext.jsx'

export default function Header({ activePage, setActivePage }) {
  const { itemCount } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

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

  return (
    <header
      className={`sticky top-0 z-30 transition-shadow duration-300 bg-navy/95 backdrop-blur-md text-white ${
        scrolled ? 'shadow-nav' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <button
          onClick={() => go('home')}
          className="flex items-center gap-2 font-extrabold text-base sm:text-xl tracking-tight"
        >
          <span className="w-9 h-9 rounded-xl bg-coral flex items-center justify-center text-lg shrink-0">
            🎒
          </span>
          <span className="hidden xs:inline sm:inline">Campus Essentials</span>
          <span className="xs:hidden sm:hidden">CED</span>
        </button>

        <div className="flex items-center gap-2 sm:gap-6">
          <nav className="hidden sm:flex items-center gap-5">
            {navLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => go(link.key)}
                className={`relative text-sm font-medium transition-colors py-1 ${
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
            className="sm:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Toggle menu"
          >
            <span className="text-lg">{menuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="sm:hidden bg-navy-dark border-t border-white/10 px-4 py-3 flex flex-col gap-1 animate-fade-in">
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
    </header>
  )
}
