import { Login } from "./Auth/Login";
import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
  ]);

  return (
    <div className="h-full">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
