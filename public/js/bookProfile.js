const stars = document.querySelectorAll('.star');
const commentForm = document.getElementById('commentForm');
const comment = document.getElementById('userReview').value;
const reviewsZone = document.getElementById("allReviews");
const bookCoverImg= document.getElementById("bookCoverImg");
const descArea =document.getElementById("descArea");
const bookTitle = document.getElementById("bookTitle");
const avgRatingTxt =document.getElementById("avgRatingTxt");
const ratingsCount=document.getElementById("ratingsCount");
const authorName=document.getElementById("authorName");
const categoryName=document.getElementById("categoryName");


let clicked = false;
let currentUserRating = 0;
let abilityToAddRating =true ; //flag that he didn't add rating yet so he can add onkky one
let averageRating =0;

let currentUserId = "5c87a300d4696a2aa07362fa";
let currentBookId =0 ;
stars.forEach(star => {
    star.addEventListener('click', setRating);
    star.addEventListener('mouseover', hoverStars);
    star.addEventListener('mouseout', unhoverStars);
});

/*
This function sets the rating specified by the user through clicking on a star, the current rating is being saved to use later
& also 
*/ 
function setRating()
{
    let selectedStar = this;
    let match = false;
    clicked = true;
            stars.forEach((star, index) => {
                if(match){
                    star.classList.remove('checked');
                }else{
                    star.classList.add('checked');
                }
                if(star === selectedStar){
                    match = true;
                    currentUserRating = index + 1;
                }
            });

            updateOldRating(currentUserRating);

            // document.querySelector('.stars').setAttribute('data-rating', currentRating);

            /* 
                Some logic still should be add to send the rating & save it at the back-end in the Database.
            */
}


function hoverStars()
{
        let selectedStar = this;
        let match = false;
            stars.forEach((star) => {
                if(match){
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
function unhoverStars()
{
    {
        stars.forEach( (star, index) => {
            if(index >= currentUserRating)
            star.classList.remove('checked');
        })
    }
}



/* Reviews part */

commentForm.addEventListener('submit', addComment)

/* 
Displaying & saving the comment or review added by the user with it's date.
*/
function addComment(e)
{
 
    var commentTime = new Date();

    reviewsZone.innerHTML += '<div class="well">'+
                              '<h5>Muhammad Adel: ' + comment + '</h5>'+
                              '<br>'+
                              commentTime.toUTCString() +
                              '</div>';
    
    commentForm.reset();
    e.preventDefault();
}


// karim code 

window.addEventListener('load',defineTheBook);

function defineTheBook(){
    
fetch("http://localhost:3000/book/singleBook" ,
    {
       method:"GET",
       headers: {Accept: 'application/json'},
    })
    .then(function(res){ 
       
      return res.json();
    }).then ( data => {
      
        console.log(data);
        currentBookId=data._id;
        bookCoverImg.src ="img/"+data.photoName;
        descArea.textContent = data.description;
        bookTitle.textContent =data.name;
        averageRating =parseInt(data.avgRating);
        changeStars(averageRating);
        
        ratingsCount.textContent= data.ratingCount+ " ";
        getBookAuthor(data.authorId);
        getBookCategory(data.categoryId);
})   
}

function changeStars(rating)
{
    const starOne =document.getElementById("starOne")
    const starTwo =document.getElementById("starTwo")
    const starThree =document.getElementById("starThree")
    const starFour =document.getElementById("starFour")
    const starFive =document.getElementById("starFive")
    switch(rating)
    {
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

function updateOldRating(newRating)
{
    

    let newRatingCount= parseInt(ratingsCount.textContent);
    if(abilityToAddRating)
    {
        newRatingCount ++;
        abilityToAddRating =false;
        averageRating +=(newRating/newRatingCount);
        averageRating = averageRating.toPrecision(2);
        updateRatingTextAndStars(averageRating);
        ratingsCount.textContent = newRatingCount + " ";
    }

    updateUpdateUserRating(averageRating)
}

function updateRatingTextAndStars(avgRating)
{
    avgRatingTxt.textContent ="(" + averageRating + ")";
    changeStars(averageRating);
}

function  getBookAuthor(authorID)
{

    fetch("http://localhost:3000/author/" + authorID,
    {
       method:"GET",
       headers: {Accept: 'application/json'},
    })
    .then(function(res){ 
       
      return res.json();
    }).then ( data => {
   
        authorName.textContent =data.first_name + " "+ data.last_name;
    })
}
function getBookCategory(categoryID)
{
    {
        fetch("http://localhost:3000/category/" + categoryID,
        {
           method:"GET",
           headers: {Accept: 'application/json'},
        })
        .then(function(res){ 
          return res.json();
        }).then ( data => {
            categoryName.textContent =data.name;
        })
    }
}

function updateUserData()
{
    //check if there is a old data for this book in this user document
    //create new relation if there isn't
    //update the old one if its found
}

function updateUpdateUserRating(newRating)
{
    console.log(currentUserId  + " " +currentBookId );
   fetch("http://localhost:3000/user/"+currentUserId+"/book/"+currentBookId ,
   {
       "method" :"GET" ,
       headers: {Accept: ['application/json' , "text/plain"] },
   })
   .then (res => res.json())
   .then (response =>
    {
        if(response == "not found") //create the relation
        {
            
        }
        else {                      //update the relation 
            console.log("book found");
            console.log(response);
            
        }
    })
}