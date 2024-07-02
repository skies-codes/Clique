import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context";
import { useSignOutAccount } from "../../lib/react-query/queries";
import { INITIAL_USER, sidebarLinks } from "../../constants/constants";
import Loader from "./Loader";
import { INavLink } from "../../types";
import { Button } from "../ui/button";
import ThemeToggle from "./ThemeToggle";

const LeftSidebar = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { user, setUser, setIsAuthenticated, isLoading } = useUserContext();

    const { mutate: signOut } = useSignOutAccount();

    const handleSignOut = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        signOut();
        setIsAuthenticated(false);
        setUser(INITIAL_USER);
        navigate("/sign-in");
    };

    return (
        <nav className='leftsidebar'>
            <div className='flex flex-col gap-8'>
                <Link to='/' className='flex gap-3 items-center'>
                    <h3 className='h3'>Clique</h3>
                </Link>

                {isLoading || !user.email ? (
                    <div className='h-14'>
                        <Loader />
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
                            className='h-14 w-14 rounded-full'
                        />
                        <div className='flex flex-col'>
                            <p className='body-bold'>{user.name}</p>
                            <p className='small-regular text-light-3'>
                                @{user.username}
                            </p>
                        </div>
                    </Link>
                )}

                <ul className='flex flex-col gap-2'>
                    {sidebarLinks.map((link: INavLink) => {
                        const isActive = pathname === link.route;

                        return (
                            <li
                                key={link.label}
                                className={`leftsidebar-link group ${
                                    isActive && "bg-primary-500"
                                }`}
                            >
                                <NavLink
                                    to={link.route}
                                    className='flex gap-4 items-center p-4'
                                >
                                    <img
                                        src={link.imgURL}
                                        alt={link.label}
                                        className={`group-hover:invert-white ${
                                            isActive && "invert-white"
                                        }`}
                                    />
                                    {link.label}
                                </NavLink>
                            </li>
                        );
                    })}
                    <ThemeToggle
                        className='text-light-foreground dark:text-dark-foreground flex items-center justify-start gap-4 text-base hover:bg-primary-500 hover:text-dark-foreground'
                        text='Theme'
                    />
                </ul>
            </div>
            <Button
                variant='ghost'
                className='shad-button_ghost'
                onClick={(e) => handleSignOut(e)}
            >
                <img src='/assets/icons/logout.svg' alt='logout' />
                <p className='small-medium lg:base-medium'>Logout</p>
            </Button>
        </nav>
    );
};

export default LeftSidebar;
