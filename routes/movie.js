
const express=require('express');
const movieModel = require('../models/movie-model');

const router =express.Router();

// end point to create a movie

router.post("/",(req,res)=>{

    movieModel.create(req.body)
    .then((movie)=>{
      res.send({message:"movie created"})
    })

    .catch((err)=>{
        console.log(err);
        res.send({message:"some problem"})
    })
})

//  endpoint to fetch all movies

 router.get("/",(req,res)=>{

    movieModel.find()
    .then((movies)=>{
     res.send(movies)
    })

    .catch((err)=>{
        cosole.log(err);
     res.send({message:"some problem"})
    })
 })
//    endpoint to get a single movie based on id

  router.get("/:id",(req,res)=>{

     let id = req.params.id;
     
     movieModel.findOne({_id:id})
     .then((movie)=>{
        res.send(movie);
     })
     .cartch((err)=>{
        console.log(err);
        res.send({message:"some problem"})
     })

  })
    // endpoint to delete a movie

    router.delete("/:id",(req,res)=>{

        let id=req.params.id;

        movieModel.deleteOne({_id:id})
        .then((msg)=>{
           res.send({message:"movie deleted"})
        })
        .catch((err)=>{
            console.log(err);
            res.send({message:"some problem"})
        })

      
    })

    // endpoint to update a movie

    router.put("/:id",(req,res)=>{
       let id=req.params.id;
       let data=req.body;

       movieModel.updateOne({_id:id,data})
       .then((msg)=>{
         res.send({message:"movie updated"})
       })
       .catch((err)=>{
         console.log(err);
         res.send({message:"some problem"})
       })

   })

   //   endpoint for playing movies

      router.get("/stream/:filename",(req,res)=>{
         const range=req.headers.range;
         const filename=req.params.filename;
      
          if (!range)
          {
            res.send({message:"Range header is required"});
          }
          const videoSize=fs.statSync(filename).size;
         
          const start=Number(range.replace(/\D/g,""));

          const end=Number(Math.min(start+10**6,videoSize-1));

          const contentlength=end-start;

          let headers={
            "Content-Range":`bytes ${start}-${end}/${videoSize}`,
            "Accept-Range":"bytes",
            "Content-Length":contentlength,
            "Content-Type":"video/mp4"
          }

          res.writeHead(206,headers);

          const videoReadStream=fs.createReadStream(filename,{start,end});

         



      })



     module.exports= router;