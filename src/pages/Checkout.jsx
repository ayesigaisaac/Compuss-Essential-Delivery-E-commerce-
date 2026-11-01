import { useState } from 'react'
import { Banknote, Smartphone } from 'lucide-react'
import { useCart } from '../CartContext.jsx'
import { unsplash } from '../data/products.js'
import { PAYMENT_METHODS, formatUGX, generateOrderNumber, saveOrder } from '../orders.js'

const paymentOptions = [
  { value: 'cod', icon: Banknote, hint: 'Pay in cash when your order arrives' },
  { value: 'momo', icon: Smartphone, hint: 'Pay via MTN or Airtel Mobile Money' },
]

export default function Checkout({ setActivePage, setLastOrder }) {
  const { items, subtotal, deliveryFee, total, clearCart } = useCart()
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    payment: 'cod',
  })
  const [errors, setErrors] = useState({})

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function validate() {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'Full name is required'
    const phoneDigits = form.phone.replace(/\D/g, '')
    if (!phoneDigits) newErrors.phone = 'Phone number is required'
    else if (phoneDigits.length < 10) newErrors.phone = 'Phone number must be at least 10 digits'
    if (!form.address.trim()) newErrors.address = 'Delivery address is required'
    if (!form.payment) newErrors.payment = 'Please select a payment method'
    return newErrors
  }

  function handleSubmit(e) {
    e.preventDefault()
    const newErrors = validate()
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    const order = {
      orderNumber: generateOrderNumber(),
      createdAt: new Date().toISOString(),
      name: form.name.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      payment: PAYMENT_METHODS[form.payment],
      items: items.map(({ id, name, price, quantity }) => ({ id, name, price, quantity })),
      subtotal,
      deliveryFee,
      total,
    }
    saveOrder(order)
    setLastOrder(order)
    clearCart()
    setActivePage('confirmation')
  }

  const inputBase =
    'w-full border rounded-xl px-4 py-3 text-navy text-sm placeholder:text-navy/30 focus:outline-none focus:ring-2 transition-all'

  function inputClass(field) {
    return errors[field]
      ? `${inputBase} border-coral/60 focus:ring-coral/20`
      : `${inputBase} border-navy/15 focus:border-coral focus:ring-coral/10`
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 sm:py-28 text-center">
        <h1 className="text-navy text-2xl font-extrabold mb-2">Nothing to checkout</h1>
        <p className="text-navy/60 mb-8">Your cart is empty.</p>
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
      <h1 className="text-navy text-2xl sm:text-3xl font-extrabold mb-6 sm:mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-start">
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-2 bg-white rounded-2xl shadow-card p-5 sm:p-7 flex flex-col gap-5"
          noValidate
        >
          <div>
            <label className="block text-navy font-semibold text-sm mb-1.5" htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={inputClass('name')}
              placeholder="e.g. Nakato Sarah"
            />
            {errors.name && <p className="text-coral text-xs mt-1.5 font-medium">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-navy font-semibold text-sm mb-1.5" htmlFor="phone">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className={inputClass('phone')}
              placeholder="e.g. 0700 123456"
            />
            {errors.phone && <p className="text-coral text-xs mt-1.5 font-medium">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-navy font-semibold text-sm mb-1.5" htmlFor="address">
              Delivery Address
            </label>
            <input
              id="address"
              type="text"
              value={form.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className={inputClass('address')}
              placeholder="e.g. Plot 12, Ntinda Road, Kampala"
            />
            {errors.address && <p className="text-coral text-xs mt-1.5 font-medium">{errors.address}</p>}
          </div>

          <div>
            <span className="block text-navy font-semibold text-sm mb-2">Payment Method</span>
            <div className="grid sm:grid-cols-2 gap-3">
              {paymentOptions.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-center gap-3 text-navy text-sm rounded-xl px-4 py-3.5 cursor-pointer border transition-all ${
                    form.payment === opt.value
                      ? 'border-coral bg-coral/5 ring-2 ring-coral/10'
                      : 'border-navy/15 hover:border-navy/30'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={opt.value}
                    checked={form.payment === opt.value}
                    onChange={(e) => handleChange('payment', e.target.value)}
                    className="accent-coral w-4 h-4"
                  />
                  <opt.icon className="w-5 h-5 shrink-0 text-navy/60" strokeWidth={1.75} />
                  <span>
                    <span className="block font-medium">{PAYMENT_METHODS[opt.value]}</span>
                    <span className="block text-xs text-navy/50">{opt.hint}</span>
                  </span>
                </label>
              ))}
            </div>
            {errors.payment && <p className="text-coral text-xs mt-1.5 font-medium">{errors.payment}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-coral hover:bg-coral-dark text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-coral/30 transition-all hover:-translate-y-0.5 active:translate-y-0 mt-1"
          >
            Place Order
          </button>
        </form>

        <div className="bg-white rounded-2xl shadow-card p-5 sm:p-6 lg:sticky lg:top-24">
          <h2 className="text-navy font-bold text-lg mb-4">Order Summary</h2>
          <div className="flex flex-col gap-2.5 mb-4 max-h-56 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 text-sm">
                <img src={unsplash(item.image, 96)} alt="" className="w-9 h-9 rounded-lg object-cover bg-gray-50 shrink-0" />
                <span className="flex-1 text-navy/80 truncate">
                  {item.name} <span className="text-navy/40">×{item.quantity}</span>
                </span>
                <span className="text-navy font-medium">
                  {formatUGX(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-navy/70 mb-2 text-sm border-t border-navy/10 pt-3">
            <span>Subtotal</span>
            <span className="font-medium text-navy">{formatUGX(subtotal)}</span>
          </div>
          <div className="flex justify-between text-navy/70 mb-3 text-sm">
            <span>Delivery Fee</span>
            <span className="font-medium text-navy">{formatUGX(deliveryFee)}</span>
          </div>
          <div className="flex justify-between text-navy font-extrabold text-lg border-t border-navy/10 pt-3">
            <span>Total</span>
            <span className="text-coral">{formatUGX(total)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
