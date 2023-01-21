import { Login } from "./Auth/Login";
import { RequireAuth } from "./Auth/RequireAuth";
import "./App.css";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Dashboard } from "./Dashboard/Dashboard";
import { Play } from "./Play/Play";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to={"/dashboard"} />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: (
        <RequireAuth>
          <Dashboard />
        </RequireAuth>
      ),
    },
    {
      path: "/play",
      element: <Play endTimestamp={Date.now() + 60000} gameId="34" />,
    },
  ]);

  return (
    <div className="min-h-screen">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
