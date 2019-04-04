// import io from 'socket.io-client';
const PostBtn=document.getElementById("PostBtn");
const postsDiv=document.getElementById("postsDiv");
const textForPost=document.getElementById("textForPost");


// const io=require('socket.io-client')
var socket = io();
function addingNewPost()
{
    socket.emit('send',{postContent:textForPost.value,user :currentUserId});
    postsDiv.innerHTML+='<div class="Posts"><img src=""><p>user name<p><p>'+textForPost.value+'<p></div>'
    textForPost.value=""
}
PostBtn.addEventListener('click',addingNewPost);


socket.on('newPosts',(posts)=>{
    displayNewPostshint();
})

function displayNewPostshint()
{

}


function displayPosts()
{

}

function getNewPosts()
{

}