const loginBtn = document.getElementById("loginBtn");
const loginUsername = document.getElementById("loginUsernameTxt");
const loginPassword = document.getElementById("loginPasswordTxt");
const loginRememberMe= document.getElementById("loginRememberMe");




loginBtn.addEventListener("click", () => {

    loginCheck(loginUsername.value, loginPassword.value, loginRememberMe.checked)
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

