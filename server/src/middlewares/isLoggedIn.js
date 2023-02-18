import jwt from 'jsonwebtoken';

export default function isLoggedIn(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const [tokenType, jwtToken] = token.split(' ');
    if (tokenType !== 'Bearer') {
      throw new Error();
      return;
    }

    const decoded = jwt.verify(jwtToken, process.env.SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};