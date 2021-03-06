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
  socket.on("join_room", (roomName) => {
    socket.join(roomName);
    socket.to(roomName).emit("welcome");
  });
  socket.on("offer", (offer, roomName) => {
    socket.to(roomName).emit("offer", offer);
  });
  socket.on("answer", (answer, roomName) => {
    socket.to(roomName).emit("answer", answer);
  });
});

httpServer.listen(3000, handleListen);
