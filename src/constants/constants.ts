import { MdHome, MdPeopleAlt } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { FaBookBookmark } from "react-icons/fa6";
import { IoCreateSharp, IoSearch } from "react-icons/io5";
import { INavLink } from "../types";

export const INITIAL_USER = {
    id: "",
    name: "",
    username: "",
    email: "",
    imageUrl: "",
    bio: "",
};

export const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    setIsLoading: () => {},
    isAuthenticated: false,
    setUser: () => {},
    setIsAuthenticated: () => {},
    checkAuthUser: async () => false as boolean,
};

export const bottombarLinks = [
    {
        imgURL: "/assets/icons/home.svg",
        route: "/",
        label: "Home",
    },
    {
        imgURL: "/assets/icons/wallpaper.svg",
        route: "/explore",
        label: "Explore",
    },
    {
        imgURL: "/assets/icons/bookmark.svg",
        route: "/saved",
        label: "Saved",
    },
    {
        imgURL: "/assets/icons/gallery-add.svg",
        route: "/create-post",
        label: "Create",
    },
];

export const sidebarLinks = [
    {
        icon: MdHome,
        route: "/",
        label: "Home",
    },
    {
        icon: IoSearch,
        route: "/explore",
        label: "Explore",
    },
    {
        icon: MdPeopleAlt,
        route: "/all-users",
        label: "People",
    },
    {
        icon: FaBookBookmark,
        route: "/saved",
        label: "Saved",
    },
    {
        icon: IoCreateSharp,
        route: "/create-post",
        label: "Create Post",
    },
];
