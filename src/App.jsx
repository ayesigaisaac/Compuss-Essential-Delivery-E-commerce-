import { useState } from 'react'
import { CartProvider } from './CartContext.jsx'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import Shop from './pages/Shop.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import OrderConfirmation from './pages/OrderConfirmation.jsx'

export default function App() {
  const [activePage, setActivePage] = useState('home')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [lastOrder, setLastOrder] = useState(null)

  function renderPage() {
    switch (activePage) {
      case 'home':
        return <Home setActivePage={setActivePage} setCategoryFilter={setCategoryFilter} />
      case 'shop':
        return <Shop categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} />
      case 'cart':
        return <Cart setActivePage={setActivePage} />
      case 'checkout':
        return <Checkout setActivePage={setActivePage} setLastOrder={setLastOrder} />
      case 'confirmation':
        return <OrderConfirmation lastOrder={lastOrder} setActivePage={setActivePage} />
      default:
        return <Home setActivePage={setActivePage} setCategoryFilter={setCategoryFilter} />
    }
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-offwhite flex flex-col">
        <Header activePage={activePage} setActivePage={setActivePage} />
        <main className="flex-1">{renderPage()}</main>
        <footer className="bg-navy text-white/70 text-center text-sm py-6 mt-8">
          <p>© {new Date().getFullYear()} Campus Essentials Delivery — Serving students across Uganda 🇺🇬</p>
        </footer>
      </div>
    </CartProvider>
  )
}
