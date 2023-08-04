     
     const fs = require('fs') ;
     const http = require('http');
     const url= require("url")

     http.createServer((req,res)=>{
       let parsedURL=url.parse(req.url,true);
       console.log(parsedURL);
       let products=fs.readFileSync("./products.json",{encoding:"utf-8"});
        // get request for product
        
        res.writeHead(200,{
          "Access-Control-Allow-Origin":"*",
          "Access-Control-Allow-Methods":"DELETE, POST,PUT",
          "Access-Control-Allow-Headers":"*",
          "Access-Control-Allow-Headers":"*"

        })
        // console.log(req.method)
      if(req.method==="OPTIONS")
      {
        res.end();
      }

    else if(req.method === "GET" && parsedURL.pathname ==="/products" )

     {
         let id=parsedURL.query.id;

        if (id===undefined)

         {
           res.write(products);
            res.end();
     
         }
       else
        {
          let product=JSON.parse(products).find((ele,index)=>{
           return Number(ele.id)===Number(id);
            })

             if(product!==undefined)
               {
                 res.write(JSON.stringify(product));
                }
            else
              {
            res.write(JSON.stringify({message:"invalid product id",success:false}))
              }
          
         }
         
          res.end();
        }

        // delete rquest for product with id coming in url

        else if(req.method==="DELETE" && parsedURL.pathname==="/products")
            {
                let id= parsedURL.query.id;
                 if(id!==undefined)
                   {
                     let pro=JSON.parse(products);
                     let index= pro.findIndex((ele,index)=>{
                      return Number(ele.id)=== Number(id)
                     });

                     pro.splice(index,1);

                     fs.writeFile("./products.json",JSON.stringify(pro),(err)=>{
                         if(err===null)
                         {
                          res.write(JSON.stringify({message:"product deleted",success:true}))
                          res.end();
                         }
                     });

                    
                    }

                    
                    else
                    {
                      res.write(JSON.stringify({message:"invalid product id",success:false}))
                      res.end();
                    }
                     
              }
            
              // post request for creating new product

        else if(req.method==="POST" && parsedURL.pathname==="/products")
         
        {
              let data="";
            req.on("data",(chunk)=>{
              data+=chunk;
            })
            
            req.on("end",()=>{
              let dataOBJ = JSON.parse(data);

              let pro = JSON.parse(products) ;

              pro.push(dataOBJ);

              fs.writeFile("./products.json",JSON.stringify(pro),(err)=>{
                if(err===null)
                {
                  res.write(JSON.stringify({message:"product added",success:true}))
                  res.end()
                }
              })
            })
            
        }

          // update request for product with id coming in url
      else if(req.method ==="PUT" && parsedURL.pathname==="/products")
     {    
         let id= parsedURL.query.id;
         let data="";
         req.on("data",(chunk)=>{
         
           data+=chunk;

         })

         req.on("end",()=>{
          
          let dataOBJ = JSON.parse(data);
          let pro = JSON.parse(products);

          let indexOfUpdate=pro.findIndex((product,index)=>{
            return Number(product.id)===Number(id);
          })
           
          pro[indexOfUpdate]=dataOBJ;

          fs.writeFile("./product.json",JSON.stringify(pro),(err)=>{

            if(err===null)
            {
              res.write(JSON.stringify({message:"product updated",sccess:true}));
              res.end();
            }
          })
          
         

         })

      
     }
          

       else
          {
             res.write(JSON.stringify({message:"Invalid Request",success:false}));
             res.end();
          }
       
     }).listen(8000,()=>{
        console.log("sever is up running");
     })
