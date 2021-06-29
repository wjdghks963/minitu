import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import { localMiddleware } from "./middlewares";

const app = express();
const logger = morgan("dev"); // logger(morgan("dev"))은 middleware(res,req,next를 가진 function)을 return해줌
app.set("view engine", "pug"); // view engine 템플릿을 pug로 설정
app.set("views", process.cwd() + "/src/views"); // views파일이 scr안에 있게 만들었음
app.use(logger);
app.use(express.urlencoded({ extended: true })); // express가 form의 값들을 이해할 수 있게하고 js형식으로 변환

app.use(
  session({
    secret: "",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/wetube_ver2",
    }),
  })
);

app.use(localMiddleware);
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;
