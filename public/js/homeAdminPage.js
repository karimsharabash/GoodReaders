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
const inputAuthorBioGraphyBox=document.getElementById("inputAuthorBioGraphyBox")
const pleaseEnterDataAuthor=document.getElementById("pleaseEnterDataAuthor")
const TheBookdiv=document.getElementById("TheBookdiv");
const addingNewBookBtn=document.getElementById("addingNewBookBtn")
const booksBtn=document.getElementById("booksBtn");
const inputCatTypForTheBookBox=document.getElementById("inputCatTypForTheBookBox")
const addnewbookBtnInTable=document.getElementById("addnewbookBtnInTable")
const inputAuthorTypForTheBookBox=document.getElementById("inputAuthorTypForTheBookBox")
const inputBookBoxName=document.getElementById("inputBookBoxName")
const inputBookBoxDescription=document.getElementById("inputBookBoxDescription")
const inputImageForTheBookBox=document.getElementById("inputImageForTheBookBox")
const pleaseEnterDataBook=document.getElementById("pleaseEnterDataBook")
const bookTable=document.getElementById("bookTable");
const modalCannotBeDeleted=document.getElementById("modalCannotBeDeleted")
const uploadBtnBookImage=document.getElementById("uploadBtnBookImage")
const inputImageForTheAuthorBox=document.getElementById("inputImageForTheAuthorBox")
const inputAuthorBoxName=document.getElementById("inputAuthorBoxName")
const inputAuthorLastNameBox=document.getElementById("inputAuthorLastNameBox")
const inputAuthorDateOfBirthBox=document.getElementById("inputAuthorDateOfBirthBox")
const uploadAuthorImageBtn=document.getElementById("uploadAuthorImageBtn")

