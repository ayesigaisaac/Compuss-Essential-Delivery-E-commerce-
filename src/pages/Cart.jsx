import { useCart } from '../CartContext.jsx'

function formatUGX(amount) {
  return `UGX ${amount.toLocaleString()}`
}

export default function Cart({ setActivePage }) {
  const { items, updateQuantity, removeFromCart, subtotal, deliveryFee, total } = useCart()

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 sm:py-28 text-center">
        <div className="text-6xl sm:text-7xl mb-5">🛒</div>
        <h1 className="text-navy text-2xl sm:text-3xl font-extrabold mb-2">Your cart is empty</h1>
        <p className="text-navy/60 mb-8 text-sm sm:text-base">
          Add some items from the shop to get started.
        </p>
        <button
          onClick={() => setActivePage('shop')}
          className="bg-coral hover:bg-coral-dark text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-coral/30 transition-all hover:-translate-y-0.5"
        >
          Go to Shop
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <h1 className="text-navy text-2xl sm:text-3xl font-extrabold mb-6 sm:mb-8">Your Cart</h1>

      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-start">
        <div className="lg:col-span-2 flex flex-col gap-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-card p-4 sm:p-5 flex items-center gap-3 sm:gap-4"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-navy/5 flex items-center justify-center text-2xl sm:text-3xl shrink-0">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-navy font-semibold text-sm sm:text-base truncate">
                  {item.name}
                </h3>
                <p className="text-coral font-bold text-sm">{formatUGX(item.price)}</p>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 bg-navy/5 rounded-full p-1">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-7 h-7 rounded-full bg-white text-navy font-bold shadow-sm hover:text-coral transition-colors"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="w-5 text-center text-navy font-semibold text-sm">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-7 h-7 rounded-full bg-white text-navy font-bold shadow-sm hover:text-coral transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-navy/40 hover:text-coral text-lg leading-none ml-1 transition-colors"
                aria-label="Remove item"
                title="Remove"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-card p-5 sm:p-6 lg:sticky lg:top-24">
          <h2 className="text-navy font-bold text-lg mb-4">Order Summary</h2>
          <div className="flex justify-between text-navy/70 mb-2 text-sm">
            <span>Subtotal</span>
            <span className="font-medium text-navy">{formatUGX(subtotal)}</span>
          </div>
          <div className="flex justify-between text-navy/70 mb-3 text-sm">
            <span>Delivery Fee</span>
            <span className="font-medium text-navy">{formatUGX(deliveryFee)}</span>
          </div>
          <div className="flex justify-between text-navy font-extrabold text-lg border-t border-navy/10 pt-3 mb-5">
            <span>Total</span>
            <span className="text-coral">{formatUGX(total)}</span>
          </div>
          <button
            onClick={() => setActivePage('checkout')}
            className="w-full bg-coral hover:bg-coral-dark text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-coral/30 transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            Checkout
          </button>
          <button
            onClick={() => setActivePage('shop')}
            className="w-full text-navy/60 hover:text-navy font-medium py-2.5 text-sm mt-1 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  )
}
