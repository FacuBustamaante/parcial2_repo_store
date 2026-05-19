import { BrowserRouter, Routes, Route } from "react-router-dom";
import Orders from "../features/products/pages/Orders";
import ShoppingList from "../features/products/pages/ShoppingList";
import Header from "../features/products/components/Header";

const AppRouter = () => {
   return (
      <BrowserRouter>
         <Header />
         <main className="pt-30">
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