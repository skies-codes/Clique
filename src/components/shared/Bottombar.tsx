import { Link, useLocation } from "react-router-dom";
import { bottombarLinks } from "../../constants/constants";

const Bottombar = () => {
    const { pathname } = useLocation();

    return (
        <section className='bottom-bar'>
            {bottombarLinks.map((link) => {
                const isActive = pathname === link.route;
                return (
                    <Link
                        key={`bottombar-${link.label}`}
                        to={link.route}
                        className={`${
                            isActive && "rounded-[10px] bg-primary-500 "
                        } flex-center flex-col gap-1 p-2 transition`}
                    >
                        <img
                            src={link.imgURL}
                            alt={link.label}
                            width={16}
                            height={16}
                            className={`${isActive && "invert-white"}`}
                        />

                        <p
                            className={`${
                                isActive
                                    ? "text-white"
                                    : "text-light-foreground dark:text-dark-foreground"
                            } text-sm`}
                        >
                            {link.label}
                        </p>
                    </Link>
                );
            })}
        </section>
    );
};

export default Bottombar;
