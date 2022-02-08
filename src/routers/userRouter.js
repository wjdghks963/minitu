import express from "express";
import {
  getEdit,
  postEdit,
  logout,
  see,
  startGithubLogin,
  finishGithubLogin,
  getChangePassword,
  postChangePassword,
} from "../controllers/userController";
import {
  protectedMiddleware,
  publicOnlyMiddleware,
  avatarUpload,
} from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectedMiddleware, logout);
userRouter
  .route("/edit")
  .all(protectedMiddleware)
  .get(getEdit)
  .post(avatarUpload.single("avatar"), postEdit);
// all함수는 get,post 등 어떤 http method를 사용하든지 해당 middleware를 사용할 수 있게 해준다.
userRouter
  .route("/change-password")
  .all(protectedMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);

userRouter.get("/:id", see);

export default userRouter;
