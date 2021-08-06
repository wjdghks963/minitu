const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volumeRange = document.getElementById("volume");

let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayClick = (e) => {
  // video 재생, 멈춤
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerText.video.paused ? "Play" : "Pause";
};

const handlePause = (e) => {
  playBtn.innerText = "Play";
};
const handlePlay = (e) => {
  playBtn.innerText = "Pause";
};

const handleMute = (e) => {
  // muted는 F,T 설정 없을 시 자동적으로 false
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtn.innerText = video.muted ? "UnMute" : "Mute";
  volumeRange.valye = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (e) => {
  const {
    target: { value },
  } = e;
  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }
  volumeValue = value; // 전역변수로 설정시켜서 mute전의 값으로 되돌림
  video.volume = value; // 실시간 값 변경
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
