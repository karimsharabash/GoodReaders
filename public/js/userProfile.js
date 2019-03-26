//import { Session } from "inspector";


$('#myTable').DataTable();

const BookTable=document.getElementById("myTable")

let theUserBooks;

// let currentUserId;
let userId=document.cookie.userId;
console.log(userId)

function getCurrentUser()
{
    fetch('http://localhost:3000/user/nav/defineUser',
    {
       method:"GET",
      //  headers: {Accept: 'application/json'},
    })
    .then(function(res){ 
      return res.json();
    }).then ( data => {
      currentUserId=data._id;
      getCurrentUserBooks()
    })   
}

function getCurrentUserBooks()
{
  fetch('http://localhost:3000/user/'+currentUserId,
  {
     method:"GET",
      headers: {Accept: 'application/json'},
  })
  .then(function(res){ 
    return res.json();
  }).then ( data => {
    userdata=data;
    //console.log(userdata)
  })   
}


function displayUserBooks()
{
   

}




window.addEventListener('load',getCurrentUser)