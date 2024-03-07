import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Auth from "./Auth";
import RootLayout from "./components/layout/RootLayout";
import Setup from "./pages/Setup";
import AdminPanel from "./pages/AdminPanel";
import Stock from "./pages/Stock";
import Invoices from "./pages/Invoices";
import NotFound from "./pages/NotFound";
import { Protected } from "./components/protected/Protected";
import { AuthContext } from "./components/context/AuthContext";
import LandingPage from "./pages/LandingPage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<LandingPage />} />
        <Route path="auth" element={<Auth />} />
        <Route path="setup" element={<Setup />} />
        <Route
          path="admin"
          element={
            <Protected>
              <AdminPanel />
            </Protected>
          }
        />
        <Route
          path="stock"
          element={
            <Protected>
              <Stock />
            </Protected>
          }
        />
        <Route
          path="invoices"
          element={
            <Protected>
              <Invoices />
            </Protected>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <AuthContext>
      <RouterProvider router={router}></RouterProvider>
    </AuthContext>
  );
}

export default App;
