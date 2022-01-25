/* io() = 자동적으로 socket.io를 실행하는 서버를 찾음 */
const socket = io();

const myFace = document.getElementById("myface");
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");
const camerasSelect = document.getElementById("cameras");

const call = document.getElementById("call");

call.hidden = true;

let myStream;
let muted = false;
let cameraOff = false;
let roomName;
let myPeerConnection;

async function getCameras() {
  try {
    /* enumerateDevices() 시스템에서 사용 가능한 미디어 입출력 장치의 정보를 담은 배열을 가져옵니다 */
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === "videoinput");
    const currentCamera = myStream.getVideoTracks()[0];
    cameras.forEach((camera) => {
      const option = document.createElement("option");
      option.value = camera.deviceId;
      option.innerText = camera.label;
      if (currentCamera.label === camera.label) {
        option.selected = true;
      }
      camerasSelect.append(option);
    });
  } catch (error) {
    console.log(error);
  }
}

async function getMedia(deviceId) {
  const initialConstrains = {
    audio: true,
    video: false,
  };
  const cameraConstrains = {
    audio: true,
    video: { deviceId: { exact: deviceId } },
  };
  try {
    /* getUserMedia()
    사용자에게 권한을 요청한 후,
      시스템의 카메라와 오디오 각각 혹은 모두 활성화하여,
      장치의 입력 데이터를 비디오/오디오 트랙으로 포함한
      MediaStream (en-US)을 반환 */
    myStream = await navigator.mediaDevices.getUserMedia(
      deviceId ? cameraConstrains : initialConstrains
    );
    myFace.srcObject = myStream;
    if (!deviceId) {
      await getCameras();
    }
  } catch (error) {
    console.dir(error);
  }
}

function handleMuteClick() {
  myStream
    .getAudioTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  if (!muted) {
    muteBtn.innerText = "UnMuted";
    muted = true;
  } else {
    muteBtn.innerText = "Muted";
    muted = false;
  }
}

function handleCameraClick() {
  myStream
    .getVideoTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  if (!cameraOff) {
    cameraBtn.innerText = "Turn Camera On";
    cameraOff = true;
  } else {
    cameraBtn.innerText = "Turn Camera Off";
    cameraOff = false;
  }
}

async function handleCameraChange() {
  await getMedia(camerasSelect.value);
}

muteBtn.addEventListener("click", handleMuteClick);
cameraBtn.addEventListener("click", handleCameraClick);
camerasSelect.addEventListener("input", handleCameraChange);

// welcome Form (join a room)

const welcome = document.getElementById("welcome");
const welcomeForm = welcome.querySelector("form");

async function initCall() {
  welcome.hidden = true;
  call.hidden = false;
  await getMedia();
  makeConnection();
}

async function handleWelcomeSubmit(e) {
  e.preventDefault();
  const input = welcomeForm.querySelector("input");
  roomName = input.value;
  await initCall();
  socket.emit("join_room", roomName);
}

welcomeForm.addEventListener("submit", handleWelcomeSubmit);

// Socket code

// //Peer A
socket.on("welcome", async () => {
  /* offer생성, 피어 투 피어의 초대장 비슷한것 */
  const offer = await myPeerConnection.createOffer();
  /* 생성된 offer로 연결을 구성함 */
  myPeerConnection.setLocalDescription(offer);
  /* 서버로 offer를 송신 */
  socket.emit("offer", offer, roomName);
});

// //Peer B
/* offer를 수신받음 */
socket.on("offer", async (offer) => {
  /* 수신받은 offer로 원격연결을 구성함 */
  myPeerConnection.setRemoteDescription(offer);
  /* answer생성, offer의 답장회신 */
  const answer = await myPeerConnection.createAnswer();
  /* 생성된 answer로 연결을 구성함 */
  myPeerConnection.setLocalDescription(answer);
  /* 서버로 answer을 송신 */
  socket.emit("answer", answer, roomName);
});

// //Peer A
socket.on("answer", (answer) => {
  /* 수신받은 answer로 원격연결을 구성함 */
  myPeerConnection.setRemoteDescription(answer);
});

// RTC code

function makeConnection() {
  /* 피어 투 피어 커넥션을 만든다 */
  myPeerConnection = new RTCPeerConnection();
  myStream
    .getTracks()
    /* 각 스트림트랙을 커넥션에 넣어준다 */
    .forEach((track) => myPeerConnection.addTrack(track, myStream));
}
