import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Orders from "../features/orders/pages/Orders";
import ShoppingList from "../features/products/pages/ShoppingList";
import { CartDrawer } from "../features/cart/components/CartDrawer";
import Header from "../shared/Header";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { RegisterPage } from "../features/auth/pages/RegisterPage";
import { useAuthStore } from "../store/useAuthStore";
import PaymentPage from "../features/cart/pages/PaymentPage";
import SuccessPage from "../features/cart/components/SuccessPage";
import NotFound from "../shared/pages/NotFound";

const SessionWatcher = () => {
   const clearSession = useAuthStore((s) => s.clearSession);
   const navigate = useNavigate();

   useEffect(() => {
      const handleUnauthorized = () => {
         clearSession();
         navigate("/login", { replace: true });
      };
      window.addEventListener("auth:unauthorized", handleUnauthorized);
      return () => window.removeEventListener("auth:unauthorized", handleUnauthorized);
   }, [clearSession, navigate]);

   return null;
};

const AppRouter = () => {
   const checkAuth = useAuthStore((s) => s.checkAuth);

   useEffect(() => {
      checkAuth();
   }, []);

   return (
      <BrowserRouter>
         <SessionWatcher />
         <Header />
         <CartDrawer />
         <main className="pt-(--header-h)">
            <Routes>
               <Route path="/" element={<ShoppingList />} />
               <Route path="/store" element={<ShoppingList />} />
               <Route path="/orders" element={<Orders />} />
               <Route path="/login" element={<LoginPage />} />
               <Route path="/register" element={<RegisterPage />} />
               <Route path="/payment/:orderId" element={<PaymentPage />} />
               <Route path="/orders/:id/success" element={<SuccessPage />} />
               <Route path="*" element={<NotFound />} />
            </Routes>
         </main>
      </BrowserRouter>
   )
}

export default AppRouter