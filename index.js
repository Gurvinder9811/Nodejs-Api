const express = require('express');
const fs = require('fs')
const mongoose = require("mongoose");
const { URLSearchParams } = require('url');

const app = express();

const PORT = 8000;
// connection
mongoose
.connect("mongodb://127.0.0.1:27017/myfirst-db")
.then(()=> console.log("mongodb connected"))
.catch((err) => console.log("mongo error , err"));

//schema

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type:String,
    },
    email:{
    type: String,
    required: true,
    unique: true,
    },
    jobTitle:{
    type: String,
    },
    gender:{
    type: String,
    }

});

//model

const User = mongoose.model("User", userSchema);

//plugin for express
app.use(express.urlencoded({extended: false}));

//Route
app.get("/users", async (req, res) => {
    const allDbUsers = await User.find({});
    const html =`
    <ul>
    ${users.map((user)=> `<li>${user.firstName} - ${user.email}</li>`).join("")}
    </ul>`;
res.send(html);
});

//REST API
app.get("/api/users", async (req, res) => {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
}) 

app
.route("/api/users/:id")
.get(async(req, res)=>{
    const id = Number(req.params.id);
    if(!user) return res.status(404).json({error: "not found"});
    return res.json(user);
})
.patch(async(req, res)=>{
    await User.findByIdAndUpdate(req.params.id,{ lastName: "changed"});
    return res.json({status:"success"})

})
.delete(async(req, res)=>{
    await User.findByIdAndDelete(req.params.id);
    return res.json({status:"success"})
});



app.post("/api/users", async (req, res)=>{
    const body = req.body;
    if(
        !body ||
        !body.first_name||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.job_title

    ){
        return res.status(400).json({msg: "All fields are req..."
        });
    }
        const result = await User.create({
            firstName: body.first_name,
            lastName: body.last_name,
            email: body.email,
            gender: body.gender,
            jobTitle:body.job_title
        });

        console.log('result', result);
        return res.status(201).json({msg: "success"});

    }
    
);


app.listen(PORT, ()=> console.log(`Server started at PORT:${PORT}`) )