var roomName = window.roomName;
var username = window.userName;
var tasks;
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
    //fetchTasks();
};
chatSocket.onclose = function(e) {
    console.error('Chat socket closed unexpectedly');
};
document.querySelector('#quiz-input-submit').onclick = function(e) {
    const ans = document.querySelector("#answear-input").value;
    const content = document.querySelector("#task-content").value;
    answer = ans;
    createQuizTask(ans, content);
};

function createQuizTask(ans, content) {

}

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