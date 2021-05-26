import express from "express";
import morgan from "morgan";
const PORT = 4000;

const app = express();
const logger = morgan("dev"); // logger(morgan("dev"))은 middleware(res,req,next를 가진 function)을 return해줌

const home = (req, res) => {
  return res.send("hello");
};
const login = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

app.use(logger("dev"));
app.get("/", home);
app.get("/login", login);
const handelListening = () =>
  console.log(`Server listening on http://loaclhost:${PORT}`);

app.listen(PORT, handelListening); // listen에는 callback있음
