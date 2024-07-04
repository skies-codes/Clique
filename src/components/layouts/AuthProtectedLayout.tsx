import React, { useEffect } from "react";
import { useUserContext } from "../../context";
import { useNavigate } from "react-router-dom";

interface ProtectedLayoutProps {
    children: React.ReactNode;
}

const AuthProtectedLayout: React.FC<ProtectedLayoutProps> = ({ children }) => {
    const { isAuthenticated } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [navigate, isAuthenticated]);

    return children;
};

export default AuthProtectedLayout;
