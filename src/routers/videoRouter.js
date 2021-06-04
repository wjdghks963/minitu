import express from "express";
import { getEdit, watch, postEdit } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", watch); // :~ >> 변수 들어간다고 express한테 말해줌, //d이 아이디를 숫자만 받게 함
videoRouter.route("/:id(\\d+)").get(getEdit).post(postEdit);

export default videoRouter;
