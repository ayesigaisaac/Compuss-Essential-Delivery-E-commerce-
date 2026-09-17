import { useState } from 'react'
import { useCart } from '../CartContext.jsx'

function formatUGX(amount) {
  return `UGX ${amount.toLocaleString()}`
}

export default function Checkout({ setActivePage, setLastOrder }) {
  const { items, subtotal, deliveryFee, total, clearCart } = useCart()
  const [form, setForm] = useState({
    name: '',
    phone: '',
    room: '',
    payment: '',
  })
  const [errors, setErrors] = useState({})

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function validate() {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'Full name is required'
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!form.room.trim()) newErrors.room = 'Hostel/room number is required'
    if (!form.payment) newErrors.payment = 'Please select a payment method'
    return newErrors
  }

  function handleSubmit(e) {
    e.preventDefault()
    const newErrors = validate()
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    const orderNumber = `CED-${Math.floor(100000 + Math.random() * 900000)}`
    setLastOrder({
      orderNumber,
      name: form.name,
      phone: form.phone,
      room: form.room,
      payment: form.payment,
      total,
    })
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
            <label className="block text-navy font-semibold text-sm mb-1.5" htmlFor="room">
              Hostel / Room Number
            </label>
            <input
              id="room"
              type="text"
              value={form.room}
              onChange={(e) => handleChange('room', e.target.value)}
              className={inputClass('room')}
              placeholder="e.g. Block C, Room 14"
            />
            {errors.room && <p className="text-coral text-xs mt-1.5 font-medium">{errors.room}</p>}
          </div>

          <div>
            <span className="block text-navy font-semibold text-sm mb-2">Payment Method</span>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { value: 'Mobile Money - MTN', label: 'Mobile Money – MTN', icon: '🟡' },
                { value: 'Mobile Money - Airtel', label: 'Mobile Money – Airtel', icon: '🔴' },
              ].map((opt) => (
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
                  <span className="text-lg">{opt.icon}</span>
                  <span className="font-medium">{opt.label}</span>
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
                <span className="text-xl">{item.icon}</span>
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
