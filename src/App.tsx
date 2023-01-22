import { Login } from "./Auth/Login";
import { RequireAuth } from "./Auth/RequireAuth";
import "./App.css";
import { supabase } from "./supabase/utils";

import {
  createHashRouter,
  Navigate,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import { Dashboard } from "./Dashboard/Dashboard";
import { Play } from "./Play/Play";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import React from "react";

export const SessionContext = React.createContext<Session | null | "loading">(
  "loading"
);


function getBaseName() {
  console.log(window.location.hostname);
  if ((window.location as any).hostname === "titouancreach.github.io") {
    console.log('BaseName returned3')
    return "/NoteSightReading";
  }
}

function LoggerWrapper({ children }: { children: JSX.Element }) {
  let location = useLocation();
  debugger
  console.log('LoggerWrapper')
  return children;
}

function App() {
  console.log('Load')
  const router = createHashRouter([
    {
      path: "/",
      element: <LoggerWrapper><Navigate to={"/dashboard"} /></LoggerWrapper>,
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
      path: "/play/:gameSessionId",
      element: <Play />,
    },
    {
      path: "*",
      element: <LoggerWrapper><div></div></LoggerWrapper>,
    }
  ], { basename: getBaseName() });

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
