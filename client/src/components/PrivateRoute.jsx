import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const PrivateRoute = () => {
    const user = useAuthStore((state) => state.user);
    return user ? <Outlet /> : <Navigate to="/login" />;
}
export default PrivateRoute;
