let categoryName;


async function CategoryName(id,book)
{
    let booksDiv = document.getElementById("booksList")

    await fetch('http://localhost:3000/category/'+id,
    {
       method:"GET",
       headers: {Accept: 'application/json'},
    })
    .then(function(res){ 
      return res.json();
    }).then ( (data) => {
      categoryName = data.name;
      console.log(categoryName);
    })
    
    booksDiv.innerHTML+= `
  <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
    <div class="card cats" style="width: 18rem;">
    <a href="/book/singlebook"><img class="card-img-top bookImg" src="img/${book.photoName}" alt="Card image cap"></a>
    <div class="card-body">
      <h4>4.4 <span class="bookRating fa fa-star"></span><br><a href="book/${book._id}"> ${book.name}</a> </h4>
      <h4> Category: ` + categoryName + `</h4>
      <p class="card-text">${book.description}.</p>
    </div>
    </div>
  </div>
  `

}


fetch('http://localhost:3000/book/books',
    {
       method:"GET",
       headers: {Accept: 'application/json'},
    })
    .then(function(res){ 
      return res.json();
}).then ( 
  data => {
   
    console.log(data);
    showingBooks(data);
})


async function gettingBooks(data)
{
  data.forEach( (book,index) => {
    id =book.categoryId;
    // CategoryName(book.categoryId);
    // console.log(name);
    fetch('http://localhost:3000/category/'+id,
    {
       method:"GET",
       headers: {Accept: 'application/json'},
    })
    .then(function(res){ 
      return res.json();
    }).then ( (data1) => {
      name = data1.name;
      console.log(name);
    })
    
    book[index] = data;
    console.log(index);
        
  })
}


function showingBooks(data)
{
  data.map( async (book) => {
  await CategoryName(book.categoryId, book);
  console.log(book.categoryId)
  })
}