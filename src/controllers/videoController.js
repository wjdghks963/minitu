import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
  } catch {
    return res.render("error");
  }
  return res.render("home", { pageTitle: `Home`, videos });
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (video) {
    return res.render("watch", { pageTitle: video.title, video });
  }
  return res.render("404", { pageTitle: "Video not found" });
};
export const getEdit = (req, res) => {
  const { id } = req.params;

  return res.render("edit", { pageTitle: `Editing ` });
};
export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      // video model이 존재하는 경우 create 가능
      title,
      description,
      hashtags: hashtags.split(",").map((word) => `#${word}`),
    });
    return res.redirect("/");
  } catch (error) {
    return res.render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};
