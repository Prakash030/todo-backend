import pkg from 'jsonwebtoken';
const { verify } = pkg;

// Middleware function to check if the user is logged in
const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No Token Provided!' });
  }

  try {
    const decoded = verify(token, process.env.JSON_WEB_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid Token' });
  }
};

export default authMiddleware;
