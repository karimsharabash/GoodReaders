// import io from 'socket.io-client';
const PostBtn=document.getElementById("PostBtn");
const postsDiv=document.getElementById("postsDiv");
const textForPost=document.getElementById("textForPost");


// const io=require('socket.io-client')
var socket = io();
function addingNewPost()
{
    socket.emit('send',{res:textForPost.value});
    postsDiv.innerHTML+='<div class="Posts"><img src=""><p>user name<p><p>'+textForPost.value+'<p></div>'
    textForPost.value=""
}
PostBtn.addEventListener('click',addingNewPost);


