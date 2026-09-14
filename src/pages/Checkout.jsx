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

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-navy text-2xl font-bold mb-2">Nothing to checkout</h1>
        <p className="text-navy/60 mb-6">Your cart is empty.</p>
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
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-navy text-2xl sm:text-3xl font-bold mb-6">Checkout</h1>

      <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
        <div className="flex justify-between text-navy/80 mb-2 text-sm">
          <span>Subtotal</span>
          <span>{formatUGX(subtotal)}</span>
        </div>
        <div className="flex justify-between text-navy/80 mb-2 text-sm">
          <span>Delivery Fee</span>
          <span>{formatUGX(deliveryFee)}</span>
        </div>
        <div className="flex justify-between text-navy font-bold border-t border-navy/10 pt-2 text-base">
          <span>Total</span>
          <span>{formatUGX(total)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-5 flex flex-col gap-4" noValidate>
        <div>
          <label className="block text-navy font-medium text-sm mb-1" htmlFor="name">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full border border-navy/20 rounded-lg px-3 py-2 text-navy focus:outline-none focus:border-coral"
            placeholder="e.g. Nakato Sarah"
          />
          {errors.name && <p className="text-coral text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-navy font-medium text-sm mb-1" htmlFor="phone">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-full border border-navy/20 rounded-lg px-3 py-2 text-navy focus:outline-none focus:border-coral"
            placeholder="e.g. 0700 123456"
          />
          {errors.phone && <p className="text-coral text-xs mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-navy font-medium text-sm mb-1" htmlFor="room">
            Hostel / Room Number
          </label>
          <input
            id="room"
            type="text"
            value={form.room}
            onChange={(e) => handleChange('room', e.target.value)}
            className="w-full border border-navy/20 rounded-lg px-3 py-2 text-navy focus:outline-none focus:border-coral"
            placeholder="e.g. Block C, Room 14"
          />
          {errors.room && <p className="text-coral text-xs mt-1">{errors.room}</p>}
        </div>

        <div>
          <span className="block text-navy font-medium text-sm mb-2">Payment Method</span>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-navy text-sm border border-navy/20 rounded-lg px-3 py-2 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="Mobile Money - MTN"
                checked={form.payment === 'Mobile Money - MTN'}
                onChange={(e) => handleChange('payment', e.target.value)}
                className="accent-coral"
              />
              Mobile Money – MTN
            </label>
            <label className="flex items-center gap-2 text-navy text-sm border border-navy/20 rounded-lg px-3 py-2 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="Mobile Money - Airtel"
                checked={form.payment === 'Mobile Money - Airtel'}
                onChange={(e) => handleChange('payment', e.target.value)}
                className="accent-coral"
              />
              Mobile Money – Airtel
            </label>
          </div>
          {errors.payment && <p className="text-coral text-xs mt-1">{errors.payment}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-coral hover:bg-coral-dark text-white font-semibold py-3 rounded-xl transition-colors mt-2"
        >
          Place Order
        </button>
      </form>
    </div>
  )
}
