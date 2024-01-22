
const express = require("express") ; 
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;
var connection_string = config.connection_string;

app.use(express.json());
const mongoose = require("mongoose");
mongoose.connect(connection_string);

const User = mongoose.model('users',{name:String,email:String,password:String});

app.post('/signup',async(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;

const existingUser = await User.findOne({email:username});
if(existingUser){
    return res.status(400).send("username already exists");
}
    const user = new User({
        name:name,
        email:username,
        password:password
    });


user.save();
res.json({
    "msg":"user created successfully"
})

})

app.listen(port);


