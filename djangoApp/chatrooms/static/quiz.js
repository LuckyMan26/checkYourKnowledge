const url = window.location.href;
var id = url.replace(/\/$/, "").split("/").pop();
var index = 0;
var data;
var userAnswers = [];
var points = 0;
const username = window.userName;
const isTeacher = window.isTeacher;
const chatSocket = new WebSocket(
    'ws://' +
    window.location.host +
    '/ws/chat/' +
    roomName +
    '/' + 'quiz' + '/' + id
);
chatSocket.onopen = function(e) {
    chatSocket.send(JSON.stringify({
        'command': 'get_quiz',
        'quiz_id': id,
        'classroom_name': window.roomName,
        'username': username,
    }));
    console.log(isTeacher);
    if(isTeacher==='True'){
        console.log(isTeacher);
        getUsersAnswers();
    }
};
function getUsersAnswers() {
    console.log('getUsersTasks');

    chatSocket.send(JSON.stringify({
        'command': 'get_users_quiz_answers',
        'quiz_id': id,
        'classroom_name': window.roomName,

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
        dialogMessage.style.color = "#52D131";
        points += 1;

    } else {
        dialogMessage.textContent = 'Your answer is incorrect!';
        dialogMessage.style.color = "#E41600";
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
    if(data['type']==='quiz_answers'){
        console.log('quiz_answers');
        const h = document.querySelector("#quiz_name");
        h.innerText = "Results of class";
        const problem = document.querySelector("#problem");
        problem.innerText = "";
        for (let i = 0; i < data['answers'].length; i++)
            createUserAnswer(data['answers'][i]);
    }
    else{
       
    if (data['quiz_answer'].length > 0) {
        const problem = document.querySelector("#problem");
        const h = document.querySelector("#quiz_name");
        problem.innerText = data['quiz_answer'][0]['points'] + '/' + data['quiz_answer'][0]['max_points'];
        h.innerText = 'You have already submitted this quizz';
        var submitBtn = document.getElementById('submitBtn');
        const answerInput = document.querySelector("#answerInput");

        submitBtn.style.display = 'none';
        answerInput.style.display = 'none';

    } else {
        changeFlashCard(data['quizz'], 0);
    }
}
}
function createUserAnswer(data){
    const div = document.createElement('div');
    div.className = 'user-answer-div';
    
    const answer = document.createElement('div');
    const user = document.createElement('div');
    answer.className = 'small-text';
    user.className = 'big-text';
    answer.innerText = 'Points'  + ':' + data['points'];
    user.innerText = 'Author: ' + data['author'];
 
    div.appendChild(user);
    div.appendChild(answer);
    document.querySelector('#user_ans').appendChild(div);
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
            'max_points': data['quizz'].length,
            'username': username,
        }));

    } else {
        const answerInput = document.querySelector("#answerInput").value;
        userAnswers.push(answerInput);
         document.querySelector("#answerInput").value = "";
        index = index + 1;

        changeFlashCard(data['quizz'], index);

    }

}

function backButtonEvent(){
    console.log("Navigated back!");
     if(data['quiz_answer'].length == 0){
    chatSocket.send(JSON.stringify({
            'command': 'save_answer_quiz',
            'quiz_id': id,
            'classroom_name': window.roomName,
            'user_points': points,
            'max_points': data['quizz'].length,
            'username': username,
        }));
}
}