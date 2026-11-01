import { CheckCircle2, MessageCircle } from 'lucide-react'
import { formatUGX, getLatestOrder, whatsappLink } from '../orders.js'

export default function OrderConfirmation({ lastOrder, setActivePage }) {
  const order = lastOrder || getLatestOrder()

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 sm:py-28 text-center">
        <h1 className="text-navy text-2xl font-extrabold mb-6">No recent order</h1>
        <button
          onClick={() => setActivePage('shop')}
          className="bg-coral hover:bg-coral-dark text-white font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-coral/30 transition-all hover:-translate-y-0.5"
        >
          Back to Shop
        </button>
      </div>
    )
  }

  const rows = [
    { label: 'Order Number', value: order.orderNumber, strong: true },
    { label: 'Total Amount', value: formatUGX(order.total), accent: true },
    { label: 'Payment Method', value: order.payment },
    { label: 'Delivery Address', value: order.address },
  ]

  return (
    <div className="max-w-xl mx-auto px-4 py-12 sm:py-16">
      <div className="bg-white rounded-3xl shadow-card p-6 sm:p-10 text-center animate-fade-up">
        <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-emerald-50 flex items-center justify-center">
          <CheckCircle2 className="w-11 h-11 text-emerald-500" strokeWidth={1.75} />
        </div>
        <h1 className="font-display text-navy text-3xl font-medium tracking-tight mb-2">
          Order Placed!
        </h1>
        <p className="text-navy/60 mb-8 text-sm sm:text-base">
          Thanks, {order.name}! Confirm your order on WhatsApp so we can arrange delivery.
        </p>

        <dl className="bg-gray-50 rounded-2xl p-5 sm:p-6 text-left mb-8 divide-y divide-navy/5">
          {rows.map((row) => (
            <div key={row.label} className="flex justify-between gap-6 py-3 first:pt-0 last:pb-0 text-sm">
              <dt className="text-navy/50 shrink-0">{row.label}</dt>
              <dd
                className={`text-right ${
                  row.accent
                    ? 'font-display text-lg text-coral'
                    : row.strong
                      ? 'font-bold tracking-wide text-navy'
                      : 'font-medium text-navy'
                }`}
              >
                {row.value}
              </dd>
            </div>
          ))}
        </dl>

        <a
          href={whatsappLink(order)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] py-4 text-base font-semibold text-white shadow-xl shadow-[#25D366]/30 transition-all hover:-translate-y-0.5 hover:bg-[#1EBE5A]"
        >
          <MessageCircle className="w-5 h-5" />
          Confirm Order on WhatsApp
        </a>
        <button
          onClick={() => setActivePage('shop')}
          className="mt-4 text-sm font-semibold text-navy/60 transition-colors hover:text-coral"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  )
}
