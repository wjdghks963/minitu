export const localMiddleware = (req, res, next) => {
  res.session.loggedIn = Boolean(req.session.loggedIn);
  req.locals.siteName = "Wetube"; // siteName
  res.locals.loggedInUser = req.session.user; // pug에서 #{loggedInUser}만 써도 req.session.user을 사용 가능함
  next();
};
