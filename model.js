//importing mongoose
const mongoose=require('mongoose');
const { string } = require('@hapi/joi');

//creating the schema for the user

const userschema=new mongoose.Schema({


    name:{
        type:String,
        required:true,
        max:200,
        min:5
    },
    email:{
        type:String,
        required:true,
        max:200,
        min:6
    },
    password:{
        type:String,
        required:true,
        max:200,
        min:5
    },
    date:{
        type:Date,
        default:Date.now
    }

});


//exporting schema

module.exports=mongoose.model('user',userschema);