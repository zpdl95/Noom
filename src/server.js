import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
/* `https://expressjs.com/ko/guide/using-template-engines.html` Express와 함께 템플리트 엔진을 사용 */
app.set("view engine", "pug");
app.set("views", __dirname + "/views");

/* `https://expressjs.com/ko/starter/static-files.html` Express에서 정적 파일(css,js) 제공 */
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

/* nodejs의 내장모듈 http를 이용한 서버 */
/* .createServer() = 서버 인스턴스 생성 */
/* http의 리스너로 express의 app을 사용함 */
/* express의 서버가 아니라 http내장모듈을 서버로 사용한 이유는 express는 http통신만 가능하기 때문 */
const httpServer = http.createServer(app);

/* socket.io서버를 http서버 위에 올림 */
/* `http://localhost:3000/socket.io/socket.io.js`위치에 js파일이 있음 */
const wsServer = new Server(httpServer);

wsServer.on("connection", (socket) => {
  socket["nickname"] = "익명";
  /* 모든 이벤트에 대해 실행됨 */
  socket.onAny((event) => console.log(`socket event: ${event}`));
  socket.on("enter_room", (roomName, done) => {
    socket.join(roomName);
    done();
    socket.to(roomName).emit("welcome", socket.nickname);
  });
  /* disconnecting = socket이 room을 떠나기 직전에 실행되는 이벤트 */
  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) =>
      socket.to(room).emit("bye", socket.nickname)
    );
  });
  socket.on("new_message", (msg, room, done) => {
    socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
    done();
  });
  socket.on("nickname", (nickname, roomname) => {
    socket["nickname"] = nickname;
  });
});

httpServer.listen(3000, handleListen);
