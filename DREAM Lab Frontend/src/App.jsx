import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import "./App.css";
import Root from "./Global/Root.jsx";
import LandingPage from "./LandingPage/LandingPage.jsx";
import LoginPage from "./Login/LoginPage";
import NotFound from "./Global/NotFound.jsx";
import HomePage from "./Home/HomePage.jsx";

import { requireAuth, loginAction } from "./Global/Auth";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<LandingPage />} />
      <Route path="login" element={<LoginPage />} action={loginAction} />
      <Route
        path="home"
        element={<HomePage />}
        loader={async () => await requireAuth()}
      />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
