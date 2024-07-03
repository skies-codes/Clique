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
                background: "#f8fafc",
                foreground: "#020617",
                primary: {
                    DEFAULT: "#2970ff",
                    foreground: "#FFFFFF",
                },
                secondary: {
                    DEFAULT: "#f1f1f1",
                    foreground: "#020617",
                },
                destructive: {
                    DEFAULT: "#FF5A5A",
                    foreground: "#FFFFFF",
                },
                "gray-1": "#b0b0b0",
                "gray-2": "#59595b",
                "dark-2": "#09090b",
                "dark-3": "#18181b",
                dark: {
                    background: "#050505",
                    foreground: "#EDEEF0",
                    primary: {
                        DEFAULT: "#2970ff",
                        foreground: "#FFFFFF",
                    },
                    secondary: {
                        DEFAULT: "#404040",
                        foreground: "#EDEEF0",
                    },
                    destructive: {
                        DEFAULT: "#FF5A5A",
                        foreground: "#FFFFFF",
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
                sys: [
                    "system-ui",
                    "-apple-system",
                    "BlinkMacSystemFont",
                    '"Segoe UI"',
                    "Roboto, Oxygen",
                    "Ubuntu",
                    "Cantarell",
                    '"Open Sans"',
                    '"Helvetica Neue"',
                    "sans-serif",
                ],
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
