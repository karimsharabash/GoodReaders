const addingNewCatygoryBtn=document.getElementById("addingNewCatygoryBtn");
const CatygroiesTable=document.getElementById("CatygroiesTable");
const inputCatygoryBoxName=document.getElementById("inputCatygoryBoxName");
const pleaseEnterDatacatygory=document.getElementById("pleaseEnterData")
const popUpCatygory=document.getElementById("modalCat");
const catygroiesBtn=document.getElementById("catygroiesBtn")
const TheCatdiv=document.getElementById("TheCatdiv");
const closeMOdalCat=document.getElementById("closemodal");
const authorBtn=document.getElementById("authorBtn");
const TheAuthordiv=document.getElementById("TheAuthordiv");
const addingNewAuthorBtn=document.getElementById("addingNewAuthorBtn");
const addnewAuthor=document.getElementById("addnewAuthor");
const AuthorTable=document.getElementById("AuthorTable")
const pleaseEnterDataAuthor=document.getElementById("pleaseEnterDataAuthor")
const TheBookdiv=document.getElementById("TheBookdiv");
const addingNewBookBtn=document.getElementById("addingNewBookBtn")
const booksBtn=document.getElementById("booksBtn");
const inputCatTypForTheBookBox=document.getElementById("inputCatTypForTheBookBox")
const addnewbookBtnInTable=document.getElementById("addnewbookBtnInTable")
const inputAuthorTypForTheBookBox=document.getElementById("inputAuthorTypForTheBookBox")
const inputBookBoxName=document.getElementById("inputBookBoxName")
const inputImageForTheBookBox=document.getElementById("inputImageForTheBookBox")
const pleaseEnterDataBook=document.getElementById("pleaseEnterDataBook")
const bookTable=document.getElementById("bookTable");
let theAuthors;    //the  array authores from database 
let theCartygroies ; //the  array catygroies from database 
let theBooks;
let eidtFalg=false;
let idOfrowHolderForEdit; // variable to hold the id of catygory to edit;

function addingNewCatygoryfunction()
{
     let catygoryName=inputCatygoryBoxName.value;  
    if(catygoryName==""&&eidtFalg==false){pleaseEnterDatacatygory.style.display="block"}
    else
       {
         if(eidtFalg==true)
         {
           sendEditeddataToserver(idOfrowHolderForEdit,'category',{"name":catygoryName});
           eidtFalg=false;
         }
          else
         {
           let  newCatygory={name:catygoryName}          
           sendDataToserver(newCatygory,'category');
         }
        displayingAllTable();
        $('#modalCat').modal('hide');
       }
}

function sendDataToserver(newData,path){

    fetch('http://localhost:3000/'+path,
        {
           method:"POST",
           headers: {Accept: 'text/plain'},
           body:JSON.stringify(newData),
        })
        .then(function(res){ 
          return res.text();
        }).then ( data => {
        console.log(data);
    })
}


function displayCatData()
{
    CatygroiesTable.innerHTML="";
    CatygroiesTable.innerHTML='<thead><tr><th scope="col">ID</th><th scope="col">Name</th><th  class="text-center" scope="col">Actions</th></tr></thead><tbody>'
   
    let id=1;
    theCartygroies.forEach(element => {

CatygroiesTable.innerHTML+=' <tr><th scope="row">'+id+'</th><td>'+element.name+'</td><td  class="text-center"><input type="button" id="catygoryEditBtn" class="btn btn-info btn-xs " value="Edit"><input type="button" class="btn btn-danger btn-xs marginToTheLeft"  id="catygorydeleteBtn" value="Delete"></td></tr>'
        id++;
    });

    CatygroiesTable.innerHTML+=' </tbody>'
}

function displayCatygroytable()
{
 
    fetch('http://localhost:3000/category',
    {
       method:"GET",
       headers: {Accept: 'application/json'},
    })
    .then(function(res){ 
      return res.json();
    }).then ( data => {
    console.log(data)
    theCartygroies=data;
    displayCatData()

})   
   
}

function editingAuthor(event)
{
    let rowAuthor=event.target.parentNode.parentNode.rowIndex
    let theActionToTake=event.target.id;
    if(theActionToTake=="AuthordeleteBtn")
    {   //please write if condition here mohamed 
        AuthorTable.deleteRow(rowAuthor)
        senddeletedDataToserver(theAuthors[rowAuthor-1]._id,'author')
    }
    else if(theActionToTake=="AuthorEditBtn")
    {
    eidtFalg=true;
    idOfrowHolderForEdit=theAuthors[rowAuthor-1]._id;
    let inputAuthorBoxName=document.getElementById("inputAuthorBoxName")
    let inputAuthorLastNameBox=document.getElementById("inputAuthorLastNameBox")
    let inputAuthorDateOfBirthBox=document.getElementById("inputAuthorDateOfBirthBox")
    let inputImageForTheAuthorBox=document.getElementById("inputImageForTheAuthorBox") //waiting for karim
    inputAuthorBoxName.value=AuthorTable.rows[rowAuthor].cells[0].innerHTML;
    inputAuthorLastNameBox.value=AuthorTable.rows[rowAuthor].cells[1].innerHTML;
    inputAuthorDateOfBirthBox.value=AuthorTable.rows[rowAuthor].cells[2].innerHTML;
     $('#modalAuthor').modal('show');
    }
    displayingAllTable()
}

