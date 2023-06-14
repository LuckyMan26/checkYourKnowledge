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
 
   
};
chatSocket.onclose = function(e) {
    console.error('Chat socket closed unexpectedly');
};
document.querySelector('#quiz-input-submit').onclick = function(e) {
    console.log(tasks);

   const quizname = document.querySelector("#quiz-name").value;
   chatSocket.send(JSON.stringify({'command': 'create_quiztask',
                                      'author' : username,
                                      'tasks' : tasks,
                                      'classroom_name': roomName,
                                      'quiz_name': quizname,
                                      }));
   showSuccessMessage();
   
};



function showSuccessMessage() {
    var successDiv = document.createElement('div');
    successDiv.textContent = 'Quizz successfully created!';
    successDiv.className = 'success-message';

    document.body.appendChild(successDiv);

    setTimeout(function() {
        successDiv.remove();
    }, 3000);
}

    function clearInputFields() {
        document.getElementById("task-content").value = "";
        document.getElementById("task-points").value = "";
        document.getElementById("answer-input").value = "";
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
         clearInputFields();
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
const task =  { "points": points, "correct_answer": correct_answer,"task_content":task_content };

tasks.push(task);
var div = document.createElement('div');
div.style.color = "#fff"
    div.style.backgroundColor = '#3498db';
    div.style.margin = '10px';
    div.style.padding = '10px';
div.innerText = tasks[tasks.length-1]['task_content'];

document.querySelector("#content").appendChild(div);
closeButton.click();
})