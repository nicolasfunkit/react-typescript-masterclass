import { Routes, Route } from "react-router-dom"
import { Checkout } from "./Checkout"
import { Home } from "./Home"
import { Cart } from "./Cart"
import { Header } from "./shared/Header"
import { OrderSummary } from "./OrderSummary"


export const App = () => {
  return (
    <>
      <Header/>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<OrderSummary />} />
          <Route>Page not found</Route>
        </Routes>
      </div>
    </>
  )
}
