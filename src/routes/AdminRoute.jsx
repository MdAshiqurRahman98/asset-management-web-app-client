import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import PropTypes from 'prop-types';
import Skeleton from "react-loading-skeleton";

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <span className="text-center">
            <Skeleton count={30} />
        </span>;
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>;

};

export default AdminRoute;

AdminRoute.propTypes = {
    children: PropTypes.node
}