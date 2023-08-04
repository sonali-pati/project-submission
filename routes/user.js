    

        const express=require('express');
        const bcryptjs=require('bcryptjs');
        const jwt=require("jsonwebtoken");

        const verifyToken=require('./verify-token')

        const userModel=require("../models/user-model");
        const userMovieModel=require("../models/user-movie-model")

        const router =express.Router();

        // endpoints for user registration or user cration

         router.post("/",(req,res)=>{
            let user=req.body;

            bcryptjs.genSalt(10,(err,salt)=>{

                if(err===null || err===undefined)
                {
                    bcryptjs.hash(user.password,salt,(err,encpass)=>{
                      
                        if(err===null || err=== undefined)
                        {
                            user.password=encpass;

                              userModel.create(user)
                             .then((doc)=>{
                              res.send({message:"user register successfully"})
                           })

                             .catch((err)=>{
                              console.log(err);
                            res.send({message:"some problem while registering user"})
                         })


                        }


                    })
                }
            })


          
            
         })

        //  endpoint for login
           
        router.post("/login",(req,res)=>{
          let userCred=req.body
          
          userModel.findOne({email:userCred.email})
          .then((user)=>{
           if(user!==undefined)
           {
            bcryptjs.compare(userCred.password,user.password,(err,result)=>{
                if(err===null || err===undefined)
                {
                    if(result===true)
                    {
                      jwt.sign(userCred,"secretkey",(err,token)=>{
                        if(err===null || err===undefined)
                        {
                          res.send({success:true,token:token})
                        }
                      })
                    }
                    else
                    {
                     res.send({message:"incorrect password"})
                    }
                }
            })
           }
           else
           {
            res.send({message:"not a valid user"})
           }


          })
          .catch((err)=>{
            console.log(err)
            res.send({message:"some problem while login in user"})
          })



        })


            // when user click on play button tevha ha bellow endpoint

             router.post("/play",verifyToken,(req,res)=>{
              const user_movie=req.body;
              
              userMovieModel.findOne({movie:user_movie.movie,user:user_movie.user})
              .then((data)=>{
               if(data===undefined)
               {
                userMovieModel.create(user_movie)
                .then((user_movie)=>{
                   res.send({success:true,message:"user movie created"}) 
                })
                .catch((err)=>{
                  console.log(err);
                  res.send({message:"some problem while playing movie"})
                })

               }

               else
               {
                  res.send({success:true,message:"user movie created"}) 
               }

             })

              .catch((err)=>{
                console.log(err);
                res.send({message:"some problem while playing"})
              })

        })
       
         
    // how much time user watch movie tyacha ha bellow endpoint ie. watched:0 put here updated value
        

         router.put("/closeplayer/:user_movie_id",verifyToken,(req,res)=>{
              let data= req.body;
              let id=req.params.user_movie_id ;

              userMovieModel.updateOne({_id:id},data)
              .then((info)=>{
                 res.send({success:true,message:"player closed"})
              })
              .catch((err)=>{
                 console.log(err)
                 res.send({message:"some problem while closing"})
              })
         })   




       

        //  router.get("/something",verifyToken,(req,res)=>{
        //   res.send({message:"i am highly secured endpoint"})
        //  })
       
         
         

        module.exports=router;