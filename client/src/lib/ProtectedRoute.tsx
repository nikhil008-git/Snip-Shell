import { Navigate } from "react-router-dom";


interface children {
    children : React.ReactNode
}
export default function ProtectedRoute({ children } : children) {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/" />;
}
