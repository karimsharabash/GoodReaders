const loginBtn = document.getElementById("loginBtn");
const loginUsername = document.getElementById("loginUsernameTxt");
const loginPassword = document.getElementById("loginPasswordTxt");
const loginRememberMe= document.getElementById("loginRememberMe");
const profilPic = document.getElementById("profilePic");
const signupName = document.getElementById("signupName");
const signupUsername = document.getElementById("signupUsername");
const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");
const signupRepeatedPassword = document.getElementById("signupRepeatedPassword");
// const signupImgName = document.getElementById("imagePath");
const signupSubmit = document.getElementById("signupSubmit");
const usernameErrorMsg = document.getElementById("usernameErrorMsg");
const nameErrorMsg = document.getElementById("nameErrorMsg");
const pswErrorMsg = document.getElementById("pswErrorMsg");
const repeatedRswErrorMsg = document.getElementById("repeatedRswErrorMsg");
const mailErrorMsg = document.getElementById("mailErrorMsg");
const loginNameErrMsg = document.getElementById("loginNameErrMsg");
const loginPassErrMsg = document.getElementById("loginPassErrMsg");
const uploadBtn = document.getElementById("uploadBtn");
const photoForm = document.getElementById("photoForm");
let usernameFlag = null;

uploadBtn.addEventListener("click" , (event)=>
{
  event.preventDefault();
  let imgPathArr = profilPic.value.split("\\");
  let imgName = imgPathArr[imgPathArr.length - 1];

  let formData = new FormData();
  formData.append('photo', profilPic.files[0] ,imgName);
    
    fetch("http://localhost:3000/user/image",
    {
        method: 'POST',
        body:formData
    }).then (res =>res.text() )
    .then( response => {
        if(response == "done")
        {
            uploadBtn.style.backgroundColor="green";
            uploadBtn.style.color="black";
        } else {
            uploadBtn.style.backgroundColor="red";
            uploadBtn.style.color="black";
        }
    })
})

loginBtn.addEventListener("click", () => {

    loginCheck(loginUsername.value, loginPassword.value, loginRememberMe.checked)
})

signupUsername.addEventListener("blur", () => {
    checkUsername();
})

signupSubmit.addEventListener("click", (event) => {

    event.preventDefault();
    let imgPathArr = profilPic.value.split("\\");
    let imgName = imgPathArr[imgPathArr.length - 1];
    console.log(imgName);
    signup(imgName);

})

function loginCheck(username, password, rememberFlag) {
    let user = {

        "username": username,
        "password": password,
        "remember": rememberFlag,
    }

    console.log(user);
    fetch("http://localhost:3000/user/login",
        {
            method: "POST",
            headers: {
                Accept: "text/plain"
            },
            body: JSON.stringify(user)
        }).then((res) => {
            return res.text();
        }).then(data => {
            console.log(data);
            if(data=="invalid")
            {
              loginNameErrMsg.style.display = "block";
              loginPassErrMsg.style.display = "none";
            }else if( data == "wrongPassword")
            {
                loginNameErrMsg.style.display = "none";
                loginPassErrMsg.style.display = "block";
            } else {
               
                window.location =data;
            }
        })
}


function signup(imgName) {
    //checks =>> username must be unique , no empty field ,same repeated password.
    //   const usernameflag = await checkUsername();
    let signupNameFlag ;
    let signupPasswordFlag;
    let signupRepeatedPasswordFlag ;
    let signupEmailFlag;

    if(signupName.value.length  == 0)
    {
        nameErrorMsg.style.display="block";
        signupNameFlag=false;
    }else{
        nameErrorMsg.style.display="none";
        signupNameFlag=true;
    }

    if (signupPassword.value.length < 5) {
        pswErrorMsg.style.display = "block";
        signupPasswordFlag = false;
    }
    else {
        signupPasswordFlag = true;
        pswErrorMsg.style.display = "none";
    }

    if (signupPassword.value != signupRepeatedPassword.value) {
        repeatedRswErrorMsg.style.display = "block";
        signupRepeatedPasswordFlag = false;
    } else {
        signupRepeatedPasswordFlag = true;
        repeatedRswErrorMsg.style.display = "none";
    }
    if (signupEmail.value.includes("@") && signupEmail.value.includes(".")) {
        mailErrorMsg.style.display = "none";
        signupEmailFlag = true;
    } else {
        mailErrorMsg.style.display = "block";
        signupEmailFlag = false;
    }


    if(signupEmailFlag && signupNameFlag && signupPasswordFlag && signupRepeatedPasswordFlag && usernameFlag)
    {
        console.log("fron end saving ");
     let user=
     {
         name : signupName.value,
         username : signupUsername.value,
         email : signupEmail.value,
         password : signupPassword.value,
     }

     if(imgName) user.imageName=imgName;
     else user.imageName="anonymous.png" ;

     console.log(user);

     fetch("http://localhost:3000/user/signup",
     {
         method: "POST",
         headers: {
             // "Content-Type":"text/plain",
             Accept: "text/plain"
         },
         body: JSON.stringify(user),
     }).then((res) => {
         return res.text();
     }).then(data => {
        window.location=data;
      
     })

    }

}

function checkUsername() {

    //let flag 
    fetch("http://localhost:3000/user/signup/checkUsername",
        {
            method: "POST",
            headers: {
                // "Content-Type":"text/plain",
                Accept: "text/plain"
            },
            body: JSON.stringify({ "username": signupUsername.value }),
        }).then((res) => {
            return res.text();
        }).then(data => {
            console.log(data);
            if (data == "valid") {
                usernameErrorMsg.style.display = "none";
                usernameFlag = true;
            }
            else {
                usernameErrorMsg.style.display = "block";
                usernameFlag = false;
            }
        })

} 
