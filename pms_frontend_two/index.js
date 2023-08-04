    
     let allproducts=[]

     function getData()
     {
        fetch("http://localhost:8000/products",{
        method:"GET"
        })
        .then((response)=>response.json())
        .then((products)=>{
            console.log(products)
            allproducts=products

            displayData(allproducts);
        })
        .catch((err)=>{
            console.log(err)
        })

     }
       getData()


       function displayData(products)
       {

        document.getElementById("products").innerHTML="";

        products.forEach((product,index)=>{
             
            let tr=document.createElement("tr");

            let numberTd=document.createElement("td");
            numberTd.append(index+1)
            tr.appendChild(numberTd);

            let nameTd=document.createElement("td");
            nameTd.append(product.name)
            tr.appendChild(nameTd);

            let priceTd=document.createElement("td");
            priceTd.append(product.price)
            tr.appendChild(priceTd);

            let quantityTd=document.createElement("td");
            quantityTd.append(product.quantity)
            tr.appendChild(quantityTd);

            let actionTd=document.createElement("td");

            let upIcon=document.createElement("i")
            upIcon.className=" icon fa-solid fa-file-pen text-success"
            upIcon.setAttribute("data-bs-toggle","modal");
            upIcon.setAttribute("data-bs-target","#exampleModal");

            upIcon.addEventListener("click",()=>{
                setUPdateModel(product.id)
            })


            let delIcon=document.createElement("i");
            delIcon.className=" icon fa-solid fa-trash-can text-danger"

            delIcon.addEventListener("click",()=>{
                deleteProduct(product.id)
            })

            actionTd.appendChild(upIcon);
            actionTd.appendChild(delIcon);

            tr.appendChild(actionTd)
          
            document.getElementById("products").appendChild(tr);

         })
            
         
       }
        //  displayData();

        function deleteProduct(id)
        {
            fetch("http://localhost:8000/products?id="+id,{
             method:"DELETE"
            })
            .then((response)=>response.json())
            .then((msg)=>{
                console.log(msg)
                
                
                

                let indexToDelete=allproducts.findIndex((product,index)=>{
                    return Number(product.id)===Number(id)
                })
                allproducts.splice(indexToDelete,1)
                displayData(allproducts)

                 

                openToast(msg.message)
            })

            .catch((err)=>{
                console.log(err)
            })
        }

        function addData()
        {
            let product={};
            product.id=document.getElementById("id").value ;
            product.name=document.getElementById("name").value;
            product.price=Number( document.getElementById("price"). value );
            product.quantity= Number(document.getElementById("quantity").value) ;
            
            // console.log(product);

            fetch("http://localhost:8000/products",{
                method:"POST",
                body:JSON.stringify(product),
                headers:{
                "Content-Type":"application/json"
                }
             })
             .then((response)=>response.json())
             .then((msg)=>{

                // console.log(msg)
                allproducts.push(product);
                displayData(allproducts);

                openToast(msg.message)
                              
                   
              })

             .catch((err)=>{
                console.log(err)
             })
        }

          let idToUpdate=null;

        function setUPdateModel(id)
        {
           let product=allproducts.find((product,index)=>{
            return Number(product.id)===Number(id)
           })

               idToUpdate=product.id ;

        //    console.log(product)
         
           document.getElementById("up_id").value=product.id ;
           document.getElementById("up_name").value=product.name ;
           document.getElementById("up_price").value=product.price ;
           document.getElementById("up_quantity").value=product.quantity ;
           
        }

      function updateProduct()
      {
        let product={};

        product.id=document.getElementById("up_id").value ;
        product.name=document.getElementById("up_name").value;
        product.price=Number(document.getElementById("up_price").value) ;
        product.quantity=Number(document.getElementById("up_quantity").value );

        fetch("http://localhost:8000/products?id="+idToUpdate,{
            method:"PUT",
            body:JSON.stringify(product),
            headers:{
            "Content-Type":"application/json"
            }
       })
          .then((response)=>response.json())
          .then((msg)=>{
          
         let productIndex=allproducts.findIndex((product,index)=>{
          
            return Number(product.id)===Number(idToUpdate)

            })
             
            allproducts[productIndex]=product ;

              displayData(allproducts)
              openToast(msg.message)


          })
          .catch((err)=>{
            console.log(err)
          })


      }




        function openToast(msg)
        {
        //   document.getElemenrById("Toast").innerText=msg.message;

          document.getElementById("toast").style.right=msg;
          document.getElementById("toast").style.right="0px";

          setTimeout(()=>{
           
           document.getElementById("toast").style.right="-300px"

          },5000)


        }
        