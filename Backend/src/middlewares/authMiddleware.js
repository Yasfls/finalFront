import jwt from 'jsonwebtoken';
 
export const authenticateToken = (req, res, next) => {
    // 🔐 CRÍTICO: Tenta obter o token do HttpOnly Cookie
    let token = req.cookies.jwt;
 
    // Opcional: Para compatibilidade com ferramentas de teste ou se o frontend enviar no header (menos seguro)
    if (!token) {
        const authHeader = req.headers['authorization'];
        const headerToken = authHeader && authHeader.split(' ')[1];
        token = headerToken;
    }
 
    if (!token) return res.sendStatus(401);
 
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // Se o token for inválido (expirado, modificado), retorna 403 (Forbidden)
    if (err) return res.sendStatus(403);
    req.user = user; // Anexa os dados do usuário do JWT ao request
    next();
  });
};