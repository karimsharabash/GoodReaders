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
  tableBody.innerHTML="";
  userBooks.forEach(element => {
    if((element.status==mode||modeFlag=="all")&&element.book_id!=null)
    tableBody.innerHTML+='<tr><td><a href="/book/singlebook"><img id="'+element.book_id._id+'" width="50px; height="100px;" src="img/'+element.book_id.photoName+'"></a></td><td>'+element.book_id.name+'</td><td>'+element.rating+'</td>'+gettingDropDown(element.status,element.book_id._id)+'</tr>'
  });
}

function changeStatus(menu)
{
  updateBookStatus(menu.id,menu.value); //menu.id holds the book id and menu.value holds the new status
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
  modeFlag="wantToRead"
  displayUserBooks(userBooks,modeFlag)
})

function gettingDropDown(status,bookID)
{
   let selectMenu;
   switch (status)
   {
   case "read":
   selectMenu='<td><select onchange="changeStatus(this);" id="'+ bookID +'" class="form-control" style="width:250px"><option value="reading">Currently reading</option><option value="wantToRead" >Want to read</option><option selected="selected" value="read" >Read</option></select></td>'
   break;
   case "reading":
   selectMenu='<td><select onchange="changeStatus(this);"  id="'+ bookID +'"class="form-control" style="width:250px"><option selected="selected" value="reading">Currently reading</option><option value="wantToRead" >Want to read</option><option  value="read" >Read</option></select></td>'
   break;
   case "wantToRead":
   selectMenu='<td><select onchange="changeStatus(this);"  id="'+ bookID +'" class="form-control" style="width:250px"><option  value="reading">Currently reading</option><option selected="selected" value="wantToRead" >Want to read</option><option  value="read" >Read</option></select></td>'
   break;
   } 
   return selectMenu;
}

tableBody.addEventListener('click',settingTheRequiredBook);

function updateBookStatus(bookId,newStatus)
{ 

    fetch("http://localhost:3000/user/" + currentUserId + "/book/" + bookId,
        {
            "method": "PUT",
            body: JSON.stringify({status : newStatus})
        })
        .then((res) => {
          return  res.text();
        }).then((data) => {
            console.log(data);
        })
}
