const userImg=document.getElementById("userImg");
let   currentUserId;
let currentUserName;

window.addEventListener('load',defineTheuser);

function defineTheuser(){
fetch("http://localhost:3000/user/nav/defineUser" ,
    {
       method:"GET",
       headers: {Accept: 'application/json'},
    })
    .then(function(res){ 
      return res.json();
    }).then ( data => {
        console.log(data.imageName);
        // userImg.src ="img/"+data.imageName;
        currentUserId=data._id
        currentUserName  = data.username;
})   
}


