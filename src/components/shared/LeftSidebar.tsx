import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context";
import { useSignOutAccount } from "../../lib/react-query/queries";
import { INITIAL_USER, sidebarLinks } from "../../constants/constants";
import { INavLink } from "../../types";
import { Button } from "../ui/button";
import ThemeToggle from "./ThemeToggle";
import { BiLogOut } from "react-icons/bi";
import { useCallback } from "react";
import { RxCross2 } from "react-icons/rx";
import Loading from "../loaders/Loading";
import { cn } from "../../lib/utils";

interface LeftSidebarProps {
    isMobile?: boolean;
    setIsMobile?: React.Dispatch<React.SetStateAction<boolean>>;
    className?: string;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({
    isMobile,
    setIsMobile,
    className,
}) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { user, setUser, setIsAuthenticated, isLoading } = useUserContext();

    const { mutate: signOut, isPending: isSignOutUser } = useSignOutAccount();

    const handleSignOut = useCallback(() => {
        signOut(undefined, {
            onSuccess: () => {
                console.log("here");
                setIsAuthenticated(false);
                setUser(INITIAL_USER);
                navigate("/sign-in");
            },
        });
    }, [navigate, setIsAuthenticated, setUser, signOut]);

    return (
        <nav
            className={cn(
                "w-[270px] h-full flex flex-col justify-between border-r border-zinc-300 dark:border-zinc-900 bg-background dark:bg-dark-2",
                className
            )}
        >
            <div className='flex flex-col'>
                <div className='px-5 py-4 lg:hidden'>
                    {isMobile && (
                        <Button
                            size={"sm"}
                            variant={"ghost"}
                            className='hover:bg-blue-100 dark:hover:bg-zinc-800 cursor-pointer p-2'
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsMobile && setIsMobile(false);
                            }}
                        >
                            <RxCross2
                                size={20}
                                className='text-foreground dark:text-dark-foreground'
                            />
                        </Button>
                    )}
                </div>
                <div className='flex items-center justify-between pb-4 px-5 lg:pt-4 border-b border-zinc-300 dark:border-zinc-900'>
                    <Link
                        to='/'
                        className='flex gap-3 items-center justify-between'
                    >
                        <h1 className='text-xl font-bold text-foreground dark:text-dark-foreground'>
                            Clique
                        </h1>
                    </Link>
                    {isLoading || !user.email ? (
                        <div className='h-10'>
                            <div className='w-10 h-10 bg-gray-200 animate-pulse rounded-full' />
                        </div>
                    ) : (
                        <Link
                            to={`/profile/${user.id}`}
                            className='flex gap-3 items-center'
                        >
                            <img
                                src={
                                    user.imageUrl ||
                                    "/assets/icons/profile-placeholder.svg"
                                }
                                alt='profile'
                                className='h-10 w-10 rounded-full'
                            />
                        </Link>
                    )}
                </div>

                <ul className='flex flex-col gap-2 p-4'>
                    {sidebarLinks.map((link: INavLink) => {
                        const isActive = pathname === link.route;

                        return (
                            <li
                                key={link.label}
                                className={`group text-foreground dark:text-dark-foreground rounded-md hover:bg-blue-500 hover:text-white ${
                                    isActive && "bg-primary text-white"
                                }`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsMobile && setIsMobile(false);
                                }}
                            >
                                <NavLink
                                    to={link.route}
                                    className={`flex gap-2 items-center py-2 px-3`}
                                >
                                    <link.icon size={20} />
                                    <span className={`text-base font-semibold`}>
                                        {link.label}
                                    </span>
                                </NavLink>
                            </li>
                        );
                    })}
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsMobile && setIsMobile(false);
                        }}
                        className='w-full'
                    >
                        <ThemeToggle
                            className='w-full flex items-center justify-start py-2 px-3 gap-2 text-base text-foreground dark:text-dark-foreground hover:bg-blue-500 hover:text-white group'
                            text='Theme'
                        />
                    </div>
                </ul>
            </div>
            <Button
                type='submit'
                className={cn(
                    "text-white bg-red-500 hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-60 mx-5 my-10"
                )}
                disabled={isSignOutUser}
                onClick={() => handleSignOut()}
            >
                {isSignOutUser ? (
                    <div className='flex-center gap-2'>
                        <Loading text='Loading...' />
                    </div>
                ) : (
                    "Logout"
                )}
            </Button>
        </nav>
    );
};

export default LeftSidebar;
