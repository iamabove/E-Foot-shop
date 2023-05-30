import React, {lazy} from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Roots from "../components/Roots"
import Spinner from "../utils/Spinner";
import Account from "../pages/Account";
import SearchResult from "../pages/SearchResult";
import CheckOut from "../pages/CheckOut";
import PrivateRoutes from "./PrivateRoutes";
import CheckOutDetails from "../pages/CheckOutDetails";
import Customer from "../pages/Customer";
import Order from "../pages/Order";
import OrderDetail from "../pages/OrderDetail";
const Products = lazy(() => import("../pages/Products"))
const Home = lazy(() => import('../pages/Home'))
const ProductDetails = lazy(() => import('../pages/ProductDetails'))



const routes = [
  {
    path: "/",
    element: <Roots/>,
    children: [
      {
        path: '/',
        element: (
          <React.Suspense fallback={<Spinner/>}>
            <Home/>
          </React.Suspense>
        )
      },
      {
        path: 'product/category/:name',
        element: (
          <React.Suspense fallback={<Spinner/>}>
            <Products/>
          </React.Suspense>
        )
      },
      {
        path: 'product/:slug',
        element: (
          <React.Suspense fallback={<Spinner/>}>
            <ProductDetails/>
          </React.Suspense>
        )
      },
      {
        path: 'account',
        element: <Account/>
      },
      {
        path: 'search',
        element: (
          <React.Suspense fallback={<Spinner/>}>
            <SearchResult/>
          </React.Suspense>
        )
      },
      {
        path: 'checkout',
        element: (
          <PrivateRoutes>
            <CheckOut/>
          </PrivateRoutes>
        ),
        children: [
          {
            path: 'checkoutdetails',
            element: (
              <PrivateRoutes>
                <CheckOutDetails/>
              </PrivateRoutes>
            ),
          }
        ]
      },
      {
        path: 'customer',
        element: (
          <PrivateRoutes>
            <Customer />
          </PrivateRoutes>
        ),
        children: [
          {
            path: 'orders',
            element: (
              <React.Suspense fallback={<Spinner />}>
                <PrivateRoutes>
                  <Order />
                </PrivateRoutes>
              </React.Suspense>
            ),
            children: [
              {
                path: ':id',
                element: (
                  <React.Suspense fallback={<Spinner />}>
                    <PrivateRoutes>
                      <OrderDetail />
                    </PrivateRoutes>
                  </React.Suspense>
                ),
              },
            ],
          },
        ]
      } 
    ]
  },
];

export default function Routespath() {
  const router = createBrowserRouter(routes);
  return <RouterProvider router = {router} />;
}
