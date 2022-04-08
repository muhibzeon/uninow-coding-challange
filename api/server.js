//Setting up the express API and it provides necessary routes

const express = require("express");
const app = express();

const cors = require("cors");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const users = require("./users");
const grades = require("./grades.json");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//console.log(Object.values(grades));

app.get("/grades/list", (req, res) => {
  res.json(Object.values(grades));
});

app.get("/api/tips/regular", (req, res) => {
  res.json(users.regular);
});

app.post("/api/auth", (req, res) => {
  let user = users.students.filter((student) => {
    return (
      student.name == req.body.name && student.password == req.body.password
    );
  });

  if (user.length) {
    let token_payload = {
      name: user[0].name,
      password: user[0].password,
    };

    //creating token using user name and pass which is valid for 1 hr
    let token = jwt.sign(token_payload, "jwt_secret_password", {
      expiresIn: "1h",
    });

    //send response message
    let response = {
      message: "Authentication Successful with token Created",
      token: token,
    };

    //returning the token and request data as JSON
    return res.status(200).json(response);
  } else {
    return res.status("409").json("Authentication failed");
  }
});

app.listen(3001, () => {
  console.log("App started at port 3001");
});
