import { Login } from "./Auth/Login";
import { RequireAuth } from "./Auth/RequireAuth";
import "./App.css";
import { supabase } from "./supabase/utils";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Dashboard } from "./Dashboard/Dashboard";
import { Play } from "./Play/Play";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import React from "react";

export const SessionContext = React.createContext<Session | null | "loading">(
  "loading"
);

export function route(path: string) {
  if ((window.location as any).hostname === "titouancreach.github.io") {
    return `/NoteSightReading${path}`;
  }
  return path;
}

function App() {
  const router = createBrowserRouter([
    {
      path: route("/"),
      element: <Navigate to={route("/dashboard")} />,
    },
    {
      path: route("/login"),
      element: <Login />,
    },
    {
      path: route("/dashboard"),
      element: (
        <RequireAuth>
          <Dashboard />
        </RequireAuth>
      ),
    },
    {
      path: route("/play/:gameSessionId"),
      element: <Play />,
    },
  ]);

  const [session, setSession] = useState<Session | null | "loading">("loading");

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    (async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        setSession(null);
      } else {
        setSession(data.session);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen">
      <SessionContext.Provider value={session}>
        <RouterProvider router={router} />
      </SessionContext.Provider>
    </div>
  );
}

export default App;
