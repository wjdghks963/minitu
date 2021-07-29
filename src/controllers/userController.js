import User from "../models/User";
import fetch from "node-fetch";
import bcrypt from "bcrypt";

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
  const user = await User.exists({ username, socialOnly: false }); // username과 password로 로그인 하는 user
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
  // session을 수정할 때만(session에 loggedIn과 user가 만들어진다) session을 DB에 저장하고 쿠키를 넘겨주는 것
  // 로그인 하는 유저만 쿠키를 남기게함
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

export const startGithubLogin = (req, res) => {
  const baseUrl = `https://github.com/login/oauth/authorize`;
  // config는 깃헙에서 제공하는 것과 같은 것을 써야 인식된다 내 마음대로 변수설정하면 안됌!
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};

export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();

  if ("access_token" in tokenRequest) {
    //access api
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com";
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();

    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();

    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true
    );
    if (!emailObj) {
      // notification 둬야함
      return res.redirect("/login");
    }
    // DB안에서 해당 email찾음
    let user = await User.findOne({ email: emailObj.email });
    // DB에서 해당 email이 없을 경우 user을 만든다.
    // socialOnly: true일 경우 github으로 로그인 한것
    if (!user) {
      user = await User.create({
        avatartUrl: userData.avatar_url, // avatarUrl이 없는 user는 email과 password로만 계정을 만들었다는 것을 표현 위해
        name: userData.name,
        username: userData.login,
        email: emailObj.email,
        password: "", // email로만 로그인 password없는 경우 === social로 로그인
        socialOnly: true, // social login  Only
        location: userData.location,
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/"); // login된 상태로 redirect
  } else {
    return res.redirect("/login");
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });

export const logout = (req, res) => {
  req.session.destory(); // session을 없앰
  return res.redirect("/");
};

export const getEdit = (req, res) => {
  return res.render("edit-profile", { pageTitle: "Edit Profile" });
};

export const postEdit = async (req, res) => {
  const {
    session: {
      user: { _id, avatarUrl, email: sessionEmail, username: sessionUsername }, //  session에 있는 user의 id는 _id로 저장되어있음
    },
    body: { name, email, username, location }, // == const { name, email, username, location } = req.body;
    file, // = req.file  안에는 avatar img가 있음
  } = req;
  let searchParam = []; // 빈 배열 안에 email username을 넣고 수정을 하면 그 안에서 같은 것들이 존재하면 에러가 뜨게함
  if (sessioEmail !== email) {
    searchParam.push({ email });
  }
  if (sessionUsername !== username) {
    searchParam.push({ username });
  }
  if (sessionParam.length > 0) {
    const foundUser = await User.findOne({ $or: searchParam });
    if (foundUser && foundUser._id.toString() !== _id) {
      return res.status(HTTP_BAD_REQUEST).render("edit-profile", {
        pageTitle: "Edit Profile",
        errorMessage: "This username/emil is already taken",
      });
    }
  }

  const updateUser = await User.findByIdAndUpdate(
    _id,
    {
      avatarUrl: file ? file.path : avatarUrl, // 새로운 avatar가 있으면 주소주고 없으면 본래 있는 아바타 Url준다.
      name,
      email,
      username,
      location,
    },
    { new: true } // 새로운 것으로 바꾸는 option
  );
  req.session.user = updateUser;
  return res.redirect("/users/edit");
};

export const getChangePassword = (req, res) => {
  if (req.session.user.socialOnly === true) {
    return redirect("/");
  }
  return res.render("users/change-password", { pageTitle: "Change Password" });
};
export const postChangePassword = async (req, res) => {
  const {
    session: {
      user: { _id, password },
    },
    body: { oldPassword, newPassword, newPasswordConfirmation },
  } = req;
  const user = await User.findById(_id);
  const ok = await bcrypt.compare(oldPassword, user.password);
  if (!ok) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change Password",
      errorMessage: "The current password is incorrect",
    });
  }
  if (newPassword !== newPasswordConfirmation) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change Password",
      errorMessage: "The password doen't match",
    });
  }
  user.password = newPassword;
  await user.save(); // user password를 newPassword로 바꾸고 User pre안에 있는 것을 이용해 저장한다.

  return res.redirect("/users/logout");
};

export const see = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).render("404", pageTitle:"User not found");
  }
  return res.render("users/profile", {
    pageTitle: user.name,
    user,
  });
};
