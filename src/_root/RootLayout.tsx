import { Outlet } from "react-router-dom";
import LeftSidebar from "../components/shared/LeftSidebar";
import RootProtectedLayout from "../components/layouts/RootProtectedLayout";
import { MobileSideBar } from "../components/shared";

const RootLayout = () => {
    return (
        <RootProtectedLayout>
            <div className='w-full md:flex'>
                <LeftSidebar className='hidden lg:flex' />

                <section className='flex flex-1 h-full flex-col relative overflow-scroll'>
                    <MobileSideBar />
                    <Outlet />
                </section>
            </div>
        </RootProtectedLayout>
    );
};

export default RootLayout;
