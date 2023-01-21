import { Navigate } from "react-router-dom";

import { route, SessionContext } from "../App";

export function RequireAuth({ children }: { children: JSX.Element }) {
  return (
    <SessionContext.Consumer>
      {(session) => {
        if (session == null) {
          return <Navigate to={route("/login")} replace />;
        }
        if (session === "loading") {
            return null;
        }
        return children;
      }}
    </SessionContext.Consumer>
  );
}