function editingCatygory(event)
{
   let rowCat=event.target.parentNode.parentNode.rowIndex
   let nameOfCat=CatygroiesTable.rows[rowCat].cells[1].innerHTML;
   let theActionToTake=event.target.id;
   if(theActionToTake=="catygorydeleteBtn")
   {
       CatygroiesTable.deleteRow(rowCat);
       senddeletedDataToserver(theCartygroies[rowCat-1]._id,'category')
   }
    else if(theActionToTake=="catygoryEditBtn")
   {
    eidtFalg=true;
    idOfrowHolderForEdit=theCartygroies[rowCat-1]._id;
    const inputCatygoryBoxName=document.getElementById("inputCatygoryBoxName");
    inputCatygoryBoxName.value=nameOfCat;
    $('#modalCat').modal('show');
    }
   displayingAllTable();
}

function senddeletedDataToserver(idToDelete,path)
{
    fetch('http://localhost:3000/'+path+'/'+idToDelete,
    {
       method:"DELETE",
       headers: {Accept: 'text/plain'},
    })
    .then(function(res){ 
      return res.text();
    }).then ( data => {
    console.log(data);
    })
}

function sendEditeddataToserver(idToEdit,path,newData)
{
    fetch('http://localhost:3000/'+path+'/'+idToEdit,
    {
       method:"PUT",
       headers: {Accept: 'text/plain'},
       body:JSON.stringify(newData),
    })
    .then(function(res){ 
      return res.text();
    }).then ( data => {
    console.log(data);
})
}

function showingTheCatdiv()
{   
    TheCatdiv.style.display="block"
    TheAuthordiv.style.display="none";
    TheBookdiv.style.display="none"
}
function showingTheBookDiv()
{
    TheBookdiv.style.display="block"
    TheCatdiv.style.display="none"
    TheAuthordiv.style.display="none";
}
function showingTheAuthorDiv()
{
    TheAuthordiv.style.display="block";
    TheBookdiv.style.display="none"
    TheCatdiv.style.display="none"
}
function displayTheCatygroiesIndropDown()
{
    let id=0;
     theCartygroies.forEach(element => {
     inputCatTypForTheBookBox.innerHTML+=' <option value='+id+'>'+element.name+'</option>'
          id++;
    });
    id=0;
    theAuthors.forEach(element => {
        inputAuthorTypForTheBookBox.innerHTML+=' <option value='+id+'>'+element.first_name+'</option>'
        id++;
    });
}
function addingNewAuthor()
{
    let inputAuthorBoxName=document.getElementById("inputAuthorBoxName").value
    let inputAuthorLastNameBox=document.getElementById("inputAuthorLastNameBox").value
    let inputAuthorDateOfBirthBox=document.getElementById("inputAuthorDateOfBirthBox").value
    let inputImageForTheAuthorBox=document.getElementById("inputImageForTheAuthorBox").value
    if((inputAuthorBoxName==""||inputAuthorLastNameBox==""||inputAuthorDateOfBirthBox=="")&&eidtFalg==false)
    {
      pleaseEnterDataAuthor.style.display="block";
    }
    else
    {   
        let  newAuthor=
          {
           first_name:inputAuthorBoxName,
           last_name:inputAuthorLastNameBox,
           dateOfBirth:inputAuthorDateOfBirthBox,
           photoName:"waitingforupload", // waiting for karim
          }
          if(eidtFalg==false)
        {   
           sendDataToserver(newAuthor,'author')
        }
        else 
        {
           sendEditeddataToserver(idOfrowHolderForEdit,'author',newAuthor);
        }
        $('#modalAuthor').modal('hide');
    }
     displayingAllTable();  
}

function displayAuthorData()
{
    
    AuthorTable.innerHTML='<thead><tr><th scope="col">First name</th><th scope="col">Last name</th><th scope="col">Date of birth</th><th scope="col">Image</th><th  class="text-center" scope="col">Actions</th></tr></thead><tbody>';
    theAuthors.forEach(element => {
        AuthorTable.innerHTML+='<tr><td>'+element.first_name+'</td><td>'+element.last_name+'</td><td>'+element.dateOfBirth+'</td><td>'+element.photoName+'</td><td  class="text-center"><input type="button" id="AuthorEditBtn" class="btn btn-info btn-xs " value="Edit"><input type="button" class="btn btn-danger btn-xs marginToTheLeft"  id="AuthordeleteBtn" value="Delete"></td></tr>'
    });
    AuthorTable.innerHTML+='</tbody>'
}
function displayTheAuthorsTable()
{
   fetch('http://localhost:3000/author',
    {
       method:"GET",
       headers: {Accept: 'application/json'},
    })
    .then(function(res){ 
      return res.json();
    }).then ( data => {
        theAuthors=data;
   displayAuthorData()
   displayThebookTable()
})   
}
function addingNewBookFn()
{
   name=inputBookBoxName.value;
   catOfbook=inputCatTypForTheBookBox.value;
   authorOfthebook=inputAuthorTypForTheBookBox.value;
  if(name==""||catOfbook==""||authorOfthebook=="")
  { pleaseEnterDataBook.style.display="block";}
  else
  {     let newBook={
        name:name,
        categoryId:theCartygroies[catOfbook]._id,
        authorId:theAuthors[authorOfthebook]._id,
        photoName:"waiting for karim",
   }
    if(eidtFalg==false)
    {
    sendDataToserver(newBook,'book');
    }else if(eidtFalg==true)
    {
        sendEditeddataToserver(idOfrowHolderForEdit,'book',newBook)
    }
    displayingAllTable();
    $('#modalBook').modal('hide');
   }
   
  
}


