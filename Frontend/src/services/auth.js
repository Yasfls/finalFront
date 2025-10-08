export const IS_AUTHENTICATED = "isAuth";

export const isAuthenticated = () => localStorage.getItem(IS_AUTHENTICATED) === 'true';

export const login = () => {
 localStorage.setItem(IS_AUTHENTICATED, 'true');
}

export const logout = () => {
 localStorage.removeItem(IS_AUTHENTICATED);
}