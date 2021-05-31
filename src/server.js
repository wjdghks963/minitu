import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
const PORT = 4000;

const app = express();
const logger = morgan("dev"); // logger(morgan("dev"))은 middleware(res,req,next를 가진 function)을 return해줌
app.set("view engine", "pug"); // view engine 템플릿을 pug로 설정
app.set("views", process.cwd() + "/src/views"); // views파일이 scr안에 있게 만들었음
app.use(logger);
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

const handleListening = () =>
  console.log(`Server listening on http://loaclhost:${PORT}`);

app.listen(PORT, handleListening); // listen에는 callback있음
