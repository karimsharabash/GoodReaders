const stars = document.querySelectorAll('.star');
const commentForm = document.getElementById('commentForm');
const comment = document.getElementById('userReview');
const reviewsArea = document.getElementById("reviewsArea");
const bookCoverImg = document.getElementById("bookCoverImg");
const descArea = document.getElementById("descArea");
const bookTitle = document.getElementById("bookTitle");
const avgRatingTx = document.getElementById("avgRatingTxt");
const ratingsCount = document.getElementById("ratingsCount");
const authorName = document.getElementById("authorName");
const categoryName = document.getElementById("categoryName");
const bookStatusMenu = document.getElementById('bookStatusMenu');
const starDiv = document.getElementById("starDiv")

let currentRating = 0;
let clicked = true;
let currentUserRating = 0;
let abilityToAddRating = true; //flag that he didn't add rating yet so he can add onkky one
let averageRating = 0;
let bookStatus = "";
let currentBookId = 0;


stars.forEach(star => {
    star.addEventListener('click', setRating);
    star.addEventListener('mouseover', hoverStars);
    star.addEventListener('mouseout', unhoverStars);
});

bookStatusMenu.addEventListener("change",(event)=>{
bookStatus = event.target.value;
updateUpdateUserRating("",bookStatus)
})


/*
This function sets the rating specified by the user through clicking on a star, the current rating is being saved to use later
& also 
*/
function setRating() {
    if(currentUserId){
    let selectedStar = this;
    let match = false;
    clicked = true;
    stars.forEach((star, index) => {
        if (match) {
            star.classList.remove('checked');
        } else {
            star.classList.add('checked');
        }
        if (star === selectedStar) {
            match = true;
            currentUserRating = index + 1;
        }
    });

    updateOldRating(currentUserRating);
}
else{
    fetch("http://localhost:3000/home",
    {
        "method": "GET",
        "redirect" :"follow"
        // body: JSON.stringify(newBook)
    })

    console.log("not allowed")
}
}


function hoverStars()
{
        let selectedStar = this;
        let match = false;
            stars.forEach((star, index) => {
                if(match && index > currentRating){
                    star.classList.remove('checked');
                }else{
                    star.classList.add('checked');
                }
                if(star === selectedStar){
                    match=true;
                    return;
                }
            });
}


/*
This function unhovers only stars out of the selected rating range change which were extra hovered by the user
So the stars within the range remain coloured.  (note: if the user didn't click anytime before that means there is no rating
selected so this function will unhover all stars)  
*/
function unhoverStars() {
    {
        stars.forEach((star, index) => {
            if (index >= currentUserRating)
                star.classList.remove('checked');
        })
    }
}

/* Reviews part */
commentForm.addEventListener('submit', addComment)

function addComment(e) {
    if(currentUserId){
    e.preventDefault();
    var commentTime = new Date();
    postReview(currentUserName, comment.value , commentTime )
    sendReviewToServer(comment.value );
    commentForm.reset();
    }
    else{
        console.log("comment not allowed")

        fetch("http://localhost:3000/home",
        {
            "method": "GET"
            // body: JSON.stringify(newBook)
        })
    }

}

// karim code 
function postReview(username , comment , time )
{
    reviewsArea.innerHTML += '<div class="well">' +
    '<h5> '+ username + ' :</h5> '+
    "<p>" +comment + "</p>"+
     time.toUTCString()+
    '</div>';
}

function sendReviewToServer(comment )
{   
    fetch("http://localhost:3000/review",
    {
        "method" :"POST",
        body:JSON.stringify({"bookId" :currentBookId,"userId" : currentUserId, "content":comment })      
    })
    .then(res => res.text())
    .then(respone =>
    {
        console.log(respone);
    })
}

window.addEventListener('load', defineTheBook);

