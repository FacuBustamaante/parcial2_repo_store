import { BrowserRouter, Routes, Route } from "react-router-dom";
import Orders from "../features/products/pages/Orders";
import ShoppingList from "../features/products/pages/ShoppingList";
import { CartDrawer } from "../features/cart/components/CartDrawer";
import Header from "../shared/Header";
import '../index.css'

const AppRouter = () => {
   return (
      <BrowserRouter>
         <Header />
         <CartDrawer />
         <main>
            <Routes>
               <Route path="/" element={<h1 className="text-3xl font-bold">Programación IV | Parcial 1</h1>} />
               <Route path="/store" element={<ShoppingList />} />
               <Route path="/orders" element={<Orders />} />
            </Routes>
         </main>
      </BrowserRouter>
   )
}

export default AppRouter