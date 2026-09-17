import { useCart } from '../CartContext.jsx'
import { products, CATEGORIES, CATEGORY_ICONS } from '../data/products.js'

function formatUGX(amount) {
  return `UGX ${amount.toLocaleString()}`
}

const promoTiles = [
  { category: 'Snacks', title: 'Snack Cravings', desc: 'From UGX 1,500', tint: 'bg-coral/10' },
  { category: 'Data Bundles', title: 'Data Deals', desc: 'MTN & Airtel bundles', tint: 'bg-navy/5' },
  { category: 'Stationery', title: 'Back to Class', desc: 'Pens, books & more', tint: 'bg-gold/30' },
  { category: 'Printing', title: 'Print & Bind', desc: 'From UGX 100/page', tint: 'bg-coral/10' },
]

export default function Home({ setActivePage, setCategoryFilter }) {
  const { addToCart } = useCart()

  function goToCategory(category) {
    setCategoryFilter(category)
    setActivePage('shop')
  }

  const dealProducts = [...products].sort((a, b) => b.sold - a.sold).slice(0, 8)

  return (
    <div className="bg-offwhite">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 sm:pt-8">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-3 sm:gap-4">
          <div className="relative overflow-hidden rounded-2xl bg-navy text-white p-6 sm:p-10 lg:p-12 min-h-[260px] sm:min-h-[320px] flex flex-col justify-center">
            <div
              className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-coral/25 blur-3xl animate-float"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-16 left-1/3 w-56 h-56 rounded-full bg-gold/10 blur-3xl animate-float"
              style={{ animationDelay: '1.5s' }}
              aria-hidden="true"
            />
            <span className="relative inline-block w-fit bg-white/10 text-gold text-xs font-semibold px-3 py-1 rounded-full mb-4 animate-fade-up">
              🇺🇬 Campus delivery, every day
            </span>
            <h1 className="relative text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 leading-tight animate-fade-up [animation-delay:100ms]">
              Everything a student <span className="text-gold">needs</span>, delivered fast
            </h1>
            <p className="relative text-white/75 max-w-md mb-6 text-sm sm:text-base animate-fade-up [animation-delay:200ms]">
              Snacks, stationery, data bundles and printing — ordered in seconds, at your
              hostel door in 30–45 minutes.
            </p>
            <div className="relative animate-fade-up [animation-delay:300ms]">
              <button
                onClick={() => setActivePage('shop')}
                className="bg-coral hover:bg-coral-dark text-white font-semibold px-7 py-3 rounded-xl shadow-lg shadow-coral/30 transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                Shop Now
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {promoTiles.map((tile) => (
              <button
                key={tile.title}
                onClick={() => goToCategory(tile.category)}
                className={`group rounded-2xl ${tile.tint} p-4 sm:p-5 flex flex-col justify-between text-left hover:shadow-card-hover transition-all hover:-translate-y-0.5 min-h-[120px] sm:min-h-[150px]`}
              >
                <span className="text-2xl sm:text-3xl">{CATEGORY_ICONS[tile.category]}</span>
                <div>
                  <p className="text-navy font-bold text-xs sm:text-sm">{tile.title}</p>
                  <p className="text-navy/60 text-[11px] sm:text-xs">{tile.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => goToCategory('All')}
            className="flex flex-col items-center gap-2 shrink-0 group"
          >
            <span className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-navy/5 flex items-center justify-center text-2xl sm:text-3xl transition-transform group-hover:scale-110">
              🗂️
            </span>
            <span className="text-navy text-xs font-medium">All</span>
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => goToCategory(cat)}
              className="flex flex-col items-center gap-2 shrink-0 group"
            >
              <span className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-coral/10 flex items-center justify-center text-2xl sm:text-3xl transition-transform group-hover:scale-110">
                {CATEGORY_ICONS[cat]}
              </span>
              <span className="text-navy text-xs font-medium whitespace-nowrap">{cat}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-14 sm:pb-16">
        <div className="flex items-center justify-between mb-4 sm:mb-5">
          <h2 className="text-navy text-lg sm:text-2xl font-extrabold flex items-center gap-2">
            <span className="text-coral">🔥</span> Trending Now
          </h2>
          <button
            onClick={() => setActivePage('shop')}
            className="text-coral text-xs sm:text-sm font-semibold hover:text-coral-dark transition-colors"
          >
            View All →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {dealProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all p-3.5 sm:p-4 flex flex-col hover:-translate-y-1"
            >
              <div className="w-full aspect-square rounded-xl bg-navy/5 flex items-center justify-center text-4xl sm:text-5xl mb-3 transition-transform group-hover:scale-105">
                {product.icon}
              </div>
              <h3 className="text-navy font-medium text-xs sm:text-sm mb-1 line-clamp-2 leading-snug min-h-[2.5em]">
                {product.name}
              </h3>
              <div className="flex items-baseline justify-between mt-1 mb-3">
                <p className="text-coral font-extrabold text-sm sm:text-lg">
                  {formatUGX(product.price)}
                </p>
                <span className="text-navy/35 text-[10px] sm:text-xs">{product.sold} sold</span>
              </div>
              <button
                onClick={() => addToCart(product)}
                className="bg-coral hover:bg-coral-dark text-white text-xs sm:text-sm font-semibold py-2 sm:py-2.5 rounded-xl transition-all active:scale-95"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