function defineTheBook() {
    let sessionDefined = false;
    fetch("http://localhost:3000/book/define/Book",
    {
            method: "GET",
            headers: { Accept: 'application/json' },
        })
        .then(function (res) {
            
            return res.json();
           
        }).then(data => {
     
            if( data.authorId )
            {
              
            currentBookId = data._id;
            bookCoverImg.src = "img/" + data.photoName;
            descArea.textContent = data.description;
            bookTitle.textContent = data.name;
            averageRating = parseInt(data.avgRating);
            changeStars(averageRating);
            ratingsCount.textContent = data.ratingCount + " ";
            getBookAuthor(data.authorId);
            getBookCategory(data.categoryId.name);
            sessionDefined=true;
            }
        })
        .then ( () =>{
            if(sessionDefined){
        fetch("http://localhost:3000/user/" + currentUserId + "/book/" + currentBookId,
        {
            "method": "GET",
            headers: { Accept: ['application/json', "text/plain"] },
        })
        .then(res => res.json())
        .then(response => {
            
            if (response != "not found") //create the relation
            {
                if(response.rating )
                {
                    currentUserRating =response.rating
                    abilityToAddRating=false
                    for(let i =  1 ; i < response.rating+1  ; i++)
                    {
                        starDiv.children[i].classList.add('checked');
                    }
                }
                if(response.status)
                {
                    bookStatusMenu.value=response.status
                }
            }
        })

        fetch("http://localhost:3000/review/"+ currentBookId,
        {
            "method": "GET",
            headers: { Accept: ['application/json', "text/plain"] },
        }).then( res => res.json())
        .then((reviews)=>
        {   
            console.log(reviews);
            for (let review of reviews ) 
            {
                let reviewDate = new Date(review.time) //convet the mongoose date type to js date to use date functions 
                postReview(review.userId.username , review.content ,reviewDate );
            }
        })
    }
    })


}

function changeStars(rating) {
    const starOne = document.getElementById("starOne")
    const starTwo = document.getElementById("starTwo")
    const starThree = document.getElementById("starThree")
    const starFour = document.getElementById("starFour")
    const starFive = document.getElementById("starFive")
    switch (rating) {
        case 5:
            starFive.classList.add("checked");
        case 4:
            starFour.classList.add("checked");
        case 3:
            starThree.classList.add("checked");
        case 2:
            starTwo.classList.add("checked");
        case 1:
            starOne.classList.add("checked");
    }
}

function updateOldRating(newRating) {


    let newRatingCount = parseInt(ratingsCount.textContent);
    if (abilityToAddRating) {
        newRatingCount++;
        abilityToAddRating = false;
        averageRating += (newRating / newRatingCount);
        averageRating = averageRating.toPrecision(2);
        if(averageRating >5 ) averageRating =5;
        updateRatingTextAndStars(averageRating);
        ratingsCount.textContent = newRatingCount + " ";
        updateBookData({avgRating : averageRating , ratingCount : newRatingCount});
    }
    updateUpdateUserRating(newRating,"")
}

function updateRatingTextAndStars(avgRating) {
    avgRatingTxt.textContent = "(" + averageRating + ")";
    changeStars(avgRating);
}

function getBookAuthor(author) {

    authorName.textContent = author.first_name + " " + author.last_name;

}
function getBookCategory(category) {
                categoryName.textContent = category;
    
}

function updateUpdateUserRating(newRating,newStatus) {
    fetch("http://localhost:3000/user/" + currentUserId + "/book/" + currentBookId,
        {
            "method": "GET",
            headers: { Accept: ['application/json', "text/plain"] },
        })
        .then(res => res.json())
        .then(response => {
            if (response == "not found") //create the relation
            {
                
                if(newStatus == ""){
                sendNewData({
                    book_id:currentBookId,
                    rating:newRating,
                })
                }else{
                    sendNewData({
                        book_id:currentBookId,
                        status:newStatus,
                    })
                }
            }else {
                                 //update the relation
                if(newStatus == ""){
                    sendUpdatedData({ rating: newRating , status : " " , }); //to make it generic route at the server side
                    }else{
                        sendUpdatedData({ rating: "" , status : newStatus , }); //to make it generic route at the server side
                    }
            }
        })
}

function sendUpdatedData(updatedBook) {
    fetch("http://localhost:3000/user/" + currentUserId + "/book/" + currentBookId,
        {
            "method": "PUT",
            body: JSON.stringify(updatedBook)
        })
        .then((res) => {
          return  res.text();
        }).then((data) => {
            console.log(data);
        })
}


function sendNewData(newBook)
{
    if(currentUserId){
    fetch("http://localhost:3000/user/" + currentUserId + "/book/",
        {
            "method": "POST",
            body: JSON.stringify(newBook)
        })
        .then((res) => res.text()).then((data) => {
            console.log(data);
        })
    }else{
        fetch("http://localhost:3000/home",
        {
            "method": "GET"
            // body: JSON.stringify(newBook)
        })
    }
    
}

function updateBookData(newBookData)
{
    fetch("http://localhost:3000/book/"+currentBookId ,
    {
        "method" : "PUT",
        body:JSON.stringify(newBookData),
    })
    .then (res => res.text())
    .then (data =>
        {
            console.log(data );
        })
}