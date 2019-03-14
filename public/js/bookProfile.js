var stars = document.querySelectorAll('.star');
var clicked = false;
var currentRating = 0;

var commentForm = document.getElementById('commentForm');

stars.forEach(star => {
    star.addEventListener('click', setRating);
});

stars.forEach(star => {
    star.addEventListener('mouseover', hoverStars);
});

stars.forEach(star => {
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
                    currentRating = index + 1;
                }
            });
            document.querySelector('.stars').setAttribute('data-rating', currentRating);

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
            if(index >= currentRating)
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
    var comment = document.getElementById('userReview').value;
    var reviewsZone = document.getElementById("allReviews");

    var commentTime = new Date();

    reviewsZone.innerHTML += '<div class="well">'+
                              '<h5>Muhammad Adel: ' + comment + '</h5>'+
                              '<br>'+
                              commentTime.toUTCString() +
                              '</div>';
    
    commentForm.reset();
    e.preventDefault();
}