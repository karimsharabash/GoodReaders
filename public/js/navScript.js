const userImg=document.getElementById("userImg");
const NavForVisitor=document.getElementById("NavForVisitor");
const NavForUser=document.getElementById("NavForUser");
const userProfBtn=document.getElementById("userProfBtn");
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
       if(data.res=="no user found")
       {
        NavForVisitor.style.display="block"
        NavForUser.style.display="none"
       }
       else
       {
        NavForVisitor.style.display="none"
        NavForUser.style.display="block"
        userImg.src ="img/"+data.imageName;
        currentUserId=data._id
        currentUserName  = data.username;
       
       }
})   
}

