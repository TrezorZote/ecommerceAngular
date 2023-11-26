
  
window.onload=function(){


    const  mobileBtn = document.getElementById('menuCta');
     const navBtn = document.querySelector('nav');
     const  mobileBtnExit = document.getElementById('exitCta');
   
      mobileBtn.addEventListener('click', menuBar);
      mobileBtnExit.addEventListener('click', menuExit );

      
   function menuBar(){
       navBtn.classList.add('open-nav')
   }
   function menuExit(){
       navBtn.classList.remove('open-nav')
   }

   
const imageShow= document.getElementById('file');
const imageShow2= document.getElementById('file2');
const imageShow3= document.getElementById('file3');
const imageShow4= document.getElementById('file4');
const imageShow5= document.getElementById('file5');
const actualImage= document.getElementById('displayImage');
const actualImage2= document.getElementById('displayImage2');
const actualImage3= document.getElementById('displayImage3');
const actualImage4= document.getElementById('displayImage4');
const actualImage5= document.getElementById('displayImage5');
imageShow.addEventListener("change" , select);
imageShow2.addEventListener("change" , selectExtra);
imageShow3.addEventListener("change" , selectExtra2);
imageShow4.addEventListener("change" , selectExtra3);
imageShow5.addEventListener("change" , selectExtra4);

function select(){
    const file = this.files[0];
     if(file){
         const reader= new FileReader(); reader.addEventListener("load", function(){
            actualImage.setAttribute("src", this.result);
                    });
                    reader.readAsDataURL(file);

                }
               
           }
           
           function selectExtra(){ 
            const file2= this.files[0];
        if(file2){
            const reader2= new FileReader(); reader2.addEventListener("load", function(){
               actualImage2.setAttribute("src", this.result);
                       });
                       reader2.readAsDataURL(file2);
   
                   }
                  
                }
                function selectExtra2(){ 
                    const file3= this.files[0];
                if(file3){
                    const reader3= new FileReader(); reader3.addEventListener("load", function(){
                       actualImage3.setAttribute("src", this.result);
                               });
                               reader3.readAsDataURL(file3);
           
                           }
                          
                        }
                
                        function selectExtra3(){ 
                            const file4= this.files[0];
                        if(file4){
                            const reader4= new FileReader(); reader4.addEventListener("load", function(){
                               actualImage4.setAttribute("src", this.result);
                                       });
                                       reader4.readAsDataURL(file4);
                   
                                   }
                                  
                                }

                                function selectExtra4(){ 
                                    const file5= this.files[0];
                                if(file5){
                                    const reader5= new FileReader(); reader5.addEventListener("load", function(){
                                       actualImage5.setAttribute("src", this.result);
                                               });
                                               reader5.readAsDataURL(file5);
                           
                                        }
                        
        
   }

  
}
 

    