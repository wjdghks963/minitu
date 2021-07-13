import multer from "multer";

export const localMiddleware = (req, res, next) => {
  res.session.loggedIn = Boolean(req.session.loggedIn); // login TURE or FALSE
  req.locals.siteName = "Wetube"; // siteName
  res.locals.loggedInUser = req.session.user || {}; // pug에서 #{loggedInUser}만 써도 req.session.user을 사용 가능함
  next();
};

// user가 loggedIn됐다면 요청을 계속하게하고 아니면 로그인 페이지로 보냄
export const protectedMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    return res.redirect("/login");
  }
};

// user가 loggedIn됐다면 요청을 계속하게하고 아니면 home으로 보냄
export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};

// form에서 보낸 파일에 관한 정보를 uploads라는 dir에 보내주고 파일명을 랜덤으로 생성해준다.
export const avatarUpload = multer({
  dest: "uploads/avater/",
  limits: {
    fileSize: 3000000,
  },
});
export const videoUpload = multer({
  dest: "uploads/vidoes/",
  limits: {
    fileSize: 10000000,
  },
});
