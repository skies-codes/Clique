import { Outlet, useNavigate } from "react-router-dom";
import InteractiveSpheres from "../components/spline3d/InteractiveSpheres";
import ThemeToggle from "../components/shared/ThemeToggle";
import { useUserContext } from "../context";
import { useEffect } from "react";

export default function AuthLayout() {
    const { isAuthenticated } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            return navigate("/");
        }
    }, [navigate, isAuthenticated]);

    return (
        <>
            <section className='flex flex-1 justify-center items-center flex-col relative h-screen'>
                <div className='absolute top-4 left-4'>
                    <ThemeToggle />
                </div>
                <Outlet />
            </section>

            <section className='hidden lg:block h-screen w-1/2'>
                <InteractiveSpheres />
            </section>
        </>
    );
}
