const url = window.location.href;
var id = url.replace(/\/$/, "").split("/").pop();
var index = 0;
var data;
var userAnswers = [];
var points = 0;
const username = window.userName;
const chatSocket = new WebSocket(
    'ws://' +
    window.location.host +
    '/ws/chat/' +
    roomName +
    '/'
);
chatSocket.onopen = function(e) {
    chatSocket.send(JSON.stringify({
        'command': 'get_quiz',
        'quiz_id': id,
        'classroom_name': window.roomName,
        'username': username,
    }));

};

function showDialog() {
    var answer = document.getElementById('answerInput').value;
    var dialog = document.getElementById('dialog');
    var dialogMessage = document.getElementById('dialogMessage');
    var submitBtn = document.getElementById('submitBtn');
    const answerInput = document.querySelector("#answerInput").value;

    submitBtn.disabled = true;
    // Update dialog content based on the answer
    if (answerInput === data['quizz'][index]['correct_answer']) {
        dialogMessage.textContent = 'Your answer is correct!';
        points += 1;

    } else {
        dialogMessage.textContent = 'Your answer is incorrect!';
    }

    dialog.style.display = 'block';
    setTimeout(function() {
        dialog.style.opacity = '1';
    }, 100);

    // Hide the dialog after 2 seconds
    setTimeout(function() {
        dialog.style.opacity = '0';
        setTimeout(function() {
            dialog.style.display = 'none';
        }, 200);
    }, 2000);
    submitBtn.disabled = false;
}
chatSocket.onclose = function(e) {
    console.error('Chat socket closed unexpectedly');
};
chatSocket.onmessage = function(e) {
    const data_ = JSON.parse(e.data);
    console.log(data_);
    data = data_;
    changeFlashCard(data['quizz'], 0)

}

function changeFlashCard(d, index) {
    console.log(d);
    const problem = document.querySelector("#problem");
    const h = document.querySelector("#quiz_name");
    problem.innerText = d[index]['problem'];
    h.innerText = "Task#" + (index + 1);
}

function submitAnswer() {
    showDialog();
    if (index === data['quizz'].length - 1) {
        console.log("submitAnswer");
        const h = document.querySelector("#quiz_name");

        const problem = document.querySelector("#problem");
        const answerInput = document.querySelector("#answerInput");
        var max_points = 0;
      

        problem.innerText = "That is all";
        console.log(max_points);
        h.innerText = points + "/" + data['quizz'].length;
        var submitBtn = document.getElementById('submitBtn');
        submitBtn.style.display = 'none';
        answerInput.style.display = 'none';
        chatSocket.send(JSON.stringify({
            'command': 'save_answer_quiz',
            'quiz_id': id,
            'classroom_name': window.roomName,
            'user_points': points,
            'max_points':  data['quizz'].length,
            'username': username,
        }));

    } else {
        const answerInput = document.querySelector("#answerInput").value;
        userAnswers.push(answerInput);

        index = index + 1;
        changeFlashCard(data['quizz'], index);

    }

}