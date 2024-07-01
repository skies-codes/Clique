import { useState, useEffect } from "react";
import { Button } from "../ui/button";

const ThemeToggle = () => {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    );

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <Button
            onClick={toggleTheme}
            variant={"outline"}
            className='text-light-foreground dark:text-dark-foreground rounded-full border-none'
        >
            <img
                src={
                    theme === "light"
                        ? "/assets/icons/sun.svg"
                        : "/assets/icons/moon.svg"
                }
                alt='dark-light-mode'
                className='w-6 h-6'
            />
        </Button>
    );
};

export default ThemeToggle;
