const addingNewCatygoryBtn=document.getElementById("addingNewCatygoryBtn");

const CatygroiesTable=document.getElementById("CatygroiesTable");

const pleaseEnterDatacatygory=document.getElementById("pleaseEnterData")

const popUpCatygory=document.getElementById("exampleModalCenter");



function addingNewCatygoryfunction()
{
    const inputCatygoryBoxName=document.getElementById("inputCatygoryBoxName");

    const inputCatygoryBoxId=document.getElementById("inputCatygoryBoxId")
    
    const catygoryName=inputCatygoryBoxName.value;  
      
    const catygoryId=inputCatygoryBoxId.value;
   
    if(catygoryName==""||catygoryId=="")
   {
       
    pleaseEnterDatacatygory.style.display="block"
   }
   else
   {
       let  newCatygory={
           name:catygoryName
       }          

       sendCatygoryToserver(newCatygory);
       addingNewRowInCatygoryTable(newCatygory);
       $('#exampleModalCenter').modal('hide');
        inputCatygoryBoxName.value="";
        inputCatygoryBoxId.value="";

   }
}


function addingNewRowInCatygoryTable(newRow)
{
   
 CatygroiesTable.innerHTML+=' <tr><th scope="row">'+newRow.id+'</th><td>'+newRow.name+'</td><td  class="text-center"><input type="button" id="catygoryEditBtn" class="btn btn-info btn-xs " value="Edit"><input type="button" id="catygorydeleteBtn" class="btn btn-danger btn-xs marginToTheLeft" value="Delete"></td></tr>'
}
    

function sendCatygoryToserver(newCatygory){

    fetch('http://localhost:3000/category',
        {
           method:"POST",
           headers: {
            //    'Content-Type':'text/plain',
           Accept: 'text/plain'
        },
       
           body:JSON.stringify(newCatygory),
        })
        .then(function(res){ 
          return res.text();
    }).then ( data => {
        console.log(data);
    })
}


function displayCatData(data)
{

    data.forEach(element => {

CatygroiesTable.innerHTML+=' <tr><th scope="row">'+element.id+'</th><td>'+element.name+'</td><td  class="text-center"><input type="button" id="catygoryEditBtn" class="btn btn-info btn-xs " value="Edit"><input type="button" class="btn btn-danger btn-xs marginToTheLeft"  id="catygorydeleteBtn" value="Delete"></td></tr>'
        
    });
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
    displayCatData(data)

})   
   

}


function editingCatygory(event)
{
    
   let rowCat=event.target.parentNode.parentNode.rowIndex
   let idOfCat=CatygroiesTable.rows[rowCat].cells[0].innerHTML;
   let nameOfCat=CatygroiesTable.rows[rowCat].cells[1].innerHTML;
    let theActionToTake=event.target.id;
   

   if(theActionToTake=="catygorydeleteBtn")
   {
       console.log("delete");
       CatygroiesTable.deleteRow(rowCat);

       fetch('http://localhost:3000/category/'+idOfCat,
       {
          method:"DELETE",
          headers: {
        // 'Content-Type':'text/plain',
          Accept: 'text/plain'
       },
       })
       .then(function(res){ 
         return res.text();
   }).then ( data => {
       console.log(data);
   })


   }
   else if(theActionToTake=="catygoryEditBtn")
   {
    const inputCatygoryBoxName=document.getElementById("inputCatygoryBoxName");

    const inputCatygoryBoxId=document.getElementById("inputCatygoryBoxId")
    inputCatygoryBoxName.value=idOfCat;
    inputCatygoryBoxId.value=nameOfCat;
    $('#exampleModalCenter').modal('show');

    
   }
}


window.addEventListener('load',displayCatygroytable)


addingNewCatygoryBtn.addEventListener('click',addingNewCatygoryfunction);

CatygroiesTable.addEventListener('click',editingCatygory)












