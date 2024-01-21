const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();

const ALL_USERS = [
  {
    username: "xyz@gmail.com",
    password: "123",
    name: "jack",
  },
  {
    username: "abc@gmail.com",
    password: "1234",
    name: "john",
  },
  {
    username: "pqr@gmail.com",
    password: "12345",
    name: "harry",
  },
];

function userExists(username, password) {
    
 let userExists = false;
 for(let i=0;i<ALL_USERS.length;i++){
    if(ALL_USERS[i].username==username && ALL_USERS[i].password==password){
        userExists = true;
    }
 }
 return userExists;
}

app.use(express.json());

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: "User doesnt exist in our in memory db",
    });
  }

  var token = jwt.sign({ username: username }, jwtPassword);
  return res.json({
    token,
  });
});

app.get("/users", function (req, res) {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
    // return a list of users other than this username
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
});

app.listen(3000)