import { loadShopItems } from "./loaders/loadShopItems";
import { loadProductPage } from "./loaders/loadProductPage";
import { createBrowserRouter } from "react-router-dom";
import NotFoundErrorPage from "./pages/Errors/NotFoundErrorPage";
import RouteErrorPage from "./pages/Errors/RouteErrorPage";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ShopCategoryWrapper from "./components/ShopCategoryWrapper";
import ProductPage from "./pages/ProductPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        errorElement: <RouteErrorPage />,
        children: [
          { index: true, element: <Home /> },
          {
            path: "shop",
            children: [
              { index: true, element: <Shop /> },
              {
                path: ":category",
                element: <ShopCategoryWrapper />,
                loader: loadShopItems
              },
              {
                path: ":category/:productId",
                element: <ProductPage />,
                loader: loadProductPage
              }
            ]
          },
          {
            path: "About",
            element: <h1 className="text-black">About Us</h1>
          },

          { path: "*", element: <NotFoundErrorPage /> }
        ]
      }
    ],
    HydrateFallback: () => {}
  }
]);
