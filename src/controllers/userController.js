import bcrypt from "bcrypt";
import session from "express-session";
import User from "../models/User";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });

export const postJoin = async (req, res) => {
  const { name, username, email, password, password2, location } = req.body;
  const pageTitle = "Join";
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "Password confirmation does not match",
    });
  }
  const exists = await User.exists({ $or: [{ username }, { email }] }); // $or이 req.body.props 에서 username이나 email 둘 중 하나 true or false로서 값 가져옴
  if (exists) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "This username/email is already exists",
    });
  }

  try {
    await User.create({
      name,
      username,
      email,
      password,
      location,
    });
    res.redirect("/login");
  } catch (error) {
    {
      return res.status(400).render("join", {
        pageTitle: "Upload Video",
        errorMessage: error._message,
      });
    }
  }
};

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const pageTitle = "Login";
  const user = await User.exists({ username });
  // 계정이 존재하는 체크
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "입력한 username을 가진 유저가 존재하지 않습니다.",
    });
  }
  // password 일치하는지 체크
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "password가 다릅니다",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

export const startGithubLogin = (req, res) => {
  const baseUrl = `https://github.com/login/oauth/authorize`;
  // config는 깃헙에서 제공하는 것과 같은 것을 써야 인식된다 내 마음대로 변수설정하면 안됌!
  const config = {
    client_id: "9563135e0e1d371b1377",
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};

export const finishGithubLogin = (req, res) => {};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const logout = (req, res) => res.send("Log Out");
export const see = (req, res) => res.send("See");
