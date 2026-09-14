import { useCart } from '../CartContext.jsx'

export default function Header({ activePage, setActivePage }) {
  const { itemCount } = useCart()

  const navLinks = [
    { key: 'home', label: 'Home' },
    { key: 'shop', label: 'Shop' },
  ]

  return (
    <header className="bg-navy text-white sticky top-0 z-20 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setActivePage('home')}
          className="flex items-center gap-2 font-bold text-lg sm:text-xl"
        >
          <span>🎒</span>
          <span>Campus Essentials Delivery</span>
        </button>

        <div className="flex items-center gap-4 sm:gap-6">
          <nav className="flex items-center gap-3 sm:gap-5">
            {navLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => setActivePage(link.key)}
                className={`text-sm sm:text-base font-medium transition-colors ${
                  activePage === link.key
                    ? 'text-gold'
                    : 'text-white hover:text-gold'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => setActivePage('cart')}
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="View cart"
          >
            <span className="text-xl">🛒</span>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-coral text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
