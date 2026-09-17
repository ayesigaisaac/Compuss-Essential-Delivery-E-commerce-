function formatUGX(amount) {
  return `UGX ${amount.toLocaleString()}`
}

export default function OrderConfirmation({ lastOrder, setActivePage }) {
  if (!lastOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 sm:py-28 text-center">
        <h1 className="text-navy text-2xl font-extrabold mb-2">No recent order</h1>
        <button
          onClick={() => setActivePage('shop')}
          className="bg-coral hover:bg-coral-dark text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-coral/30 transition-all hover:-translate-y-0.5"
        >
          Back to Shop
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-12 sm:py-16">
      <div className="bg-gradient-to-br from-gold/40 via-coral/10 to-navy/5 rounded-3xl shadow-card p-6 sm:p-10 text-center animate-fade-up">
        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-5 rounded-full bg-white shadow-card flex items-center justify-center text-5xl">
          ✅
        </div>
        <h1 className="text-navy text-2xl sm:text-3xl font-extrabold mb-2">Order Placed!</h1>
        <p className="text-navy/70 mb-7 text-sm sm:text-base">
          Thanks, {lastOrder.name}! Your order has been received and is being prepared.
        </p>

        <div className="bg-white rounded-2xl p-5 sm:p-6 text-left mb-7 shadow-card">
          <div className="flex justify-between text-sm mb-3">
            <span className="text-navy/60">Order Number</span>
            <span className="text-navy font-bold tracking-wide">{lastOrder.orderNumber}</span>
          </div>
          <div className="flex justify-between text-sm mb-3">
            <span className="text-navy/60">Delivering To</span>
            <span className="text-navy font-medium">{lastOrder.room}</span>
          </div>
          <div className="flex justify-between text-sm mb-3">
            <span className="text-navy/60">Payment Method</span>
            <span className="text-navy font-medium">{lastOrder.payment}</span>
          </div>
          <div className="flex justify-between text-sm mb-3 border-t border-navy/10 pt-3">
            <span className="text-navy/60">Total Paid</span>
            <span className="text-coral font-extrabold">{formatUGX(lastOrder.total)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-navy/60">Estimated Delivery</span>
            <span className="text-navy font-medium">30–45 minutes</span>
          </div>
        </div>

        <button
          onClick={() => setActivePage('shop')}
          className="bg-coral hover:bg-coral-dark text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-coral/30 transition-all hover:-translate-y-0.5 active:translate-y-0"
        >
          Back to Shop
        </button>
      </div>
    </div>
  )
}
