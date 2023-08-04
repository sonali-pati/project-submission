  
  import { toHaveErrorMessage } from "@testing-library/jest-dom/matchers";
import { useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

   function Create()
   {   
       let product={};
       
       let form=useRef();
      

      //  state variables

      let [toast,setToast]=useState(false)
      // let [message,setMessage]=useState({text:"A sample msg",type:"error"});
         let [message,setMessage]=useState(null)
       
       function readValue(property,value)
       {
          product[property]=value;
          // console.log(product);
       }
      

       function createProduct()
       {
          fetch("http://localhost:8000/products",{
            method:"POST",
            body:JSON.stringify(product),
            headers:{
              "Content-Type":"application/json"
            }
            
          })
          .then((response)=>response.json())
          .then((msg)=>{
            
               if(msg.success===true)
               {
                 setToast(true)
                 setMessage({text:msg.message,type:"success"})
                  
                 form.current.reset()

               }
               else
               {
                setToast(true)
                setMessage({text:msg.message,type:"error"})
               }

            //  when u display any message from abow if else bellow timerwill start
             
              setTimeout(()=>{
                setToast(false);
              },5000)

          })
          .catch((err=>{
            console.log(err)
          }))
       }

      return(
        <div className="container ">

            {
                 toast===true?(

                  <div className={'toastmsg ' + message.type}>
                    {message.text}
                  </div>
                 
                 ):null

             }

           
            <div className="header">
                <h1 className="title">Create Product</h1>
                <Link to="/products">
                <button className="btn btn-primary">View Product</button>
                </Link>
           </div>
            
               <form ref={form}   className="create-form">

                 <input type="number" className="form-control" placeholder="Enter Id" onChange={(event)=>{
                      readValue("id",event.target.value);
                 }}/>
                 <input type="text" className="form-control" placeholder="Enter Name" onChange={(event)=>{
                     readValue("name",event.target.value);  
                 }}/>
                 <input type="number" className="form-control" placeholder="Enter Price" onChange={(event)=>{
                      readValue("price",event.target.value);
                 }}/>
                 <input type="number" className="form-control" placeholder="Enter Quantity" onChange={(event)=>{
                      readValue("quantity",event.target.value);
                 }}/>
                 <button type="button" className="btn btn-primary" onClick={createProduct}>Create Product</button>
                 
               </form>
                
            
        </div>
      )


   }

   export default Create;