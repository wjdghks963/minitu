const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currenTime = document.getElementById("currenTime");
const totalTime = document.getElementById("totalTime");
const timeLine = document.getElementById("timeLine");

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

const formatTime = (secondes) =>
  new Date(secondes * 1000).toISOString().substr(11, 8);

const handleLoadedMetaData = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeLine.max = Math.floor(video.duration);
};

const handleTimeUpdate = (e) => {
  currenTime.innerText = formatTime(Math.floor(video.currentTime));
  timeLine.value = Math.floor(video.currentTime);
};

const handleTimeLineChange = (e) => {
  const {
    target: { value },
  } = e;
  video.currentTime = value;
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetaData);
video.addEventListener("timeupdate", handleTimeUpdate);
timeLine.addEventListener("input", handleTimeLineChange);
