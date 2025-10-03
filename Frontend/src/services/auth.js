export const IS_AUTHENTICATED = "isAuth";

// A autenticação é verificada pelo backend (via cookie). 
// No frontend, usamos um marcador simples.
export const isAuthenticated = () => localStorage.getItem(IS_AUTHENTICATED) === 'true';

// ⚠️ getToken foi REMOVIDO.

// Marca o estado de autenticação no frontend
export const login = () => {
 localStorage.setItem(IS_AUTHENTICATED, 'true');
}

export const logout = () => {
 // Iremos chamar o endpoint /logout para limpar o cookie HttpOnly no backend
 localStorage.removeItem(IS_AUTHENTICATED);
}