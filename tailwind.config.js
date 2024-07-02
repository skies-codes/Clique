/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                "primary-500": "#877EFF",
                "primary-600": "#5D5FEF",
                "secondary-500": "#FFB620",
                "off-white": "#D0DFFF",
                red: "#FF5A5A",
                "dark-1": "#000000",
                "dark-2": "#09090A",
                "dark-3": "#121316",
                "dark-4": "#1F1F22",
                "light-1": "#FFFFFF",
                "light-2": "#EFEFEF",
                "light-3": "#7878A3",
                "light-4": "#5C5C7B",
                light: {
                    border: "",
                    input: "",
                    ring: "",
                    background: "#FFFFFF",
                    foreground: "#030712",
                    primary: {
                        DEFAULT: "#5D5FEF",
                        foreground: "#FFFFFF",
                    },
                    secondary: {
                        DEFAULT: "#877EFF",
                        foreground: "#FFFFFF",
                    },
                    destructive: {
                        DEFAULT: "#FF5A5A",
                        foreground: "#FFFFFF",
                    },
                },
                dark: {
                    border: "",
                    input: "",
                    ring: "",
                    background: "#121316",
                    foreground: "#EDEEF0",
                    primary: {
                        DEFAULT: "#5D5FEF",
                        foreground: "#FFFFFF",
                    },
                    secondary: {
                        DEFAULT: "#877EFF",
                        foreground: "#FFFFFF",
                    },
                    destructive: {
                        DEFAULT: "#FF5A5A",
                        foreground: "#FFFFFF",
                    },
                    muted: {
                        DEFAULT: "",
                        foreground: "",
                    },
                    accent: {
                        DEFAULT: "",
                        foreground: "",
                    },
                    popover: {
                        DEFAULT: "",
                        foreground: "",
                    },
                    card: {
                        DEFAULT: "",
                        foreground: "",
                    },
                },
            },
            screens: {
                xs: "480px",
            },
            width: {
                420: "420px",
                465: "465px",
            },
            fontFamily: {
                inter: ["Inter", "sans-serif"],
                bricolage: ['"Bricolage Grotesque"', "sans-serif"],
            },
            keyframes: {
                "accordion-down": {
                    from: { height: 0 },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: 0 },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
