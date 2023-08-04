 

 let products= [
   //  {
   //  id:1,
   //  name:"Iphone",
   //  category:"electronics",
   //  price:78000,
   //  seller:"Viplav Enterprises",
   //  company:"apple",
   //  },
   //  {
   //  id:2,
   //  name:"pressure cooker",
   //  category:"Appliancess",
   //  price:2300,
   //  seller:"Ruturaj Enterprises",
   //  company:"Prestige",

   //  },
   //  {
   //  id:3,
   //  name:"smartwatch",
   //  category:"wearables",
   //  price:23000,
   //  seller:"Ujjwal Enrterprises",
   //  company:"apple",
   //  },
   //  {
   //  id:4,
   //  name:"samsung galaxy s 10 ",
   //  category:"Electronics",
   //  price:61000,
   //  seller:"Viplav Enterprises",
   //  company:"samsung",

   //  },
   //  {
   //  id:5,
   //  name:"samsung earphone",
   //  category:"wearables",
   //  price:3000,
   //  seller:"Ujjwal Enterprises",
   //  company:"samsung",
   //  },
   //  {
   //    id:6,
   //    name:"smartwatch",
   //    category:"dumy",
   //    price:23000,
   //    seller:"apple",
   //    company:"apple",

   //  }

     
   ]
      if (localStorage.getItem("products")!==null)
      {
         products=JSON.parse(localStorage.getItem("products"))
      }
      else
      {
         localStorage.setItem("products",JSON.stringify(products));
      }




      //  function to display data of given  product array

    function display(arr){

      document.getElementById("data").innerHTML="";

       arr.forEach(function (product,index) {
      
      let tr= document.createElement("tr");

      let numberTd= document.createElement("td");
      numberTd.append (index+1);
      tr.appendChild(numberTd);

      let nameTD= document.createElement("td");
      nameTD.append (product.name);
      tr.appendChild(nameTD);

      let categoryTD= document.createElement("td");
      categoryTD .append(product.category);
      tr.appendChild(categoryTD);

      let priceTD= document.createElement("td");
      priceTD.append(product.price);
      tr.appendChild(priceTD);

      let imageTD=document.createElement("td");
      let imgEle=document.createElement("img");
      imgEle.src=product.image;
      imgEle.classList.add("pimg")
      imageTD.appendChild(imgEle)
      tr.appendChild(imageTD);

      let sellerTD= document.createElement("td");
      sellerTD.append(product.seller);
      tr.appendChild(sellerTD);

      let companyTD= document.createElement("td")
      companyTD .append(product.company);
      tr.appendChild(companyTD);

      let actionsTd=document.createElement("td");
      actionsTd.classList.add("actions");
      
      let viewIcon=document.createElement("i");
      viewIcon.classList.add("fa-solid");
      viewIcon.classList.add("fa-eye");
      viewIcon.addEventListener("click",function(){
         viewProduct(product.id)
      })
       actionsTd.append(viewIcon);

      let editIcon=document.createElement("i");
      editIcon.classList.add("fa-solid");
      editIcon.classList.add("fa-pen-to-square");
      editIcon.addEventListener("click",function(){
         setupUpdateProduct(product.id)
      })
      
      actionsTd.append(editIcon);

      let deleteIcon=document.createElement("i")
      deleteIcon.classList.add("fa-solid");
      deleteIcon.classList.add("fa-trash-can");
      actionsTd.append(deleteIcon);

      deleteIcon.addEventListener("click",function(){
         deleteProduct(product.id)
      })

      tr.appendChild(actionsTd);

      document.getElementById("data").appendChild(tr);

       })
   
  }
   //   display(products)
   //     let productName;

   //     function readValue(event){
   //    // console.log("hello")
     
   //    // console.log(event.target.value);
   //    productName=event.target.value;
   // }
   //    function filter(){
   //       let filteredProducts= products.filter(function(product,index){
   //          return product.name===productName
          
   //       })
   //              // console.log(filteredProducts)

   //       display(filteredProducts);
   //    }


 
      
  display(products)
         //   filters object to maintain the state of filters perform

        let filters={
      name:null,
      category:null,
      priceRange:null,
   }

   // function to read value of filter field

