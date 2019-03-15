fetch('http://localhost:3000/author',
    {
       method:"GET",
       headers: {Accept: 'application/json'},
    })
    .then(function(res){ 
      return res.json();
}).then ( authordata => {
    console.log(authordata)

document.getElementById("authorRow").innerHTML=`
${authordata.map( (author) => {return `
  <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
  <div class="card cats" style="width: 18rem;">
    <img class="card-img-top" src="img/img-test.png" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title" id="catName">${author.first_name}</h5>
      <h5 class="card-title" id="catName">${author.last_name}</h5>
      <p class="card-text" id="catDesc">${author.dateOfBirth}</p>
      <a href="#" class="btn btn-primary">${author.photoName}</a>
    </div>
  </div>
</div>
`}).join('')}

`

})   