let theAuthors;    //the  array authores from database 
let theCartygroies ; //the  array catygroies from database 
let theBooks;
let eidtFalg=false;
let idOfrowHolderForEdit; // variable to hold the id of catygory to edit;
let canBeDeleted=true;
let imgName;
let imgUploaded=false;
let currentImage;
// Catygory Functions
function addingNewCatygoryfunction()
{
     let catygoryName=inputCatygoryBoxName.value;  
    if(catygoryName==""&&eidtFalg==false){pleaseEnterDatacatygory.style.display="block"}
    else
    { if(eidtFalg==true)
       {
         sendEditeddataToserver(idOfrowHolderForEdit,'category',{"name":catygoryName});
         eidtFalg=false;
       }
      else
        {
         let newCatygory={name:catygoryName}          
          sendDataToserver(newCatygory,'category');
        }
        displayingAllTable();
        $('#modalCat').modal('hide');
       }
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
function canBeDeletedOrNot(id)
{
  theBooks.forEach(element => {
   if(element.authorId==id)
    {canBeDeleted=false;}
   if(element.categoryId==id)
    {canBeDeleted=false;}
 });
}
function editingCatygory(event)
{
   let rowCat=event.target.parentNode.parentNode.rowIndex
   let nameOfCat=CatygroiesTable.rows[rowCat].cells[1].innerHTML;
   let theActionToTake=event.target.id;
   if(theActionToTake=="catygorydeleteBtn")
   {
    canBeDeletedOrNot(theCartygroies[rowCat-1]._id)
    if(canBeDeleted==true)
    {
     CatygroiesTable.deleteRow(rowCat);
     senddeletedDataToserver(theCartygroies[rowCat-1]._id,'category')
    }
    else
    {$("#modalCannotBeDeleted").modal("show")}
    canBeDeleted=true;
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
//Author Functions 
function addingNewAuthor()
{
    let Name=inputAuthorBoxName.value
    let LastNameBox=inputAuthorLastNameBox.value
    let DateOfBirthBox=inputAuthorDateOfBirthBox.value
    let authorBio=inputAuthorBioGraphyBox.value;
    if((Name==""||LastNameBox==""||DateOfBirthBox==""||imgUploaded==false)&&eidtFalg==false)
    {
      pleaseEnterDataAuthor.style.display="block";
    }
    else if(eidtFalg==false)
    {   
        let  newAuthor=
          {
           first_name:Name,
           last_name:LastNameBox,
           dateOfBirth:DateOfBirthBox,
           photoName:imgName, 
           biography:authorBio,
          }
          sendDataToserver(newAuthor,'author')
          $('#modalAuthor').modal('hide'); 
    }
    else if(eidtFalg==true)
    {
       let img;
       if(imgUploaded==true)
       {img=imgName}
       else if(imgUploaded==false){img=currentImage}

        let  newAuthor=
          {
           first_name:Name,
           last_name:LastNameBox,
           dateOfBirth:DateOfBirthBox,
           photoName:img, 
           biography:authorBio,
          }   
        sendEditeddataToserver(idOfrowHolderForEdit,'author',newAuthor);
        $('#modalAuthor').modal('hide');
    }
    imgUploaded=false;
    displayingAllTable(); 
}
function editingAuthor(event)
{
 let rowAuthor=event.target.parentNode.parentNode.rowIndex
 let theActionToTake=event.target.id;
 if(theActionToTake=="AuthordeleteBtn")
 {  canBeDeletedOrNot(theAuthors[rowAuthor-1]._id)
    if(canBeDeleted==true)
    { 
     AuthorTable.deleteRow(rowAuthor)
     senddeletedDataToserver(theAuthors[rowAuthor-1]._id,'author')
       
    }
    else
    {$("#modalCannotBeDeleted").modal("show")}
        canBeDeleted=true;
 }
 else if(theActionToTake=="AuthorEditBtn")
    {
    eidtFalg=true;
    idOfrowHolderForEdit=theAuthors[rowAuthor-1]._id;
    inputAuthorBoxName.value=AuthorTable.rows[rowAuthor].cells[0].innerHTML;
    inputAuthorLastNameBox.value=AuthorTable.rows[rowAuthor].cells[1].innerHTML;
    inputAuthorBioGraphyBox.value=AuthorTable.rows[rowAuthor].cells[2].innerHTML;
    let mydate=new Date(AuthorTable.rows[rowAuthor].cells[3].innerHTML);
    mydate=mydate.toISOString().slice(0,10)
    inputAuthorDateOfBirthBox.value=mydate;
    currentImage=AuthorTable.rows[rowAuthor].cells[4].id
     $('#modalAuthor').modal('show');
    }
    displayingAllTable()
}
function displayTheAuthorsTable()
{
   fetch('http://localhost:3000/author/Author',
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
function displayAuthorData()
{
    
    AuthorTable.innerHTML='<thead><tr><th scope="col">First name</th><th scope="col">Last name</th><th scope="col">Biography</th><th scope="col">Date of birth</th><th scope="col">Image</th><th  class="text-center" scope="col">Actions</th></tr></thead><tbody>';
    theAuthors.forEach(element => {
        AuthorTable.innerHTML+='<tr><td>'+element.first_name+'</td><td>'+element.last_name+'</td><td>'+element.biography+'</td><td>'+element.dateOfBirth+'</td><td id="'+element.photoName+'"><img width="50px;" hieght="50px;" src="img/'+element.photoName+'"></td><td  class="text-center"><input type="button" id="AuthorEditBtn" class="btn btn-info btn-xs " value="Edit"><input type="button" class="btn btn-danger btn-xs marginToTheLeft"  id="AuthordeleteBtn" value="Delete"></td></tr>'
    });
    AuthorTable.innerHTML+='</tbody>'
}
//book functions 
function addingNewBookFn()
{
   name=inputBookBoxName.value;
   catOfbook=inputCatTypForTheBookBox.value;
   authorOfthebook=inputAuthorTypForTheBookBox.value;
   bookDescrib=inputBookBoxDescription.value;
  if((name==""||catOfbook==""||authorOfthebook==""||imgUploaded==false)&&eidtFalg==false)
  { pleaseEnterDataBook.style.display="block";}
  else if(eidtFalg==false)
  {     let newBook={
        name:name,
        categoryId:theCartygroies[catOfbook]._id,
        authorId:theAuthors[authorOfthebook]._id,
        photoName:imgName,
        description:bookDescrib,
    }
       sendDataToserver(newBook,'book');
       $('#modalBook').modal('hide');
  }
  else if(eidtFalg==true)
   {
      let img;
      if(imgUploaded==true)
      {img=imgName}
      else if(imgUploaded==false){img=currentImage}   
    
       let newBook={
        name:name,
        categoryId:theCartygroies[catOfbook]._id,
        authorId:theAuthors[authorOfthebook]._id,
        photoName:img,
        description:bookDescrib,
       }
        sendEditeddataToserver(idOfrowHolderForEdit,'book',newBook)
        $('#modalBook').modal('hide');
   }
displayingAllTable();
}
  
function editingOrDeletingBooks(event)
{
 currentRow=event.target.parentNode.parentNode.rowIndex;
 let theActionToTake=event.target.id;
    if(theActionToTake=="bookdeleteBtn")
    {   
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
        inputBookBoxDescription.value=bookTable.rows[currentRow].cells[4].innerHTML;
        currentImage=bookTable.rows[currentRow].cells[3].id;
        console.log(currentRow)
        inputCatTypForTheBookBox.value=currentRow-1;
        inputAuthorTypForTheBookBox.value=currentRow-1;
        $("#modalBook").modal("show")
    }
}
function displayThebookTable()
{
    fetch('http://localhost:3000/book/books',
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
bookTable.innerHTML='<thead><tr><th scope="col">Name</th><th scope="col">Catygorie</th><th scope="col">Author</th><th scope="col">Image</th><th scope="col">Description</th><th  class="text-center" scope="col">Actions</th></tr></thead><tbody>'
theBooks.forEach(element => {
bookTable.innerHTML+='<tr><td>'+element.name+'</td><td>'+gettingtheNameOfTheCat(element.categoryId)+'</td><td>'+gettingtheNameOfTheAuthor(element.authorId)+'</td><td id="'+element.photoName+'"><img width="50px;" hieght="50px;" src="img/'+element.photoName+'"></td><td>'+element.description+'</td><td  class="text-center"><input type="button" id="bookEditBtn" class="btn btn-info btn-xs " value="Edit"><input type="button" class="btn btn-danger btn-xs marginToTheLeft"  id="bookdeleteBtn" value="Delete"></td></tr>'
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
function displayTheCatygroiesIndropDown()
{
    inputCatTypForTheBookBox.innerHTML="";
    let id=0;
     theCartygroies.forEach(element => {
     inputCatTypForTheBookBox.innerHTML+=' <option value='+id+'>'+element.name+'</option>'
          id++;
    });
    inputAuthorTypForTheBookBox.innerHTML="";
    id=0;
    theAuthors.forEach(element => {
        inputAuthorTypForTheBookBox.innerHTML+=' <option value='+id+'>'+element.first_name+'</option>'
        id++;
    });
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
    displayTheCatygroiesIndropDown() 
})
AuthorTable.addEventListener('click',editingAuthor)
addnewAuthor.addEventListener('click',function(){eidtFalg=false})
addingNewBookBtn.addEventListener('click',addingNewBookFn)
bookTable.addEventListener('click',editingOrDeletingBooks)
$("#modalCat").on("hidden.bs.modal", function () {
    eidtFalg=false;
    inputCatygoryBoxName.value="";
    pleaseEnterDatacatygory.style.display="none"
  });
$("#modalBook").on("hidden.bs.modal", function () {
    eidtFalg=false;
    imgUploaded=false;
    inputBookBoxDescription.value="";
    inputBookBoxName.value="";
    inputImageForTheBookBox.value="";
    pleaseEnterDataBook.style.display="none";
    
  });
$("#modalAuthor").on("hidden.bs.modal", function () {
    eidtFalg=false;
    imgUploaded=false;
    inputAuthorBioGraphyBox.value=""
    inputAuthorBoxName.value="";
    inputAuthorLastNameBox.value="";
    inputAuthorDateOfBirthBox.value="";
    inputImageForTheAuthorBox.value="";
    pleaseEnterDataAuthor.style.display="none";
});
uploadAuthorImageBtn.addEventListener("click" , (event)=>
{
  
  let imgPathArr = inputImageForTheAuthorBox.value.split("\\");
   imgName = imgPathArr[imgPathArr.length - 1];

  let formData = new FormData();
  formData.append('photo', inputImageForTheAuthorBox.files[0] ,imgName);
    
    fetch("http://localhost:3000/user/image",
    {
        method: 'POST',
        body:formData
    }).then (res =>res.text() )
    .then( response => {
        if(response == "done")
        {
            uploadAuthorImageBtn.style.backgroundColor="green";
            uploadAuthorImageBtn.style.color="black";
            imgUploaded=true;
        } else {
            uploadAuthorImageBtn.style.backgroundColor="red";
            uploadAuthorImageBtn.style.color="black";
        }
    })
})

uploadBtnBookImage.addEventListener("click" , (event)=>
{
  
  let imgPathArr = inputImageForTheBookBox.value.split("\\");
   imgName = imgPathArr[imgPathArr.length - 1];

  let formData = new FormData();
  formData.append('photo', inputImageForTheBookBox.files[0] ,imgName);
    
    fetch("http://localhost:3000/user/image",
    {
        method: 'POST',
        body:formData
    }).then (res =>res.text() )
    .then( response => {
        if(response == "done")
        {
            uploadBtnBookImage.style.backgroundColor="green";
            uploadBtnBookImage.style.color="black";
            imgUploaded=true;
        } else {
            uploadBtnBookImage.style.backgroundColor="red";
            uploadBtnBookImage.style.color="black";
        }
    })
})
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
    TheCatdiv.style.display="block";
    TheAuthordiv.style.display="none";
    TheBookdiv.style.display="none";
    catygroiesBtn.classList.add("active")
    booksBtn.classList.remove("active")
    authorBtn.classList.remove("active")
    
}
function showingTheBookDiv()
{
    TheBookdiv.style.display="block"
    TheCatdiv.style.display="none"
    TheAuthordiv.style.display="none";
    booksBtn.classList.add("active")
    catygroiesBtn.classList.remove("active")
    authorBtn.classList.remove("active")
    
}
function showingTheAuthorDiv()
{
    TheAuthordiv.style.display="block";
    TheBookdiv.style.display="none"
    TheCatdiv.style.display="none"
    booksBtn.classList.remove("active")
    catygroiesBtn.classList.remove("active")
    authorBtn.classList.add("active")
    
}