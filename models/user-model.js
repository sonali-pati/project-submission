
   const mongoose = require('mongoose');

//    schema for user

const userSchema=mongoose.Schema({
   name:{
      type:String,
      required:true,
      minLength:2
   },
   email:{
    type:String,
    required:true,
    unique:true
   },
   password:{
    type:String,
    required:true
   },
   contact:{
    type:Number,
    required:true,
    unique:true,
    maxLength:10,
    minlength:10
   },
   city:{
    type:String,
    required:true
   },
   pincode:{
    type:Number,
   }


}, 
   {timestamps:true})

  const userModel=mongoose.model("users",userSchema);
   
  module.exports=userModel;
