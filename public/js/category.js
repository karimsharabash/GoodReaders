const categoriesMenu= document.getElementById("categoriesMenu");
let catData;

categoriesMenu.addEventListener("click" , function (){
   let anchorElement,paragraphElement,listGoup;
   document.getElementById("categories").innerHTML=""; 
   listGoup= document.createElement("div");
   listGoup.setAttribute("class","col-md-3"); 
   listGoup.innerHTML="";
  fetch('http://localhost:3000/category',
  {
    method:"GET",
    headers: {Accept: 'application/json'},
  })
  .then(res=>res.json())
  .then((CategoriesData)=>{
    catData=CategoriesData;
  CategoriesData.forEach((category)=> { 
  
                       //for th new group 
            listGoup= document.createElement("div");
            listGoup.setAttribute("class","col-md-3"); 
            element_number_in_the_group = 0;             
          
            paragraphElement = document.createElement("p");
            anchorElement = document.createElement("a");        
            anchorElement.href="book/category/"+category._id;
            anchorElement.id = category._id;
            anchorElement.innerHTML=category.name;   // change to name 
             console.log(anchorElement)
            paragraphElement.appendChild(anchorElement);
            listGoup.appendChild(paragraphElement);
            listGoup.innerHTML +='<p role="separator" class="divider"></p>'; 
            document.getElementById('categories').appendChild(listGoup);
           });
           console.log(document.getElementById('categories'))
            console.log(listGoup)      
         
       }) 
    .catch(err=>console.log(err))        
  }       
)



