import express from "express";
import http from "http";
import { WebSocketServer } from "ws";

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
const server = http.createServer(app);

/* ws와 http를 같은 port에 넣어 사용하는 방법 External HTTP/S server */
/* http서버 위에 ws서버를 올린 방법. 이렇게 한 이유는 http서버는 노출이되어
    유저에게 보이고 ws서버로 실시간 통신을 사용하기 위함*/
const wss = new WebSocketServer({ server });

/* addEventListener처럼 이벤트를 받으면 콜백함수를 실행시킴 */
/* connection = 누가 우리와 연결됨 */
/* on() = 연결된 사람의 정보를 socket에 넣어줌 */
/* socket = 연결된 사람 */
wss.on("connection", (socket) => console.log(socket));

server.listen(3000, handleListen);
