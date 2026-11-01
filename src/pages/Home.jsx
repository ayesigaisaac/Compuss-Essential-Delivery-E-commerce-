import { ArrowRight, Banknote, Moon, ShieldCheck, Truck } from 'lucide-react'
import ProductCard from '../components/ProductCard.jsx'
import { products, CATEGORIES, CATEGORY_IMAGES, HERO_IMAGE, unsplash } from '../data/products.js'

const trustSignals = [
  { icon: Truck, title: 'Free Delivery in Kampala', desc: 'Delivered to your door' },
  { icon: ShieldCheck, title: '10-Year Warranty', desc: 'On every Roseform mattress' },
  { icon: Moon, title: '100-Night Sleep Trial', desc: 'Sleep on it, risk-free' },
  { icon: Banknote, title: 'Cash on Delivery Available', desc: 'Or pay with Mobile Money' },
]

export default function Home({ setActivePage, setCategoryFilter }) {
  function goToCategory(category) {
    setCategoryFilter(category)
    setActivePage('shop')
  }

  const trendingProducts = [...products].sort((a, b) => b.sold - a.sold).slice(0, 8)

  return (
    <div className="bg-white">
      <section className="grid lg:grid-cols-2 lg:min-h-[640px] bg-[#F7F4F0]">
        <div className="flex flex-col justify-center px-6 py-16 sm:px-12 sm:py-20 lg:px-16 xl:pl-[max(4rem,calc((100vw-80rem)/2+1.5rem))] xl:pr-20">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-coral animate-fade-up">
            Roseform Mattress
          </p>
          <h1 className="mb-6 font-display text-4xl font-medium leading-[1.05] tracking-tight text-navy sm:text-5xl xl:text-6xl animate-fade-up [animation-delay:100ms]">
            Experience Deep, Restorative Sleep.
          </h1>
          <p className="mb-10 max-w-md text-base leading-relaxed text-navy/60 sm:text-lg animate-fade-up [animation-delay:200ms]">
            Premium mattresses crafted for the perfect night's rest. Delivered across Uganda.
          </p>
          <div className="animate-fade-up [animation-delay:300ms]">
            <button
              onClick={() => goToCategory('Mattresses')}
              className="group inline-flex items-center gap-3 rounded-full bg-coral px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-coral/25 transition-all hover:bg-coral-dark hover:shadow-2xl hover:shadow-coral/30"
            >
              Shop Mattresses
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
        <div className="relative h-[360px] sm:h-[480px] lg:h-auto">
          <img
            src={unsplash(HERO_IMAGE, 1600)}
            alt="A made bed with white linen and a tufted headboard"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </section>

      <section className="border-b border-navy/5">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-8 px-6 py-10 lg:grid-cols-4 lg:divide-x lg:divide-navy/10">
          {trustSignals.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center gap-3 px-4 text-center sm:flex-row sm:text-left lg:justify-center">
              <Icon className="h-6 w-6 shrink-0 text-coral" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-semibold text-navy">{title}</p>
                <p className="text-xs text-navy/50">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <div className="mb-10 sm:mb-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-coral">Collections</p>
          <h2 className="font-display text-3xl font-medium tracking-tight text-navy sm:text-4xl">
            Shop by Category
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => goToCategory(cat)}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl shadow-sm transition-shadow hover:shadow-xl"
            >
              <img
                src={unsplash(CATEGORY_IMAGES[cat], 700)}
                alt={cat}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-center p-6 text-white">
                <span className="font-display text-xl font-medium sm:text-2xl">{cat}</span>
                <span className="mt-2 flex items-center gap-1 text-xs font-medium uppercase tracking-widest text-white/80 opacity-0 transition-opacity group-hover:opacity-100">
                  Explore <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-10 flex items-end justify-between sm:mb-12">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-coral">Best Sellers</p>
            <h2 className="font-display text-3xl font-medium tracking-tight text-navy sm:text-4xl">
              Trending Now
            </h2>
          </div>
          <button
            onClick={() => goToCategory('All')}
            className="group flex items-center gap-1.5 text-sm font-semibold text-navy transition-colors hover:text-coral"
          >
            View All
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}
