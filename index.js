      
      const express=require('express');

     const mongoose = require('mongoose');

     const cors = require('cors');

     // custom module import
     const movieRouter=require("./routes/movie");
     const userRouter=require("./routes/user")




     // creating the connection with server and db

     mongoose.connect("mongodb://127.0.0.1:27017/batch_6_movies_p")
     .then(()=>{
          console.log("connection successfull  it is working fine.")
     })

  
//     creating express object
   
    const app = express();

//     middlewares

   app.use(express.json());

   app.use(cors());
    
//    routing setup
   app.use("/movies",movieRouter);
   app.use("/users",userRouter);

   

app.listen(8000,()=>{
     console.log("server is up and running thank u ")

})




  


























    
     


     