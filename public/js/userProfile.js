$('#myTable').DataTable();

let modeFlag="all";
let userBooks;
const BookTable=document.getElementById("myTable")
const allBooks=document.getElementById("allBooks")
const readBook=document.getElementById("readBook")
const currntlyRead=document.getElementById("currntlyRead")
const wishToRead=document.getElementById("wishToRead")
const tableBody=document.getElementById("tableBody")
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
      console.log(data)
      currentUserId=data._id;
      userBooks=data.books
      displayUserBooks(userBooks)

    })   
}




function displayUserBooks(userBooks,mode)
{
  tableBody.innerHTML=""

  userBooks.forEach(element => {
    if(element.status==mode||modeFlag=="all")
  //   {
  //   fetch('http://localhost:3000/book/'+element.book_id,
  // {
  //    method:"GET",
  // })
  // .then(function(res){ 
  //  return res.json();
  // }).then((res)=>{
    
    tableBody.innerHTML+='<tr><td><img width="50px; height="100px;" src="img/'+element.book_id.photoName+'"></td><td>'+element.book_id.name+'</td><td>'+element.rating+'</td></tr>'
  // })
  //   }

  });
 
}




window.addEventListener('load',getCurrentUser)

allBooks.addEventListener('click',()=>{
  modeFlag="all"
  displayUserBooks(userBooks,modeFlag)
})

readBook.addEventListener('click',()=>{
  modeFlag="read"
  displayUserBooks(userBooks,modeFlag)
})

currntlyRead.addEventListener('click',()=>{
  modeFlag="reading"
  displayUserBooks(userBooks,modeFlag)
})



wishToRead.addEventListener('click',()=>{
  wishToRead="wantToRead"
  displayUserBooks(userBooks,modeFlag)
})