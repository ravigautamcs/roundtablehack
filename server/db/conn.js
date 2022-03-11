const mongoose = require("mongoose");
const DB = 'mongodb+srv://aryannimishravi:arnira@cluster0.vb6eh.mongodb.net/roundtablehack?retryWrites=true&w=majority'

mongoose.connect(DB)
    .then(()=>{
        console.log(`connection successfull with the database!!`);
    })
    .catch((e)=>{
        console.log(`sorry the connection is not successfull`);
        console.log(e);
    });