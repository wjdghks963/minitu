import express from "express";
import { see, edit } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/upload", upload);
videoRouter.get("/:id(\\d+)", see); // :~ >> 변수 들어간다고 express한테 말해줌, //d이 아이디를 숫자만 받게 함
videoRouter.get("/:id(\\d+)/edit", edit);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);

export default videoRouter;
