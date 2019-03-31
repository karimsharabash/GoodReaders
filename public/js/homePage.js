const loginBtn = document.getElementById("loginBtn");
const loginUsername = document.getElementById("loginUsernameTxt");
const loginPassword = document.getElementById("loginPasswordTxt");
const loginRememberMe = document.getElementById("loginRememberMe");
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
const popularBooks = document.getElementById("HomePopularBooks");
const morePopularBooks = document.getElementById("moreBooks");
const more_less_btn = document.getElementById("show-more-or-less-btn");
let usernameFlag = null;


//Added by Muhammad to display the most popular books according to their average ratings.
window.addEventListener("load", () => {
    fetch("http://localhost:3000/book/popularBooks",
        {
            method: "GET",
            headers: { Accept: 'application/json' },
        })
        .then(res => {
            return res.json();
        })
        .then(books => {
            displayPopularBooks(books);
        })
})


more_less_btn.addEventListener("click", () => {
    if (morePopularBooks.style.display != 'inline') {
        morePopularBooks.style.display = "inline";
        more_less_btn.innerHTML = "Show less";
        console.log("hello");
    }
    else {
        morePopularBooks.style.display = "none";
        more_less_btn.innerHTML = "Show more";
        console.log("hello");
    }
})


uploadBtn.addEventListener("click", (event) => {
    event.preventDefault();
    let imgPathArr = profilPic.value.split("\\");
    let imgName = imgPathArr[imgPathArr.length - 1];

    let formData = new FormData();
    formData.append('photo', profilPic.files[0], imgName);

    fetch("http://localhost:3000/user/image",
        {
            method: 'POST',
            body: formData
        }).then(res => res.text())
        .then(response => {
            if (response == "done") {
                uploadBtn.style.width = "20%";
                uploadBtn.value = "Uploaded";
                uploadBtn.style.backgroundColor = "mediumseagreen";
                uploadBtn.style.color = "honeydew";
                uploadBtn.style.borderColor = "mediumseagreen";
                uploadBtn.style.borderRadius = "9px";
                uploadBtn.style.outline = "none";
            } else {
                uploadBtn.style.width = "25%";
                uploadBtn.value = "Upload failed";
                uploadBtn.style.backgroundColor = "red";
                uploadBtn.style.color = "black";
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


function displayPopularBooks(allBooks) {
    let selectedDiv;
    allBooks.forEach((book, index) => {
        if (index < 6)
            selectedDiv = popularBooks;
        else selectedDiv = morePopularBooks;

        selectedDiv.innerHTML += `
        <div class= "col-lg-2 col-md-4 col-sm-6 col-xs-12">
        <a href="/book/singlebook"><img id="${book._id}" class="bookImg" src="img/${book.photoName}" </a>
        <div class="card-body">
        <h4>${book.avgRating} <span class="bookRating fa fa-star"></span><br><a > ${book.name}</a> </h4>
        <h4> Category: ${book.categoryId.name}</h4> 
        </div>
        </div>
        `
    });
}


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
            if (data == "invalid") {
                loginNameErrMsg.style.display = "block";
                loginPassErrMsg.style.display = "none";
            } else if (data == "wrongPassword") {
                loginNameErrMsg.style.display = "none";
                loginPassErrMsg.style.display = "block";
            } else {

                window.location = data;
            }
        })
}


function signup(imgName) {
    //checks =>> username must be unique , no empty field ,same repeated password.
    //   const usernameflag = await checkUsername();
    let signupNameFlag;
    let signupPasswordFlag;
    let signupRepeatedPasswordFlag;
    let signupEmailFlag;

    if (signupName.value.length == 0) {
        nameErrorMsg.style.display = "block";
        signupNameFlag = false;
    } else {
        nameErrorMsg.style.display = "none";
        signupNameFlag = true;
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


    if (signupEmailFlag && signupNameFlag && signupPasswordFlag && signupRepeatedPasswordFlag && usernameFlag) {
        console.log("fron end saving ");
        let user =
        {
            name: signupName.value,
            username: signupUsername.value,
            email: signupEmail.value,
            password: signupPassword.value,
        }

        if (imgName) user.imageName = imgName;
        else user.imageName = "anonymous.png";

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
                window.location = data;

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
            return res.json();
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

let books = [];

document.getElementById("myInput").addEventListener("keyup", function () {




    let bookToSearch = document.getElementById("myInput").value;

    /*        He will retrieve all the boxes if the input field null  */
    /*        He will retrieve all the books  that contains the written pattern   */
    console.log(bookToSearch);
    if (bookToSearch != "") {

        if (books.length > 0) {
            displayBooksForSearch(bookToSearch);
        } else {
            fetch('http://localhost:3000/book/allBooks',
                {
                    method: "GET",
                    headers: { Accept: 'application/json' },
                })
                .then(function (res) {
                    return res.json();
                }).then(
                    allBooks => {
                        books = allBooks;
                                console.log(allBooks);
                                displayBooksForSearch(bookToSearch);
                    })

        }
    }
})



function displayBooksForSearch(keyword) {

    let anchorElement, listElement, listGoup;
    document.getElementById("list").innerHTML = "";

    books.forEach((book) => {
        if (book.name.toUpperCase().includes(keyword.toUpperCase())) {
            console.log(book.name)
            listElement = document.createElement("li");
            anchorElement = document.createElement("a");

            anchorElement.href = "#";

            anchorElement.innerHTML = book.name;
            listElement.appendChild(anchorElement);

            document.getElementById("list").appendChild(listElement);

        }
    })
}