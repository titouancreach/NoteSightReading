import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/utils";
import { Navigate } from "react-router-dom";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return null;
  }

  if (!user || error) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
