let booksDiv = document.getElementById("booksList");


fetch('http://localhost:3000/book/allBooks',
    {
       method:"GET",
       headers: {Accept: 'application/json'},
    })
    .then(function(res){ 
      return res.json();
}).then ( 
  allBooks => {
    showingBooks(allBooks);
})


function showingBooks(allBooks)
{
  allBooks.map( (book) => {
     booksDiv.innerHTML+= `
  <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
    <div class="card cats">
    <a href="/book/singlebook"><img id="${book._id} "class="card-img-top bookImg" src="img/${book.photoName}" alt="Card image cap"></a>
    <div class="card-body">
      <h4>${book.avgRating} <span class="bookRating fa fa-star"></span><br><a > ${book.name}</a> </h4>
      <h4> Category: ${book.categoryId.name}</h4>
      <p class="card-text">${book.description}.</p>
    </div>
    </div>
  </div>
  `
  })
}



booksDiv.addEventListener('click',settingTheRequiredBook);


