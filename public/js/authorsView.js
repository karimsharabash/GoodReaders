// file has been modified by rahma faisal in route of author 
fetch('http://localhost:3000/author/Author',
    {
       method:"GET",
       headers: {Accept: 'application/json'},
    })
    .then(function(res){ 
      return res.json();
}).then ( authordata => {
    console.log(authordata)

document.getElementById("authorsView").innerHTML=`
${authordata.map( (author,index) => {return `
  <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
    <div class="card cats" style="width: 18rem;">
    <a href="http://localhost:3000/author/single/Author"><img id ="${author._id}"class="card-img-top authorImg" src="img/${author.photoName}" alt="Card image cap"></a>
    <div class="card-body">
      <h3>${author.last_name}</h3>
      <p class="card-text" >${author.dateOfBirth}</p>
    </div>
    </div>
  </div>
`}).join('')}

`

}) 

function getTheChoosenAuthor(event)
{
  console.log(event.target.id)
  fetch('http://localhost:3000/author/single/Author/'+event.target.id,
    {
       method:"GET",
       headers: {Accept: 'application/json'},
    })
    .then(function(res){ 
      
})

}
test=document.getElementById("authorsView")
test.addEventListener('click',getTheChoosenAuthor)