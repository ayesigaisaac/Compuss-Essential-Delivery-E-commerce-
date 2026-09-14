function formatUGX(amount) {
  return `UGX ${amount.toLocaleString()}`
}

export default function OrderConfirmation({ lastOrder, setActivePage }) {
  if (!lastOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-navy text-2xl font-bold mb-2">No recent order</h1>
        <button
          onClick={() => setActivePage('shop')}
          className="bg-coral hover:bg-coral-dark text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          Back to Shop
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <div className="bg-gradient-to-br from-gold/40 to-coral/10 rounded-xl shadow-sm p-8 text-center">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-navy text-2xl sm:text-3xl font-bold mb-2">Order Placed!</h1>
        <p className="text-navy/70 mb-6">
          Thanks, {lastOrder.name}! Your order has been received and is being prepared.
        </p>

        <div className="bg-white rounded-xl p-5 text-left mb-6 shadow-sm">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-navy/60">Order Number</span>
            <span className="text-navy font-bold">{lastOrder.orderNumber}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-navy/60">Delivering To</span>
            <span className="text-navy font-medium">{lastOrder.room}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-navy/60">Payment Method</span>
            <span className="text-navy font-medium">{lastOrder.payment}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-navy/60">Total Paid</span>
            <span className="text-coral font-bold">{formatUGX(lastOrder.total)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-navy/60">Estimated Delivery</span>
            <span className="text-navy font-medium">30–45 minutes</span>
          </div>
        </div>

        <button
          onClick={() => setActivePage('shop')}
          className="bg-coral hover:bg-coral-dark text-white font-semibold px-8 py-3 rounded-xl transition-colors"
        >
          Back to Shop
        </button>
      </div>
    </div>
  )
}
