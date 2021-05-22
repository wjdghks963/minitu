import express from "express";
const PORT = 4000;

const app = express();

// req,res는 express에서 나온것
const handleHome = (req, res) => {
  return res.end(); // res.end(); = res를 종료 시킴 res.send("~~"); = ()안에 있는 것을 보냄
};
const handleLogin = (req, res) => {
  return res.send("login");
};
app.get("/", handleHome);
app.get("/login", handleLogin);

const handelListening = () =>
  console.log(`Server listening on http://loaclhost:${PORT}`);

app.listen(PORT, handelListening); // listen에는 callback있음
