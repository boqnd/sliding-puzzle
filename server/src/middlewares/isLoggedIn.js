export default function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
};