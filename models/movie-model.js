
const mongoose = require('mongoose');


const movieSchema=mongoose.Schema({
     
    name:{
         type:String,
         required:[true,"Name is mandatory please fill it"]
    },
    runtime:{
         type:Number,
         required:true
    },
    posterURL:{
         type:String,
         required:true,
         unique:true
    },
    imdbRating:{
         type:Number,
         required:true,
         min:[1,"Minimum value of rating should be 1"],
         max:10
    },
    releaseDate:{
         type:Date,
         required:true,
    },
    description:{
         type:String,
         required:true,
         minLength:50,
         maxLength:500
    },
    genre:{
         type:String,
         required:true,
         enum:["Action","sci-fi","Drama","Thriller"]
    },
    filePath:{
     type:String,
     required:true,
     unique:true
    }
},
    {timestamps:true})

//     model

   const movieModel=mongoose.model("movies",movieSchema)

//   module.exports = movieModel;
  module.exports = movieModel
