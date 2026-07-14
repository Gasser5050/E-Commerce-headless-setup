import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import NotFoundErrorPage from "./pages/Errors/NotFoundErrorPage";
import RouteErrorPage from "./pages/Errors/RouteErrorPage";
import Shop from "./pages/Shop";
import ShopCategory from "./pages/ShopCategory";

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
              { path: ":category", element: <ShopCategory /> }
            ]
          },

          { path: "*", element: <NotFoundErrorPage /> }
        ]
      }
    ],
    HydrateFallback: () => {}
  }
]);
