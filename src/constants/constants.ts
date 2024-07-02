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
        imgURL: "/assets/icons/people.svg",
        route: "/all-users",
        label: "People",
    },
    {
        imgURL: "/assets/icons/bookmark.svg",
        route: "/saved",
        label: "Saved",
    },
    {
        imgURL: "/assets/icons/gallery-add.svg",
        route: "/create-post",
        label: "Create Post",
    },
];
