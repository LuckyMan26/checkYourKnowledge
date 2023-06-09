const url = window.location.href;
var id = url.replace(/\/$/, "").split("/").pop();
var roomName = window.roomName;
var ans;
const isTeacher = window.isTeacher;
console.log(isTeacher);
const chatSocket = new WebSocket(
    'ws://' +
    window.location.host +
    '/ws/chat/' +
    window.roomName +
    '/' + id
);
chatSocket.onopen = function(e) {
    console.log('Hello');
    getTask();
    if(isTeacher==='True'){
        console.log(isTeacher);
        getUsersAnswers();
    }

};

function getTask() {
    console.log('getTask');

    chatSocket.send(JSON.stringify({
        'command': 'get_task',
        'id': id,
        'classroom_name': window.roomName,
        'username': window.userName,
    }));
};

function getUsersAnswers() {
    console.log('getUsersTasks');

    chatSocket.send(JSON.stringify({
        'command': 'get_users_answers',
        'id': id,
        'classroom_name': window.roomName,

    }));
};
chatSocket.onmessage = function(e) {
    console.log('Some On message');
    const data = JSON.parse(e.data);
    console.log(data['type']);

   
    if(data['type']==="correct_answer"){
      console.log('correct_answer');
     const points = data['points'];
      document.querySelector('#points').innerText = points + ' / ' +  points;
      var bt = document.getElementById('submitBtn');
     bt.remove();
      const p = document.createElement('p');
      p.innerText = "You have already submitted answer";
      document.querySelector('.block').appendChild(p);
    }
    else if(data['type']==="incorrect_answer"){
      console.log('incorrect_answer');
     const points = data['max_points'];
     document.querySelector('#points').innerText = '0 / '+  points;
      var bt = document.getElementById('submitBtn');
       bt.remove();
      const p = document.createElement('p');
      p.innerText = "You have already submitted answer";
      document.querySelector('.block').appendChild(p);
    }

     else if (data['type'] === 'task_with_answer') {
        console.log('task_with_answer');
        const points = data['points'];

        var problem = data['message_problem'];
        ans = data['answer'];

        console.log(problem);
        document.querySelector('#problem').innerText = problem;
        var bt = document.getElementById('submitBtn');
        bt.remove();
        const p = document.createElement('p');
        p.innerText = "You have already submitted answer";
        document.querySelector('.block').appendChild(p);
        let user_ans = data['user_answer'];
        console.log(data['answer']);
        console.log('User_ans ' + user_ans);
        if (user_ans === null) {
            console.log('null');
            document.querySelector('#points').innerText = 'Maximum points: ' + points;
        }
           else{
           document.querySelector('#points').innerText = data['user_points'] + '/' + data['max_points'];
           }

    }
    else if (data['type'] === 'answers') {

        console.log('answers');

        for (let i = 0; i < data['answers'].length; i++)
            createUserAnswer(data['answers'][i]);
    } else {
        console.log('not task_with_answer');
        const points = data['points'];

        var problem = data['message_problem'];
        ans = data['answer'];

        console.log(problem);
        document.querySelector('#problem').innerText = problem;
        console.log(data['answer']);
        document.querySelector('#points').innerText = 'Maximum points: ' + points;

    }

};
function createUserAnswer(data){
    const div = document.createElement('div');
    div.className = 'user-answer-div';
    
    const answer = document.createElement('div');
    const user = document.createElement('div');
    answer.className = 'small-text';
    user.className = 'big-text';
    answer.innerText = 'Answer'  + ':' + data['answer'];
    user.innerText = 'Author: ' + data['author_of_answer'];
    div.addEventListener('click', function() {
        window.location.pathname = '/chat/' + roomName + '/' + id + '/' + data['author_of_answer'];
    });
    div.appendChild(user);
    div.appendChild(answer);
    document.querySelector('#user_ans').appendChild(div);
}
function submitAnswer() {
    var answerInput = document.getElementById('answerInput');
    var resultDiv = document.getElementById('resultDiv');

    var userAnswer = answerInput.value;
    chatSocket.send(JSON.stringify({
        'command': 'save_answer',
        'id': id,
        'classroom_name': window.roomName,
        'user_ans': userAnswer,
        'username': window.userName,

    }));
    chatSocket.send(JSON.stringify({
        'command': 'check_answer',
        'id': id,
        'classroom_name': window.roomName,
        'answer_user': userAnswer,
        'username': window.userName,

    }));


    answerInput.value = '';

}