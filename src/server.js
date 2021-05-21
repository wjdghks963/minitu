import express from "express";
const PORT = 4000;
const app = express();

const handelListening = () =>
  console.log(`Server listening on http://loaclhost:${PORT}`);

app.listen(PORT, handelListening); // listen에는 callback있음
