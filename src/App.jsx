import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Auth from "./Auth";
import Setup from "./pages/Setup";
import AdminPanel from "./pages/AdminPanel";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Dashboard />} />
      <Route path="auth" element={<Auth />} />
      <Route path="setup" element={<Setup />} />
      <Route path="admin" element={<AdminPanel />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