function readValue(event,property)
{
   if(event.target.value!=="")
   {
      filters[property]=event.target.value; 
   }
   else
   {
      filters[property]=null;
   }
   


//   console.log(event.target.value,property);
console.log(filters);

}
   //  function to apply filters

 function filter()
    {
     let filteredProducts=products;
     
        if(filters.name!==null)
       {
          filteredProducts=filteredProducts.filter(function(product,index){
           return filters.name.toUpperCase()===product.name.toUpperCase();
           })
       }
      
         if(filters.category!==null)
         {
            filteredProducts=filteredProducts.filter(function(product,index){
               return filters.category.toUpperCase()===product.category.toUpperCase();
            })
         }

           if(filters.priceRange!==null)
           {
               let price=filters.priceRange.split("-");
               filteredProducts=filteredProducts.filter(function(product,index){
                  return product.price>=Number(price[0])&&product.price<=Number(price[1]);
               })
           }
            // display(filteredProducts) ;
            if(filteredProducts.length!==0)
            {
               document.getElementById("message").style.display="none";
               display(filteredProducts);
            }
            else
            {
               document.getElementById("data").innerHTML=""
               document.getElementById("message").style.display="block"
            }
        }

   // function to togglModal

   //  function toggleModal(open)
   //  {

   //    if(open===true)
   //    {
   //       document.getElementById("modal").style.display="flex";
   //     }
   //    else
   //    {
   //       document.getElementById("modal").style.display="none"
   //    }
   // }
    function toggleModal(open,modalId)
    {
      if(open===true)
      {
         document.getElementById(modalId).style.display="flex";
      }
      else
      {
         document.getElementById(modalId).style.display="none"
    }
    }

   //   function to close modal by clicking on the background area

   //  function closeModal(event,textid)
   //  {
   //    if(event.target.id===textid)
   //    {
   //       toggleModal(false,event.target.id);
   //    }
   //  }
   //   function to view data

   function viewProduct(id)
   {
      // console.log("hello");
      // console.log(id);
      let product=products.find(function(product,index){
         return product.id===id;
      })
      console.log(product);
      document.getElementById("pro_img").src=product.image;
      document.getElementById("pro_name").src=product.name;

      toggleModal(true,"view_modal");
   }

   // create a function to setup data for update
         
         let productToUpdate=null;
      function setupUpdateProduct(id)
      {
          productToUpdate=products.find(function(product,index){
            return product.id===id
         })
         document.getElementById("product_name_up").value=productToUpdate.name;
         document.getElementById("product_category_up").value=productToUpdate.category;
         document.getElementById("product_price_up").value=productToUpdate.price;
         document.getElementById("product_seller_up").value=productToUpdate.seller;
         document.getElementById("product_company_up").value=productToUpdate.company;
         document.getElementById("product_image_up").value=productToUpdate.image;

         toggleModal(true,"update_modal")
      }
   
   //   function to update the product
       
       
      function updateProduct()
      {
         productToUpdate.name=document.getElementById("product_name_up").value;
         productToUpdate.category=document.getElementById("product_category_up").value;
         productToUpdate.price=Number(document.getElementById("product_price_up").value);
         productToUpdate.seller=document.getElementById("product_seller_up").value;
         productToUpdate.company=document,getElementById("product_company_up").value;
         productToUpdate.image=document.getElementById("product_image_up").value;
        
      
        display(products);

       toggleModal(false,"update_modal");
       localStorage.setItem("products",JSON.stringify(products));

      }

   // function to add a new product

   function addProduct()
   {
      let product={};

      

      if(products.length!==0)
    {   
       let lastId=products[products.length-1].id
       product.id = ++lastId;
       console.log(product.id);
    }
    else
    {
      product.id=1;
    }

     product.name=document.getElementById("product_name").value;
     product.category=document.getElementById("product_category").value;
     product.price=Number(document.getElementById("product_price").value);
     product.seller=document.getElementById("product_seller").value;
     product.company=document.getElementById("product_company").value;
     product.image=document.getElementById("product_image").value;
   //   
   //   console.log(product);
       products.push(product);
      //  console.log(products);
      display(products);
      toggleModal(false);
      localStorage.setItem("products",JSON.stringify(products));
   }
   // functuon to delete a product

   function deleteProduct(id)
   {
      let productIndex= products.findIndex(function(product,index){
         return product.id===id
      })
      console.log(productIndex)
      products.splice(productIndex,1)
      localStorage.setItem("products",JSON.stringify(products));
      display(products);
   }
