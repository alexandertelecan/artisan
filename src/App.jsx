import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Auth from "./Auth";
import RootLayout from "./components/layout/RootLayout";
import Dashboard from "./pages/Dashboard";
import Setup from "./pages/Setup";
import AdminPanel from "./pages/AdminPanel";
import Stock from "./pages/Stock";
import Invoices from "./pages/Invoices";
import NotFound from "./pages/NotFound";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="auth" element={<Auth />} />
      <Route path="setup" element={<Setup />} />
      <Route path="admin" element={<AdminPanel />} />
      <Route path="stock" element={<Stock />} />
      <Route path="invoices" element={<Invoices />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
