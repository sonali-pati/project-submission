


   const mongoose = require('mongoose');

   const userMovieSchema=mongoose.Schema({

    movie:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"movies"
    },
    users:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    watched:{
      type:Number,
      default:0
    }

      },{timestamps:true})


      const userMovieModel=mongoose.model("user_movies",userMovieSchema)

      module.exports=userMovieModel;
    