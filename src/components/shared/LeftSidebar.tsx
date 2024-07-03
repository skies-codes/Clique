import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context";
import { useSignOutAccount } from "../../lib/react-query/queries";
import { INITIAL_USER, sidebarLinks } from "../../constants/constants";
import Loader from "./Loader";
import { INavLink } from "../../types";
import { Button } from "../ui/button";
import ThemeToggle from "./ThemeToggle";
import { BiLogOut } from "react-icons/bi";
import { useCallback, useEffect } from "react";

const LeftSidebar = () => {
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
        <aside className='hidden lg:flex w-[270px] flex-col justify-between border-r dark:border-none dark:bg-dark-2'>
            <div className='flex flex-col'>
                <div className='flex items-center justify-between p-4 border-b dark:border-none'>
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
                    <ThemeToggle
                        className='flex items-center justify-start py-2 px-3 gap-2 text-base text-foreground dark:text-dark-foreground hover:bg-blue-500 hover:text-white group'
                        text='Theme'
                    />
                </ul>
            </div>
            <Button
                variant='ghost'
                className='m-4 text-foreground dark:text-dark-foreground hover:bg-destructive flex justify-start items-center gap-2 hover:text-white disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-destructive'
                disabled={isSignOutUser}
                onClick={() => handleSignOut()}
            >
                {isSignOutUser ? (
                    <div className='flex-center gap-2'>
                        <Loader /> LogingOut...
                    </div>
                ) : (
                    <div className='flex gap-2 items-center'>
                        <BiLogOut size={20} />
                        <p className='text-base'>Logout</p>
                    </div>
                )}
            </Button>
        </aside>
    );
};

export default LeftSidebar;
