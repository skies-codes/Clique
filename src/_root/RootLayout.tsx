import { Outlet } from "react-router-dom";
import LeftSidebar from "../components/shared/LeftSidebar";
import Bottombar from "../components/shared/Bottombar";

const RootLayout = () => {
    return (
        <div className='w-full md:flex'>
            <LeftSidebar />

            <section className='flex flex-1 h-full'>
                <Outlet />
            </section>
        </div>
    );
};

export default RootLayout;
