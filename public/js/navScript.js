const userImg=document.getElementById("userImg");
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
      console.log("loged in user ");

        console.log(data);
        userImg.src ="img/"+data.imageName;
})   
}