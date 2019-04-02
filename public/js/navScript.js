const userImg=document.getElementById("userImg");
const NavForVisitor=document.getElementById("NavForVisitor");
const NavForUser=document.getElementById("NavForUser");
const userProfBtn=document.getElementById("userProfBtn");
const logoutBtn =document.getElementById("logoutBtn");
let   currentUserId;
let currentUserName;

window.addEventListener('load',defineTheuser);

function defineTheuser(){
fetch("http://localhost:3000/user/nav/defineUser" ,
    {
       method:"GET",
       headers: {Accept: 'application/json'},
    })
    .then(function(res){ 
      return res.json();
    }).then ( data => {
       if(data.res=="no user found")
       {
        NavForVisitor.style.display="block"
        NavForUser.style.display="none"
       }
       else
       {
        NavForVisitor.style.display="none"
        NavForUser.style.display="block"
        userImg.src ="img/"+data.imageName;
        currentUserId=data._id
        currentUserName  = data.username;
       
       }
})   
}


logoutBtn.addEventListener("click" , logOut)

 function logOut()
{
   fetch("http://localhost:3000/user/logout",
   {
      "method":"GET"
   })
   .then( (res)=>
   {
    console.log("session ended")
     return res.text()
      
   }).then((res)=>{
     window.location.href=res;
   })
   NavForVisitor.style.display="block"
   NavForUser.style.display="none"
}



let books = [];

document.getElementById("searchField").addEventListener("keyup", function () {

    let bookToSearch = document.getElementById("searchField").value;
    if (bookToSearch != "") {

        if (books.length > 0) {
            displayBooksForSearch(bookToSearch);
        } else {
            fetch('http://localhost:3000/book/allBooks',
                {
                    method: "GET",
                    headers: { Accept: 'application/json' },
                })
                .then(function (res) {
                    return res.json();
                }).then(
                    allBooks => {
                        books = allBooks;
                           
                                displayBooksForSearch(bookToSearch);
                    })

        }
    }
})

function displayBooksForSearch(keyword) {

    let anchorElement, listElement, listGoup;
    document.getElementById("list").innerHTML = "";

    books.forEach((book) => {
        if (book.name.toUpperCase().includes(keyword.toUpperCase())) {
          
            listElement = document.createElement("li");
            anchorElement = document.createElement("a");

            anchorElement.href = "#";

            anchorElement.innerHTML = book.name;
            listElement.appendChild(anchorElement);

            document.getElementById("list").appendChild(listElement);

        }
    })
}


function displayBooksForSearch(keyword) {

   let anchorElement, listElement, listGoup;
   document.getElementById("list").innerHTML = "";

   books.forEach((book) => {
       if (book.name.toUpperCase().includes(keyword.toUpperCase())) {
           console.log(book.name)
           listElement = document.createElement("li");
           anchorElement = document.createElement("a");
           anchorElement.setAttribute("id",book._id);
           anchorElement.href = "/book/singlebook";
           anchorElement.innerHTML = book.name;
           listElement.appendChild(anchorElement);
           document.getElementById("list").appendChild(listElement);
       }
   })
}


function settingTheRequiredBook(event)
{
  
  fetch('http://localhost:3000/book/settingTheRequiredBook/'+event.target.id,
    {
       method:"GET",
       headers: {Accept: 'application/json'},
    })
    .then(function(res){ 
      
})
}


document.getElementById("list").addEventListener("click",settingTheRequiredBook)