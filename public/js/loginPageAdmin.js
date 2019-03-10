const adminUserName=document.getElementById('adminUserName');
const adminPassword=document.getElementById('adminPassword');
const loginAdminBtn=document.getElementById('adminLogin');
const pleaseLogin=document.getElementById('okayAdmin');
let pleaseLoginDiv=document.getElementById('pleaseLOginDiv');

function sendLoginDataToServer(name,password)
{
  loginData={
    name:name,
    password:password
  }

  fetch('http://localhost:3000/admin/login',
        {
           method:"POST",
           redirect : "follow",
           headers: {'Content-Type':'text/plain',
           Accept: 'text/html'
          },
           body:JSON.stringify(loginData),
        })
        .then(function(err,res){ res.html(); })
        
       
}
function adminVerfication(event)
{
 const username=adminUserName.value;
  const passwordadmin=adminPassword.value;
    if(username==""&&passwordadmin=="")
   {
        pleaseLoginDiv.style.display="none";
        
       //alert(pleaseLoginDiv.style.display);
    
    }
  else
    { 
      sendLoginDataToServer(username,passwordadmin);
    }
    event.preventDefault()
}

loginAdminBtn.addEventListener('click',adminVerfication)
