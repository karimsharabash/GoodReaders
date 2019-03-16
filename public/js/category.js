// Edited by ayaAltayeb

//Selecting the categories tab in the nav bar  and keeping track of  every click the user gives 
// to it, then 
              //we ask the program to fetch the categories data from the database using fetch API

const categoriesMenu= document.getElementById("categoriesMenu");

categoriesMenu.addEventListener("click" , function (){
   let anchorElement,paragraphElement,listGoup,group_number=0,element_number_in_the_group=0,separator_p;

   listGoup= document.createElement("div");
   document.getElementById("categories").innerHTML=""; 
   listGoup.setAttribute("class","col-md-3"); 
   listGoup.innerHTML="";
   
        fetch('category.json')
  //    fetch('http://localhost:3000/category',
  //  {
  //     method:"GET",
  //     headers: {Accept: 'application/json'},
  //     })
       .then(res=>res.json())
       .then((CategoriesData)=>{
       
          CategoriesData.forEach((category)=> { 
      
           if(element_number_in_the_group == 3){
            document.getElementById('categories').appendChild(listGoup);
                       //for th new group 
            listGoup= document.createElement("div");
            listGoup.setAttribute("class","col-md-3"); 
            element_number_in_the_group = 0;             
           }
          paragraphElement = document.createElement("p");
           anchorElement = document.createElement("a");        
           anchorElement.href="../adminLoginPage.html";
           anchorElement.innerHTML=category.categoryName;   // change to name 
           paragraphElement.appendChild(anchorElement);
           listGoup.appendChild(paragraphElement);
           listGoup.innerHTML +='<p role="separator" class="divider"></p>'; 
           element_number_in_the_group++;
           console.log("e:",element_number_in_the_group);

            });     
         
       }) 
    .catch(err=>console.log(err))        
  }       
)



