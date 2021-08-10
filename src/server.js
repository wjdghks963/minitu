import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import { localMiddleware } from "./middlewares";
import flash from "express-flash";
import apiRouter from "./routers/apiRouter";

const app = express();
const logger = morgan("dev"); // logger(morgan("dev"))은 middleware(res,req,next를 가진 function)을 return해줌
app.set("view engine", "pug"); // view engine 템플릿을 pug로 설정
app.set("views", process.cwd() + "/src/views"); // views파일이 scr안에 있게 만들었음
app.use(logger);
app.use(express.urlencoded({ extended: true })); // express가 form의 값들을 이해할 수 있게하고 js형식으로 변환

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    // session이 처음 만들어졌을 때 session을 수정하지 않는다면 session은 unintialzied 상태
    // true === 수정하지 않더라도 저장된다 ,false === 만약 수정시 session은 저장된다.
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
    }),
  })
);
app.use(flash());
app.use(localMiddleware);
app.use("/uploads", express.static("uploads")); // expose folder >>  사진을 노출시켜준다
app.use("/static", express.static("assets"));
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);
app.use("api", apiRouter);
app.use((req, res, next) => {
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  next();
});

export default app;
