import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { RiMoonClearLine } from "react-icons/ri";
import { MdOutlineWbSunny } from "react-icons/md";

interface ThemeToggleProps {
    className?: string;
    text?: string;
}

const ThemeToggle = ({ className, text }: ThemeToggleProps) => {
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
            variant={"ghost"}
            className={cn("", className)}
        >
            {theme === "light" ? (
                <MdOutlineWbSunny
                    size={20}
                    className='text-foreground dark:text-dark-foreground group-hover:text-white'
                />
            ) : (
                <RiMoonClearLine
                    size={20}
                    className='text-foreground dark:text-dark-foreground group-hover:text-white'
                />
            )}
            {text}
        </Button>
    );
};

export default ThemeToggle;
