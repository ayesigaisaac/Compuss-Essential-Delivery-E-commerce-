import { useCart } from '../CartContext.jsx'

function formatUGX(amount) {
  return `UGX ${amount.toLocaleString()}`
}

export default function Cart({ setActivePage }) {
  const { items, updateQuantity, removeFromCart, subtotal, deliveryFee, total } = useCart()

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-navy text-2xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-navy/60 mb-6">Add some items from the shop to get started.</p>
        <button
          onClick={() => setActivePage('shop')}
          className="bg-coral hover:bg-coral-dark text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          Go to Shop
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-navy text-2xl sm:text-3xl font-bold mb-6">Your Cart</h1>

      <div className="flex flex-col gap-3 mb-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4"
          >
            <div className="text-3xl">{item.icon}</div>
            <div className="flex-1 min-w-0">
              <h3 className="text-navy font-semibold text-sm sm:text-base truncate">
                {item.name}
              </h3>
              <p className="text-coral font-bold text-sm">{formatUGX(item.price)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-7 h-7 rounded-full bg-navy/10 text-navy font-bold hover:bg-navy/20 transition-colors"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-6 text-center text-navy font-medium">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-7 h-7 rounded-full bg-navy/10 text-navy font-bold hover:bg-navy/20 transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-coral hover:text-coral-dark text-sm font-medium ml-2"
              aria-label="Remove item"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-5">
        <div className="flex justify-between text-navy/80 mb-2 text-sm sm:text-base">
          <span>Subtotal</span>
          <span>{formatUGX(subtotal)}</span>
        </div>
        <div className="flex justify-between text-navy/80 mb-3 text-sm sm:text-base">
          <span>Delivery Fee</span>
          <span>{formatUGX(deliveryFee)}</span>
        </div>
        <div className="flex justify-between text-navy font-bold text-lg border-t border-navy/10 pt-3 mb-5">
          <span>Total</span>
          <span>{formatUGX(total)}</span>
        </div>
        <button
          onClick={() => setActivePage('checkout')}
          className="w-full bg-coral hover:bg-coral-dark text-white font-semibold py-3 rounded-xl transition-colors"
        >
          Checkout
        </button>
      </div>
    </div>
  )
}
