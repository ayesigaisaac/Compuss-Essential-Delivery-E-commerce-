const categories = [
  { name: 'Stationery', icon: '📓', tint: 'bg-coral/15' },
  { name: 'Snacks', icon: '🥟', tint: 'bg-gold/40' },
  { name: 'Data Bundles', icon: '📶', tint: 'bg-navy/10' },
  { name: 'Printing', icon: '🖨️', tint: 'bg-coral/15' },
]

export default function Home({ setActivePage, setCategoryFilter }) {
  function goToCategory(category) {
    setCategoryFilter(category)
    setActivePage('shop')
  }

  return (
    <div>
      <section className="bg-navy text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24 text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-4">
            Campus Essentials, <span className="text-gold">Delivered Fast</span>
          </h1>
          <p className="text-white/80 max-w-xl mx-auto mb-8 text-sm sm:text-base">
            Stationery, snacks, data bundles and printing — ordered from your phone,
            delivered straight to your hostel by fellow students.
          </p>
          <button
            onClick={() => setActivePage('shop')}
            className="bg-coral hover:bg-coral-dark text-white font-semibold px-8 py-3 rounded-xl shadow-md transition-colors"
          >
            Shop Now
          </button>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-navy text-xl sm:text-2xl font-bold mb-6 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => goToCategory(cat.name)}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col items-center gap-3"
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${cat.tint}`}
              >
                {cat.icon}
              </div>
              <span className="text-navy font-semibold text-sm sm:text-base text-center">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
