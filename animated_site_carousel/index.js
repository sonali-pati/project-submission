
   let currentSlide=1;
   let totalSlide=4;

   function next(click){
    document.getElementById("slider").style.transition=".7s";
    currentSlide++;
    openSlide(currentSlide);

        //  aadhi totalSlide chya jagevar 4 lihile hote,jar future madhe slideno vadhale tar

    if(currentSlide>totalSlide)
    {
        setTimeout(function(){
        document.getElementById("slider").style.transition="0s";
        currentSlide=1
        openSlide(1);
        },700)
    }

       if(click===true)
     {

      clearInterval(slide);
      slide=setInterval(function(){
         next(false)
      },3000)
      
     }

   }

     let slide=setInterval(function(){
        
          next(false)

     },3000)
    



     function prev(){
        document.getElementById("slider").style.transition=".7s";
        currentSlide--;
        openSlide(currentSlide);

        if(currentSlide<1)
        {
            setTimeout(() => {
              document.getElementById("slider").style.transition="0s";
              currentSlide=4;
              openSlide(4)
            }, 700);
        }
     }

     clearInterval(slide);
     slide=setInterval(function(){
        
         next(false)

     },3000)
     

   function openSlide(slideNo){

    let margin=(slideNo)*100;
    document.getElementById("slider").style.marginLeft= -margin+"%";

    let indicators=document.getElementByClassName("indicator");

    for(let i=0;i<indicators.length;i++)
    {
        if((i+1)===slideNo)
        {
          indicators[i].classList.add("activeindicator")
        }
        else
        {
          indicators[i].classList.remove("activeindicator")
        }
    }
   }

     
   
   function indicate(slideNo)
   {

    if(slideNo>=1 && slideNo<=4)
    {
     currentSlide=slideNo;
     
     document.getElementById("slider").style.transition=".7s";
     openSlide(currentSlide);
    }

   }
     clearInterval(slide);
     slide=setInterval(function(){
     
       next(false);

     },3000)


    //   events
    document.getElementById("next").addEventListener("click",function(){

           next(true);

    });

    document.getElementById("prev").addEventListener("click",prev);
