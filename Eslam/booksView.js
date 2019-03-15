fetch('http://localhost:3000/book',
    {
       method:"GET",
       headers: {Accept: 'application/json'},
    })
    .then(function(res){ 
      return res.json();
}).then ( data => {
    console.log(data)

document.getElementById("bookRow").innerHTML=`
${data.map( (book) => {return `
  <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
  <div class="card cats" style="width: 18rem;">
    <img class="card-img-top" src="img/img-test.png" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title" id="catName">${book.name}</h5>
      <p class="card-text" id="catDesc">${book.avgRating}</p>
      <a href="#" class="btn btn-primary">${book.ratingCount}</a>
    </div>
  </div>
</div>
`}).join('')}

`

})   

