import React, { useEffect } from "react";
import { Counter } from "./features/counter/Counter";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProtectedRoutes from "./features/auth/components/ProtectedRoutes";
import { useDispatch, useSelector } from "react-redux";
import { getItemsByUserIdAsync } from "./features/cart/cartSlice";
import { selectLoggedInUser } from "./features/auth/authSlice";

const appRouter = createBrowserRouter([
  {
    path: "/",
    // element: (
    //   <ProtectedRoutes>
    //     <Home></Home>
    //   </ProtectedRoutes>
    // ),
    element: <Home></Home>,
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/cart",
    element: <CartPage></CartPage>,
    // element: (
    //   <ProtectedRoutes>
    //     <CartPage></CartPage>
    //   </ProtectedRoutes>
    // ),
  },
  {
    path: "/checkout",
    element: <Checkout />,
    // element: (
    //   <ProtectedRoutes>
    //     <Checkout />
    //   </ProtectedRoutes>
    // ),
  },
  {
    path: "/product-detail/:id",
    element: <ProductDetailPage />,
    // element: (
    //   <ProtectedRoutes>
    //     <ProductDetailPage />
    //   </ProtectedRoutes>
    // ),
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  useEffect(() => {
    if (user) dispatch(getItemsByUserIdAsync(user?.id));
  }, [dispatch, user]);
  return (
    <div>
      <RouterProvider router={appRouter}></RouterProvider>
    </div>
  );
}

export default App;
