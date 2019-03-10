const loginBtn = document.getElementById("loginBtn");
const loginUsername = document.getElementById("loginUsernameTxt");
const loginPassword = document.getElementById("loginPasswordTxt");
const userImagePath = document.getElementById("imagePath");

loginBtn.addEventListener("click", () => {
    
    loginCheck(loginUsername.value,loginPassword.value,true)
        
})

function loginCheck(username, password, rememberFlag) {
    let user = {

        "name": username,
        "password": password,
        "remember": rememberFlag,
    }

    fetch("localhost:3000/user/login",
        {
            method: "POST",
            headers: {
                Accept: "application/json"
            },
            body: JSON.stringify(user)
        }).then((res) => {
          return res.json();
        }).then ( data => {
            console.log(data)
        })
}