function editingOrDeletingBooks(event)
{
 
    currentRow=event.target.parentNode.parentNode.rowIndex;
    let theActionToTake=event.target.id;
    if(theActionToTake=="bookdeleteBtn")
    {    //please write if condition here mohamed 
        bookTable.deleteRow(currentRow);
        idToDelete=theBooks[currentRow-1]._id
        senddeletedDataToserver(idToDelete,'book');
      
    }
    else if(theActionToTake=="bookEditBtn") 
      {
        eidtFalg=true;
        idOfrowHolderForEdit=theBooks[currentRow-1]._id;
        displayTheCatygroiesIndropDown()  
        inputBookBoxName.value=bookTable.rows[currentRow].cells[0].innerHTML;
        $("#modalBook").modal("show")
      }
}


async function displayThebookTable()
{
    await fetch('http://localhost:3000/book',
    {
       method:"GET",
       headers: {Accept: 'application/json'},
    })
    .then(function(res){ 
      return res.json();
   }).then ( data => {
    theBooks=data;
    
    displayBookInTable();})
}
function displayBookInTable()
{
   
   bookTable.innerHTML='<thead><tr><th scope="col">Name</th><th scope="col">Catygorie</th><th scope="col">Author</th><th scope="col">Image</th><th  class="text-center" scope="col">Actions</th></tr></thead><tbody>'

theBooks.forEach(element => {
bookTable.innerHTML+='<tr><td>'+element.name+'</td><td>'+gettingtheNameOfTheCat(element.categoryId)+'</td><td>'+gettingtheNameOfTheAuthor(element.authorId)+'</td><td>'+element.photoName+'</td><td  class="text-center"><input type="button" id="bookEditBtn" class="btn btn-info btn-xs " value="Edit"><input type="button" class="btn btn-danger btn-xs marginToTheLeft"  id="bookdeleteBtn" value="Delete"></td></tr>'
});
}
function gettingtheNameOfTheCat(id)
{    
    let name;
    
    theCartygroies.forEach(element => {
        if(element._id==id)
        {name=element.name;}
    });
    return name;
}
function gettingtheNameOfTheAuthor(id)
{
    let name;
   
    theAuthors.forEach(element => {
        if(element._id==id)
        {name=element.first_name;}
    });
    return name;
}
function displayingAllTable()
{
    displayCatygroytable()
    displayTheAuthorsTable()
    
   // displayThebookTable()
    
   
}
window.addEventListener('load',displayingAllTable)
addingNewCatygoryBtn.addEventListener('click',addingNewCatygoryfunction);
CatygroiesTable.addEventListener('click',editingCatygory)
catygroiesBtn.addEventListener('click',showingTheCatdiv);
booksBtn.addEventListener('click',showingTheBookDiv)
authorBtn.addEventListener('click',showingTheAuthorDiv)
closeMOdalCat.addEventListener('click',()=>{eidtFalg=false;})
addingNewAuthorBtn.addEventListener('click',addingNewAuthor)
addnewbookBtnInTable.addEventListener('click',()=>{
    eidtFalg=false;
    displayTheCatygroiesIndropDown()})
AuthorTable.addEventListener('click',editingAuthor)
addnewAuthor.addEventListener('click',function(){eidtFalg=false})
addingNewBookBtn.addEventListener('click',addingNewBookFn)
bookTable.addEventListener('click',editingOrDeletingBooks)
$("#modalCat").on("hidden.bs.modal", function () {
    eidtFalg=false;
    inputCatygoryBoxName.value="";
  });
  $("#modalBook").on("hidden.bs.modal", function () {
    eidtFalg=false;
   
  });
$("#modalAuthor").on("hidden.bs.modal", function () {
    eidtFalg=false;
    let inputAuthorBoxName=document.getElementById("inputAuthorBoxName")
    let inputAuthorLastNameBox=document.getElementById("inputAuthorLastNameBox")
    let inputAuthorDateOfBirthBox=document.getElementById("inputAuthorDateOfBirthBox")
    let inputImageForTheAuthorBox=document.getElementById("inputImageForTheAuthorBox")
    inputAuthorBoxName.value="";
    inputAuthorLastNameBox.value="";
    inputAuthorDateOfBirthBox.value="";
    inputImageForTheAuthorBox="";
    pleaseEnterDataAuthor.style.display="none";
});

  

 