let authorId = "5c90cede723a0c5efff8994e" ;

fetch('http://localhost:3000/author/'+authorId,
{
   method:"GET",
   headers: {Accept: 'application/json'},
})
.then(res => { 
    return res.json();

  
}).then( async data => {
    await displayAuthorData(data) //To wait till author's data is displayed first.
    await fetchAuthorBooks() //To fetch the popular books under the author's data(profile).
   
})


function displayAuthorData(author)
{
    document.getElementById("authorInfo").innerHTML = `
    <h2 id="authorName">Author: ${author.first_name} ${author.last_name}</h2>
    <img id="authorImg" src="../../img/${author.photoName}" alt="authorImage">
    <br>
    <div class"row"> 
    <div class="col-lg-11 col-md-10 col-sm-10 col-xs-10" style="margin-left:-1%">
    <br>
    <p class="pauthor">${author.biography}</p>
    </div>
    </div>				
    `
}

async function fetchAuthorBooks()
{
    await fetch('http://localhost:3000/book/author/'+authorId,
    {
    method:"GET",
    headers: {Accept: 'application/json'},
    })
    .then( res => {  
        return res.json();
    
    }).then( data =>{
        displayAuthorBooks(data);
       
    })
}


function displayAuthorBooks(book)
{
    var authorInfo = document.getElementById("authorInfo");
    authorInfo.innerHTML+= `
    <div class="row">
    <div class="col-lg-2 col-md-4 col-sm-6 col-xs-12">
    <h2 style="color:#5FCF80">Popular books</h2>
    </div>
    </div>`;

    var popularBooks = document.getElementById("popularBooks");
    var counterForBooks=4;
    book.forEach(element => {
        
        if(counterForBooks>0)
        {
        popularBooks.innerHTML += `
			<div class="col-lg-2 col-md-4 col-sm-6 col-xs-12">
				<a href=""><img class="authorPopularBooks" src="../../img/${element.photoName}"></a>
            </div>
        `
        counterForBooks--;    
    }
    
    });
}