import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthWrapper";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated,checkAuth } = useAuth();

    // checkAuth()

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

  return children;
};

export default ProtectedRoute;