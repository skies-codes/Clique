import { Outlet, useNavigate } from "react-router-dom";
import InteractiveSpheres from "../components/spline3d/InteractiveSpheres";
import ThemeToggle from "../components/shared/ThemeToggle";
import AuthProtectedLayout from "../components/layouts/AuthProtectedLayout";

export default function AuthLayout() {
    return (
        <AuthProtectedLayout>
            <section className='flex flex-1 justify-center items-center flex-col relative h-screen'>
                <div className='absolute top-4 left-4'>
                    <ThemeToggle className='hover:bg-primary-500' />
                </div>
                <Outlet />
            </section>

            <section className='hidden lg:block h-screen w-1/2'>
                <InteractiveSpheres />
            </section>
        </AuthProtectedLayout>
    );
}
