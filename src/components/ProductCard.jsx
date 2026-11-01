import { useState } from 'react'
import { Check, ShoppingBag } from 'lucide-react'
import { useCart } from '../CartContext.jsx'
import { unsplash } from '../data/products.js'

function formatUGX(amount) {
  return `UGX ${amount.toLocaleString()}`
}

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  function handleAdd() {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 900)
  }

  return (
    <div className="group flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-50">
        <img
          src={unsplash(product.image, 600)}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {product.tag && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-navy backdrop-blur">
            {product.tag}
          </span>
        )}
        <button
          onClick={handleAdd}
          className={`absolute inset-x-3 bottom-3 flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-medium shadow-lg transition-all duration-300 md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 ${
            added ? 'bg-navy text-white' : 'bg-white text-navy hover:bg-navy hover:text-white'
          }`}
        >
          {added ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
          {added ? 'Added' : 'Add to Cart'}
        </button>
      </div>
      <div className="pt-4">
        <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.15em] text-navy/40">
          {product.category}
        </p>
        <h3 className="mb-1.5 line-clamp-2 text-sm font-semibold leading-snug text-navy sm:text-base">
          {product.name}
        </h3>
        <p className="font-display text-base tabular-nums text-navy/80 sm:text-lg">
          {formatUGX(product.price)}
        </p>
      </div>
    </div>
  )
}
