const url = window.location.href;
var id = url.replace(/\/$/, "").split("/").pop();
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
    }));
   
};

chatSocket.onclose = function(e) {
    console.error('Chat socket closed unexpectedly');
};