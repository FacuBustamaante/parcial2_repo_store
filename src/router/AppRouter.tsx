import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Orders from "../features/orders/pages/Orders";
import ShoppingList from "../features/products/pages/ShoppingList";
import { CartDrawer } from "../features/cart/components/CartDrawer";
import Header from "../shared/Header";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { RegisterPage } from "../features/auth/pages/RegisterPage";
import { useAuthStore } from "../store/useAuthStore";
import PaymentPage from "../features/cart/pages/PaymentPage";
import SuccessPage from "../features/cart/components/SuccessPage";

const AppRouter = () => {
   const checkAuth = useAuthStore((s) => s.checkAuth);

   useEffect(() => {
      checkAuth();
   }, []);

   return (
      <BrowserRouter>
         <Header />
         <CartDrawer />
         <main>
            <Routes>
               <Route path="/" element={<ShoppingList />} />
               <Route path="/store" element={<ShoppingList />} />
               <Route path="/orders" element={<Orders />} />
               <Route path="/login" element={<LoginPage />} />
               <Route path="/register" element={<RegisterPage />} />
               <Route path="/payment/:orderId" element={<PaymentPage />} />
               <Route path="/orders/:id/success" element={<SuccessPage />} />

            </Routes>
         </main>
      </BrowserRouter>
   )
}

export default AppRouter