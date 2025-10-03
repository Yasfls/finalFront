import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // 🔐 CRÍTICO: Permite o envio do HttpOnly cookie
});

// ⚠️ Interceptor de token REMOVIDO (Não é mais necessário ler LocalStorage)

export default api;