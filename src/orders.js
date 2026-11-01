export const ORDERS_KEY = 'roseform_orders'

// Placeholder business number — replace with the real WhatsApp number (country code, no +).
export const WHATSAPP_NUMBER = '256700000000'

export const PAYMENT_METHODS = {
  cod: 'Cash on Delivery',
  momo: 'Mobile Money (MTN / Airtel)',
}

export function formatUGX(amount) {
  return `UGX ${amount.toLocaleString('en-US')}`
}

export function getOrders() {
  try {
    const orders = JSON.parse(localStorage.getItem(ORDERS_KEY))
    return Array.isArray(orders) ? orders : []
  } catch {
    return []
  }
}

export function saveOrder(order) {
  const orders = getOrders()
  orders.push(order)
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
  } catch {
    // Storage full or disabled — the order still reaches the confirmation page.
  }
}

export function getLatestOrder() {
  const orders = getOrders()
  return orders[orders.length - 1] || null
}

export function generateOrderNumber() {
  const taken = new Set(getOrders().map((o) => o.orderNumber))
  let orderNumber
  do {
    orderNumber = `RFM-${Math.floor(10000 + Math.random() * 90000)}`
  } while (taken.has(orderNumber))
  return orderNumber
}

export function whatsappLink(order) {
  const text =
    `Hello Roseform, I want to confirm my order ${order.orderNumber} ` +
    `for ${formatUGX(order.total)} via ${order.payment}. ` +
    `My address is ${order.address}.`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}
