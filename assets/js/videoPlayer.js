/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/js/videoPlayer.js":
/*!**************************************!*\
  !*** ./src/client/js/videoPlayer.js ***!
  \**************************************/
/***/ (() => {

eval("var video = document.querySelector(\"video\");\nvar playBtn = document.getElementById(\"play\");\nvar playBtnIcon = playBtn.querySelector(\"i\");\nvar muteBtn = document.getElementById(\"mute\");\nvar muteBtnIcon = muteBtn.querySelector(\"i\");\nvar volumeRange = document.getElementById(\"volume\");\nvar currenTime = document.getElementById(\"currenTime\");\nvar totalTime = document.getElementById(\"totalTime\");\nvar timeLine = document.getElementById(\"timeLine\");\nvar fullScreenBtn = document.getElementById(\"fullScreen\");\nvar fullScreenIcon = fullScreenBtn.querySelector(\"i\");\nvar videoContainer = document.getElementById(\"videoContainer\");\nvar videoControls = document.getElementById(\"videoControls\");\nvar controlsTimeout = null;\nvar controlsMovementTimeout = null;\nvar volumeValue = 0.5; // volume 기본값\n\nvideo.volume = volumeValue;\n\nvar handlePlayClick = function handlePlayClick(e) {\n  // video 재생, 멈춤\n  if (video.paused) {\n    video.play();\n  } else {\n    video.pause();\n  }\n\n  playBtnIcon.classList = video.paused ? \"fas fa-play\" : \"fas fa-pause\";\n};\n\nvar handlePause = function handlePause(e) {\n  playBtn.innerText = \"Play\";\n};\n\nvar handlePlay = function handlePlay(e) {\n  playBtn.innerText = \"Pause\";\n};\n\nvar handleMuteClick = function handleMuteClick(e) {\n  // muted는 F,T 설정 없을 시 자동적으로 false\n  if (video.muted) {\n    video.muted = false;\n  } else {\n    video.muted = true;\n  }\n\n  muteBtnIcon.classList = video.muted ? \"fas fa-volume-mute\" : \"fas fa-volume-up\";\n  volumeRange.valye = video.muted ? 0 : volumeValue;\n};\n\nvar handleVolumeChange = function handleVolumeChange(e) {\n  var value = e.target.value;\n\n  if (video.muted) {\n    video.muted = false;\n    muteBtn.innerText = \"Mute\";\n  }\n\n  volumeValue = value; // volumeValue를 전역변수로 설정시켜서 mute전의 값으로 되돌림\n\n  video.volume = value; // 실시간 값 변경\n};\n\nvar formatTime = function formatTime(secondes) {\n  return new Date(secondes * 1000).toISOString().substr(14, 5);\n};\n\nvar handleLoadedMetaData = function handleLoadedMetaData() {\n  totalTime.innerText = formatTime(Math.floor(video.duration));\n  timeLine.max = Math.floor(video.duration);\n};\n\nvar handleTimeUpdate = function handleTimeUpdate(e) {\n  currenTime.innerText = formatTime(Math.floor(video.currentTime));\n  timeLine.value = Math.floor(video.currentTime);\n};\n\nvar handleTimeLineChange = function handleTimeLineChange(e) {\n  var value = e.target.value;\n  video.currentTime = value;\n};\n\nvar handleFullScreen = function handleFullScreen() {\n  var fullscreen = document.fullscreenElement;\n\n  if (fullscreen) {\n    document.exitFullscreen();\n    fullScreenIcon.classList = \"fas fa-expand\";\n  } else {\n    videoContainer.requestFullscreen();\n    fullScreenIcon.classList = \"fas fa-compress\";\n  }\n};\n\nvar hideControls = function hideControls() {\n  videoControls.classList.remove(\"showing\");\n};\n\nvar handleMouseMove = function handleMouseMove() {\n  // 들어갔다 왔을때 Timeout 초기화\n  if (controlsTimeout) {\n    clearTimeout(controlsTimeout);\n    controlsTimeout = null;\n  } // video 내에서 마우스 움직일때 Timeout 초기화\n\n\n  if (controlsMovementTimeout) {\n    clearTimeout(controlsMovementTimeout);\n    controlsMovementTimeout = null;\n  }\n\n  videoControls.classList.add(\"showing\");\n  controlsMovementTimeout = setTimeout(hideControls, 3000);\n};\n\nvar handleMouseLeave = function handleMouseLeave() {\n  controlsTimeout = setTimeout(hideControls, 3000);\n};\n\nplayBtn.addEventListener(\"click\", handlePlayClick);\nmuteBtn.addEventListener(\"click\", handleMuteClick);\nvolumeRange.addEventListener(\"input\", handleVolumeChange);\nvideo.addEventListener(\"loadeddata\", handleLoadedMetaData);\nvideo.addEventListener(\"timeupdate\", handleTimeUpdate);\ntimeLine.addEventListener(\"input\", handleTimeLineChange);\nfullScreenBtn.addEventListener(\"click\", handleFullScreen);\nvideo.addEventListener(\"mousemove\", handleMouseMove);\nvideo.addEventListener(\"mouseleave\", handleMouseLeave);\n\n//# sourceURL=webpack://wetube_ver2/./src/client/js/videoPlayer.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/videoPlayer.js"]();
/******/ 	
/******/ })()
;