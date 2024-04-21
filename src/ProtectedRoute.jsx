import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
    // Assuming isAuthenticated is determined by the presence of a specific token in localStorage
    const isAuthenticated = localStorage.getItem('accessToken'); // or any other logic to determine auth status

    if (!isAuthenticated) {
        // Redirect them to the /login page, but save the current location they were trying to go to
        return <Navigate to="/login" replace />;
    }

    return children; // If authenticated, render the children components which is the actual "protected" component
};
