const categories = [
  { name: 'Stationery', icon: '📓', tint: 'bg-coral/15' },
  { name: 'Snacks', icon: '🥟', tint: 'bg-gold/40' },
  { name: 'Data Bundles', icon: '📶', tint: 'bg-navy/10' },
  { name: 'Printing', icon: '🖨️', tint: 'bg-coral/15' },
]

const perks = [
  { icon: '⚡', title: 'Fast Delivery', desc: '30–45 mins to your hostel or lecture hall' },
  { icon: '📱', title: 'Mobile Money', desc: 'Pay easily with MTN or Airtel' },
  { icon: '🎓', title: 'By Students', desc: 'Run by students, for students' },
]

export default function Home({ setActivePage, setCategoryFilter }) {
  function goToCategory(category) {
    setCategoryFilter(category)
    setActivePage('shop')
  }

  return (
    <div>
      <section className="relative overflow-hidden bg-navy text-white">
        <div
          className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-coral/20 blur-3xl animate-float"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -left-16 w-64 h-64 rounded-full bg-gold/10 blur-3xl animate-float"
          style={{ animationDelay: '1.5s' }}
          aria-hidden="true"
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-28 text-center">
          <span className="inline-block bg-white/10 text-gold text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-5 animate-fade-up">
            🇺🇬 Delivering across campus, every day
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-5 leading-tight animate-fade-up [animation-delay:100ms]">
            Campus Essentials, <br className="hidden sm:block" />
            <span className="text-gold">Delivered Fast</span>
          </h1>
          <p className="text-white/80 max-w-xl mx-auto mb-8 text-sm sm:text-base lg:text-lg animate-fade-up [animation-delay:200ms]">
            Stationery, snacks, data bundles and printing — ordered from your phone,
            delivered straight to your hostel by fellow students.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-up [animation-delay:300ms]">
            <button
              onClick={() => setActivePage('shop')}
              className="bg-coral hover:bg-coral-dark text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-coral/30 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              Shop Now
            </button>
            <button
              onClick={() => goToCategory('Data Bundles')}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-xl border border-white/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              Buy Data Bundles
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-10 relative z-10">
        <div className="grid grid-cols-3 gap-3 sm:gap-6 bg-white rounded-2xl shadow-card p-4 sm:p-6">
          {perks.map((perk) => (
            <div key={perk.title} className="flex flex-col items-center text-center gap-1 sm:gap-2">
              <span className="text-2xl sm:text-3xl">{perk.icon}</span>
              <span className="text-navy font-semibold text-xs sm:text-sm">{perk.title}</span>
              <span className="hidden sm:block text-navy/60 text-xs">{perk.desc}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-navy text-2xl sm:text-3xl font-extrabold mb-2">
            Shop by Category
          </h2>
          <p className="text-navy/60 text-sm sm:text-base">
            Everything a student needs, just a tap away.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat, i) => (
            <button
              key={cat.name}
              onClick={() => goToCategory(cat.name)}
              style={{ animationDelay: `${i * 80}ms` }}
              className="group bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all p-5 sm:p-6 flex flex-col items-center gap-3 hover:-translate-y-1 animate-fade-up"
            >
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-3xl sm:text-4xl transition-transform group-hover:scale-110 ${cat.tint}`}
              >
                {cat.icon}
              </div>
              <span className="text-navy font-semibold text-sm sm:text-base text-center">
                {cat.name}
              </span>
              <span className="text-coral text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Shop now →
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
