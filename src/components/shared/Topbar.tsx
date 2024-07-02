import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "../ui/button";
import { useUserContext } from "../../context";
import { useSignOutAccount } from "../../lib/react-query/queries";
import ThemeToggle from "./ThemeToggle";

const Topbar = () => {
    const navigate = useNavigate();
    const { user } = useUserContext();
    const { mutate: signOut, isSuccess } = useSignOutAccount();
    const { setIsAuthenticated } = useUserContext();

    useEffect(() => {
        if (isSuccess) {
            setIsAuthenticated(false);
            return navigate("/sign-in");
        }
    }, [isSuccess, navigate, setIsAuthenticated]);

    return (
        <section className='topbar'>
            <div className='flex-between py-4 px-5'>
                <Link to='/' className='flex gap-3 items-center'>
                    <h4 className='h4 font-semibold'>Clique</h4>
                </Link>

                <div className='flex gap-4'>
                    <Button
                        variant='ghost'
                        className='shad-button_ghost'
                        onClick={() => signOut()}
                    >
                        <img src='/assets/icons/logout.svg' alt='logout' />
                    </Button>
                    <ThemeToggle className='hover:bg-primary-500' />
                    <Link
                        to={`/profile/${user.id}`}
                        className='flex-center gap-3'
                    >
                        <img
                            src={
                                user.imageUrl ||
                                "/assets/icons/profile-placeholder.svg"
                            }
                            alt='profile'
                            className='h-8 w-8 rounded-full'
                        />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Topbar;
