const { default: fetch } = require("node-fetch");
const { async } = require("regenerator-runtime");

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const delBtn = document.querySelectorAll(".video__comment-delBtn");

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("i");
  span.innerText = `${text}`;
  const span2 = document.createElement("i");
  span2.innerText = "❌";
  newComment.appendChild(icon);
  newComment.appendChild(span); // append는 밑에 달고
  videoComments.prepend(newComment); // prepend는 element를 밑이 아니라 위부터 추가시켜줌
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    }, // back-end에게 json을 보낸다고 알려주는 headers
    body: JSON.stringify({ text }),
  });

  if (response.status === 201) {
    textarea.value = ""; // 댓글을 post 후 textarea를 빈칸으로 만든다.
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

const handleRemoveComment = async (event) => {
  const comment = event.target.parentElement;
  const commentId = comment.dataset.id;
  const response = await fetch(`/api/comments/${commentId}/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ commentId }),
  });
  if (response.status === 201) {
    comment.remove();
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
delBtn.forEach((item) => {
  item.addEventListener("click", handleRemoveComment);
});
