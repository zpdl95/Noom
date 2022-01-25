1. npm init -> package.json파일 생성
2. git init -> 깃 레포지토리 생성
3. npm i nodemon -D -> 자동재실행 해주는 nodemon을 개발자의존으로 설치
4. babel.config.json, nodemon.json 파일 생성
5. npm i @babel/core @babel/cli @babel/node @babel/preset-env -D -> 코드를 구형으로 컴파일 해주는 babel 설치(express의 코드가 구형이기 때문)
6. npm i express -> Node.js의 사실상의 표준 서버 프레임워크
7. npm i pug -> html을 조금 더 세련되게 쓸 수 있는 템플릿 언어, express 뷰 엔진
8. npm i ws -> nodejs에서 사용할 수 있는 websocket protocol을 실행하는 package
9. npm i socket.io -> socket.io 설치
10. npm i "@socket.io/admin-ui" -> socket.io의 관리자 UI 패널 `https://socket.io/docs/v4/admin-ui/`

@babel/node는 웬일인지 실행이 되지 않는다. 해결방법은 -g를 사용하여 전역으로 설치를 하던지 package.json 최상단에 "type": "module"을 추가하여 최신코드로 인식시키는 방법뿐.

프로토콜 = 백신패스처럼 어떤사람이 어딘가에 있는 방에 만나고 그리고 일이 어떻게 진행될지 결정하는 규칙

SocketIO = 프론트엔드와 백엔드의 양방향통신 해주는 프레임워크. websocket을 사용한다. websocket이 작동안되면 http longpoll을 사용. 연결이 끊어졌을때 자동으로 재연결을 시도한다 `https://socket.io/`

adapter = 다른 서버들 사이에서 실시간 어플리케이션 동기화를 함. 기본적으로 각 서버는 자신의 메모리풀에 room을 저장함. 이 각 서버들의 room정보를 공유하기 위해서는 서버들이 연결되있어야함. adapter가 이 기능을 함 `https://socket.io/docs/v4/glossary/#adapter`

자바스크립트에 있는 navigator.mediaDevices 를 이용해 화면공유, 카메라, 오디오를 사용할 수 있다 `https://developer.mozilla.org/ko/docs/Web/API/MediaDevices`

자바스크립트에 있는 RTCPeerConnection()을 이용해 피어 투 피어 커넥션을 만든다.
getUserMedia()를 사용해 stream과 track을 만든다.
RTCPeerConnection().addTrack()을 사용해 커넥션에 track을 넣는다.
RTCPeerConnection().createOffer()를 사용해 offer(제공자, 초대장)를 생성한다
RTCPeerConnection().setLocalDescription(offer)를 사용해 생성된 offer로 연결을 구성함
