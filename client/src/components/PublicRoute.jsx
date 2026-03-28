import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const PublicRoute = () => {
    const user = useAuthStore((state) => state.user);
    return !user ? <Outlet /> : <Navigate to="/" />;
}
export default PublicRoute;
