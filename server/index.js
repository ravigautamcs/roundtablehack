const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
require("./db/conn");
const User = require("./models/users");


const port = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.get("/", (req, res)=>{
    res.send("Home Page!!");
})

app.get("/login", (req, res)=>{
    res.send("login page");
})

app.post("/login", async (req, res)=>{
    try{

        const email = req.body.email;
        const password = req.body.pass;

        // console.log(`${email} and password is ${password}`)

        const useremail = await User.findOne({email: email});
        // res.send(useremail.password);
        // console.log(useremail);

        if(password===useremail.password){
            console.log("login successfull!!!");
            res.status(201).render("success");
        }else{
            res.send("invalid login details!!")
        }

        
    }catch(error){
        res.status(400).send("Invalid Login details!!!")
    }
})

// creating a new user in the database;
app.post('/register', async (req, res)=>{
    try{

        // console.log(req.body.firstname);
        // res.send(req.body.firstname);
        // res.send(req.body.lastname);
        

        const password = req.body.pass; 
        const cpassword = req.body.repass; 

        if(password===cpassword){

            const registerEmployee = new Register({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                gender: req.body.gender,
                email: req.body.email,
                number: req.body.phone,
                password: req.body.pass,
                confirmpassword: req.body.repass,
            })
            const registered = await registerEmployee.save();
            res.status(201).render("index");

        }else{
            res.send("password are not same!!")
        }


    }
    catch (error){
        res.status(400).send(error);
    }
})

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
})