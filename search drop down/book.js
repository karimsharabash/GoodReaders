              document.getElementById("myInput").addEventListener("keyup", function(){

                 let anchorElement,listElement,listGoup;
              
              
                 document.getElementById("list").innerHTML=""; 

       

                 let value =  document.getElementById("myInput").value;

                 /*        He will retrieve all the boxes if the input field null  */
                 /*        He will retrieve all the books  that contains the written pattern   */

                  if(value == ""){
                     value = 'books'
                 }
                 else {
                   value = 'book/'+value
                 }
                 
                
                   fetch('http://localhost:8080/'+value,
                 {
                    method:"GET",
                   headers: {Accept: 'application/json'},
                    })
                  
                     .then((res)=>res.json())
                     .then((booksData)=>{
                       console.log(booksData)
                          
                        booksData.forEach((book)=> { 
                    
                        listElement = document.createElement("li");
                         anchorElement = document.createElement("a");  

                         anchorElement.href="#";

                         anchorElement.innerHTML=book.title;  
                         listElement.appendChild(anchorElement);
                        
                         document.getElementById("list").appendChild(listElement);
            
              
                          });     
                       
                     })
                  .catch(err=>console.log(err))        
                }       
              )
              
              
              
              