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
  const [searchQuery, setSearchQuery] = useState('')
  const [lastOrder, setLastOrder] = useState(null)

  function goToShop(category) {
    setCategoryFilter(category)
    setSearchQuery('')
    setActivePage('shop')
  }

  function renderPage() {
    switch (activePage) {
      case 'home':
        return <Home setActivePage={setActivePage} setCategoryFilter={goToShop} />
      case 'shop':
        return (
          <Shop
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )
      case 'cart':
        return <Cart setActivePage={setActivePage} />
      case 'checkout':
        return <Checkout setActivePage={setActivePage} setLastOrder={setLastOrder} />
      case 'confirmation':
        return <OrderConfirmation lastOrder={lastOrder} setActivePage={setActivePage} />
      default:
        return <Home setActivePage={setActivePage} setCategoryFilter={goToShop} />
    }
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-offwhite flex flex-col overflow-x-hidden">
        <Header
          activePage={activePage}
          setActivePage={setActivePage}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setCategoryFilter={setCategoryFilter}
        />
        <main className="flex-1">{renderPage()}</main>
        <footer className="bg-navy text-white/70 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2 font-bold text-white text-sm">
              <span className="w-7 h-7 rounded-lg bg-coral flex items-center justify-center text-sm">
                🎒
              </span>
              Campus Essentials Delivery
            </div>
            <p className="text-xs sm:text-sm">
              © {new Date().getFullYear()} Serving students across Uganda 🇺🇬
            </p>
          </div>
        </footer>
      </div>
    </CartProvider>
  )
}
