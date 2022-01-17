import express from "express";

const app = express();
/* `https://expressjs.com/ko/guide/using-template-engines.html` Express와 함께 템플리트 엔진을 사용 */
app.set("view engine", "pug");
app.set("views", __dirname + "/views");

/* `https://expressjs.com/ko/starter/static-files.html` Express에서 정적 파일(css,js) 제공 */
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

app.listen(3000, handleListen);
