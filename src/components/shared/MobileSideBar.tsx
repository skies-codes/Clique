import { useEffect, useState } from "react";
import { Button } from "../ui";
import { IoMenu } from "react-icons/io5";
import LeftSidebar from "./LeftSidebar";

const MobileSidebar = () => {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        window.addEventListener("resize", () => {
            setIsMobile(false);
        });

        return window.removeEventListener("resize", () => {
            setIsMobile(false);
        });
    }, []);

    return (
        <section className='w-full fixed top-0 bg-background dark:bg-dark-2 z-30 border-b border-zinc-300 dark:border-zinc-900 lg:hidden'>
            <nav className='w-full justify-start lg:hidden py-4 px-5'>
                <Button
                    size={"sm"}
                    variant={"ghost"}
                    className='hover:bg-blue-100 dark:hover:bg-zinc-800 cursor-pointer p-2'
                    onClick={() => setIsMobile(true)}
                >
                    <IoMenu
                        size={20}
                        className='text-foreground dark:text-dark-foreground'
                    />
                </Button>
            </nav>
            <div
                className={`w-full h-screen absolute top-0 left-0 transform transition-all duration-150 ease-in-out ${
                    isMobile ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <LeftSidebar isMobile setIsMobile={setIsMobile} />
            </div>
        </section>
    );
};

export default MobileSidebar;
