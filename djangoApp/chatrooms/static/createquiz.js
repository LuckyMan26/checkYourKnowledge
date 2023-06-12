var roomName = window.roomName;
var username = window.userName;
var tasks = new Array();
const chatSocket = new WebSocket(
    'ws://' +
    window.location.host +
    '/ws/chat/' +
    roomName +
    '/' + 'createquiz/'
);
chatSocket.onopen = function(e) {
    var answear = window.answear;
    var content = window.problem;
   
};
chatSocket.onclose = function(e) {
    console.error('Chat socket closed unexpectedly');
};
document.querySelector('#quiz-input-submit').onclick = function(e) {
   
  
   
};



function showSuccessMessage() {
    var successDiv = document.createElement('div');
    successDiv.textContent = 'Task successfully created!';
    successDiv.className = 'success-message';

    document.body.appendChild(successDiv);

    setTimeout(function() {
        successDiv.remove();
    }, 3000);
}


    var submitButton = document.getElementById("createtask");
    submitButton.addEventListener("click", function() {
        var dialog = document.getElementById("dialog");
        dialog.style.display = "block";
     
    });

    var closeButton = document.getElementsByClassName("modal-close")[0];
    closeButton.addEventListener("click", function() {
        var dialog = document.getElementById("dialog");
        dialog.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        var dialog = document.getElementById("dialog");
        if (event.target == dialog) {
            dialog.style.display = "none";
        }
    });
var quizTaskSubmitButton = document.querySelector("#task-submit");
quizTaskSubmitButton.addEventListener("click", function(){
const points = document.querySelector('#task-points').value;
const correct_answer = document.querySelector('#answer-input').value;
const task_content = document.querySelector('#task-content').value;
var task = new Map();
task.set("points", points);
task.set("correct_answer", correct_answer);
task.set("task_content",task_content);
tasks.push(task);
var div = document.createElement('div');

div.innerText = tasks[tasks.length-1].get('task_content');
document.querySelector("#content").appendChild(div);

})