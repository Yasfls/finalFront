import jwt from 'jsonwebtoken';
 
export const authenticateToken = (req, res, next) => {
    let token = req.cookies.jwt;
 
    if (!token) {
        const authHeader = req.headers['authorization'];
        const headerToken = authHeader && authHeader.split(' ')[1];
        token = headerToken;
    }
 
    if (!token) return res.sendStatus(401);
 
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};