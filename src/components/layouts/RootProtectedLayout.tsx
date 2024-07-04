import React, { useEffect } from "react";
import { useUserContext } from "../../context";
import { useNavigate } from "react-router-dom";

interface ProtectedLayoutProps {
    children: React.ReactNode;
}

const RootProtectedLayout: React.FC<ProtectedLayoutProps> = ({ children }) => {
    const { isAuthenticated } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/sign-in");
        }
    }, [navigate, isAuthenticated]);

    return children;
};

export default RootProtectedLayout;
