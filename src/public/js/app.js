/* io() = 자동적으로 socket.io를 실행하는 서버를 찾음 */
const socket = io();

const myFace = document.getElementById("myface");
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");

let myStream;
let muted = false;
let cameraOff = false;

async function getMedia() {
  try {
    myStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    console.dir(myStream);
    myFace.srcObject = myStream;
  } catch (error) {
    console.dir(error);
  }
}

getMedia();

function handleMuteClick() {
  if (!muted) {
    muteBtn.innerText = "UnMuted";
    muted = true;
  } else {
    muteBtn.innerText = "Muted";
    muted = false;
  }
}

function handleCameraClick() {
  if (!cameraOff) {
    cameraBtn.innerText = "Turn Camera On";
    cameraOff = true;
  } else {
    cameraBtn.innerText = "Turn Camera Off";
    cameraOff = false;
  }
}

muteBtn.addEventListener("click", handleMuteClick);
cameraBtn.addEventListener("click", handleCameraClick);
