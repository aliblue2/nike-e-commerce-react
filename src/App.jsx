import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import { logout } from "./pages/Logout";
import { lazy, Suspense } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import LoadingPage from "./pages/LoadingPage";
import { checkAuthToken, getAccessToken } from "./utils/Auth";
import { Provider } from "react-redux";
import store from "./store/Main";
import Error from "./pages/Error";
export const baseurl = "https://corsproxy.io/?http://expertdevelopers.ir/api/v1";
export const client_secret = "kyj1c9sVcksqGU4scMX7nLDalkjp2WoqQEf8PKAC";
export const client_id = 2;

const Home = lazy(() => import("./pages/Home"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Products = lazy(() => import("./pages/Products"));
const Auth = lazy(() => import("./pages/Auth"));

const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    errorElement: <Error />,
    element: <Root />,
    loader: getAccessToken,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingPage />}>
            <Home />
          </Suspense>
        ),
        loader: () => import("./pages/Home").then((module) => module.loader()),
      },
      {
        path: "products",
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<LoadingPage />}>
                <Products />
              </Suspense>
            ),
            loader: (meta) =>
              import("./pages/Products").then((module) => module.loader(meta)),
          },
          {
            path: ":productId",
            element: (
              <Suspense fallback={<LoadingPage />}>
                <ProductDetail />
              </Suspense>
            ),

            loader: (meta) =>
              import("./pages/ProductDetail").then((module) =>
                module.commentsLoader(meta)
              ),
          },
        ],
      },
      {
        path: "auth",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <Auth />
          </Suspense>
        ),
        loader: getAccessToken,
        action: (meta) =>
          import("./pages/Auth").then((module) => module.action(meta)),
      },
      {
        path: "search",
        element: <Search />,
      },

      {
        path: "profile",
        loader: checkAuthToken,
        element: <Profile />,
      },
      {
        path: "cart",
        loader: checkAuthToken,
        element: <Cart />,
      },
      {
        path: "logout",
        id: "logout",
        loader: logout,
        action: logout,
      },
      {
        path: "support",
        element: <p>support</p>,
      },
    ],
  },
]);
function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
