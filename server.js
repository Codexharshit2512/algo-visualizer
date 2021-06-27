const express = require("express");
const result = require("dotenv").config();
const ejs = require("ejs");
const path = require("path");
const cors = require("cors");
const request = require("request");
const { SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG } = require("constants");
const app = express();
const code = `public class HelloWorld{

  public static void main(String []args){
     System.out.println("Hello World");
  }
}`;

app.use(cors());
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(__dirname + "/styles"));
app.use(express.static(__dirname + "/scripts"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/sortVisualizer", (req, res) => {
  res.render("sort");
});

app.get("/searchVisualizer", (req, res) => {
  res.render("search");
});

app.get("/pathFinder", (req, res) => {
  res.render("Pathfind");
});

app.get("/editor", (req, res) => {
  res.render("editor");
});

app.post("/execute", (req, res) => {
  var program = {
    script: req.body.program,
    stdin: req.body.stdin,
    language: req.body.language,
    versionIndex: "2",
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  };
  request(
    {
      url: "https://api.jdoodle.com/v1/execute",
      method: "POST",
      json: program,
    },
    function (error, response, body) {
      console.log("error:", error);
      console.log("statusCode:", response && response.statusCode);
      console.log("body:", body);
      const ans = {
        error,
        response: response && response.statusCode,
        body,
      };
      res.json(ans);
    }
  );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("server started"));
