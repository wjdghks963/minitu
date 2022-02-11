import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

const isHeroku = process.env.NODE_ENV === "production";

const s3ImageUploader = multerS3({
  s3: s3,
  bucket: "minitu/images",
  acl: "public-read",
});

const s3VideoUploader = multerS3({
  s3: s3,
  bucket: "minitu/videos",
  acl: "public-read",
});

// local은 template에서 사용가능
export const localMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn); // login TURE or FALSE
  res.locals.siteName = "Wetube"; // siteName
  res.locals.loggedInUser = req.session.user || {}; // pug에서 #{loggedInUser}만 써도 req.session.user을 사용 가능함
  res.locals.isHeroku = isHeroku;
  next();
};

// user가 loggedIn됐다면 요청을 계속하게하고 아니면 로그인 페이지로 보냄
export const protectedMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    req.flash("error", "Not authorized");
    return res.redirect("/login");
  }
};

// user가 loggedIn됐다면 요청을 계속하게하고 아니면 home으로 보냄
export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Not authorized");
    return res.redirect("/");
  }
};

// form에서 보낸 파일에 관한 정보를 uploads라는 dir에 보내주고 파일명을 랜덤으로 생성해준다.
export const avatarUpload = multer({
  dest: "uploads/avater/",
  limits: {
    fileSize: 3000000,
  },
  storage: isHeroku ? s3ImageUploader : undefined,
});
export const videoUpload = multer({
  dest: "uploads/videos/",
  limits: {
    fileSize: 10000000,
  },
  storage: isHeroku ? s3VideoUploader : undefined,
});
