import { useEffect, useRef, useState } from "react";
import { Link, useLoaderData } from 'react-router-dom'; 


  

  function Products()
  {  

      // state variables

      let[products,setProducts]=useState([])
      let[modalVisible,setModalVisible]=useState(false)
      // let[productToUpdate,setProductToUpdate]=useState({})
      let product=useRef({})

       useEffect(()=>{

        fetch("http://localhost:8000/products")
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data)
            setProducts(data)
        })
        .catch((err)=>{
            console.log(err)
        })
        
      },[])
           
        function deleteProduct(id)
        {
           fetch("http://localhost:8000/products?id="+id,{
            method:"DELETE"
           })
           .then((response)=>response.json())
           .then((message)=>{
            console.log(message)
             
            let tempProducts= [...products]

            let eleIndex=tempProducts.findIndex((ele,)=>{
              return Number(ele.id)===Number(id)
            })
               tempProducts.splice(eleIndex,1)
               setProducts=(tempProducts)
               
           })
           .catch((err)=>{
            console.log(err)
           })
        }
        
         
         
            
         

         function setupUpdate(pro)
         {
            setModalVisible(true);

            // setProductToUpdate(pro)
            product.current={...pro}
         }

         function readValue(property,value)
         {
           product.current[property]=value ;
           console.log(product.current)
         }

         function updateProduct()
         {
           fetch("http://localhost:8000/products?id="+product.current.id,{
            method:"PUT",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify(product.current)
           })
           .then((response)=>response.json())
           .then((data)=>{
            console.log(data)
            if(data.sccess===true)
            {
              setModalVisible(false)
              let tempProducts=[...products]

              let indexToUpdate=tempProducts.findIndex((ele,index)=>{
                return ele.id===product.current.id
              })

              tempProducts[indexToUpdate]=product.current
               
              setProducts(tempProducts)
            }
           })
           .catch((err)=>{
            console.log(err)
           })
         }


     return(
        <div className="container">
 
           {
              modalVisible==true?(
              <div className="update-modal">
               
               
                <h1 className="section-title">Update Product</h1>
                
                <input type="number" className="form-control" defaultValue={product.current.id}  placeholder="Enter Id" onChange={(event)=>{
                    readValue("id",event.target.value)
                }}/>
                 
                 <input type="text" className="form-control" defaultValue={product.current.name} placeholder="Enter Name" onChange={(event)=>{
                   readValue("name",event.target.value)
                 }}/>
                      
                 
                 <input type="number" className="form-control"defaultValue={product.current.price} placeholder="Enter Price" onChange={(event)=>{
                  readValue("quantity",event.target.value)
                 }} />
                 
                 <input type="number" className="form-control"defaultValue={product.current.quantity} placeholder="Enter Quantity"/> 
                 

                 <button type="button" className="btn btn-primary"onClick={updateProduct}>Update Product</button>

                 
                
              </div>


              ):null
           }
                
                {/* <div className="update-modal">

              </div> */}
               
              
          


           <div className="header">
           <h1 className="title">All products Fine</h1>
           <Link to="/create">
            <button className="btn btn-primary">Create Product</button>
           </Link>
           </div>
           <div className="products">
           <table className=" products-data table">
            <thead>
              
                <tr>
                    <th>Sr.no.</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                   {
                    products.map((product,index)=>{
                      return(
                        <tr key={index}>
                          <td>{index+1}</td>
                          <td>{product.name}</td>
                          <td>{product.price}</td>
                          <td>{product.quantity}</td>
                          <td className="actions">
                            <i className="fa-solid fa-file-pen me-3 text-success" onClick={()=>{
                              
                              setupUpdate(product);
                            }}></i>
                            <i className="fa-solid fa-trash-can text-danger"onClick={()=>{
                                  deleteProduct(product.id)
                            }}></i>
                                   
                
                          </td>
                        </tr>
                      )
                    })
                   }

                   
              </tbody>
           </table>

           </div>
        </div>
     )

  }

  export default Products;