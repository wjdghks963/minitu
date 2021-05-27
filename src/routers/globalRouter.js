import express from "express";

const globalRouter = express.Router();
const handleHome = (req, res) => res.send("Home");

globalRouter.get("/", handleHome);

export default globalRouter; // js파일 자체가 아니라 이 변수를 export
