import express from "express";
import {
  getEdit,
  watch,
  postEdit,
  deleteVideo,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.route("/upload").get(getUpload).post(postUpload);
videoRouter.get("/:id([0-9a-f]{24})", watch); // :~ >> 변수 들어간다고 express한테 말해줌, //d이 아이디를 숫자만 받게 함
videoRouter.get("/:id([0-9a-f]{24})/delete").get(deleteVideo);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
export default videoRouter;

// [0-9a-f]{24}  > reqular Expression 0~9와 a~f가 있는 24자와 매치
