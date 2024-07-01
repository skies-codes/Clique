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
