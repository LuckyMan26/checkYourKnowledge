from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth import get_user_model
from asgiref.sync import async_to_sync
from datetime import datetime
from .CommandFactory import *
User = get_user_model()
from .Command import  *

class ChatRoomConsumer(AsyncWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        print('init')
        super().__init__(*args, **kwargs)
        self.listOfTasks = []

    def addTaskToListOfTasks(self,t : Task):
        self.listOfTasks.append(t)

    def getUniqueId(self):
        tasks = Task_model.last_10_tasks()

    def getListOfTasks(self):
        return self.listOfTasks

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        command_name = text_data_json['command']
        command_data = text_data_json

        command = CommandFactory.create_command(self, command_name, command_data)
        await command.execute()


    async def sendTask(self, task : json):
        print('poka')
        Message_dict = task['task']

        task_content = Message_dict['content_problem']
        task_answear = Message_dict['content_answer']

        task_name = Message_dict['task_name']
        points = Message_dict['points']
        id = Message_dict['id']
        print('Id:'+str(task_content))
        author = Message_dict['author']

        print('SUCCESS')
        await (self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'send_task',
                'content_problem': task_content,
                'content_answer': task_answear,
                'author': author,
                'id': id,
                'points': points,
                'task_name': task_name
            }
        )
    async def sendTaskWithUserAnswer(self,task):
        print('poka')
        Message_dict = task['task']

        task_content = Message_dict['content_problem']
        task_answear = Message_dict['content_answer']
        user_answer = Message_dict['user_answer']
        task_name = Message_dict['task_name']
        max_points = Message_dict['max_points']
        user_points = Message_dict['user_points']
        id = Message_dict['id']
        print('Id:' + str(task_content))
        author = Message_dict['author']

        print('SUCCESS')
        await (self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'send_task_with_answer',
                'content_problem': task_content,
                'content_answer': task_answear,
                'user_answer' : user_answer,
                'author': author,
                'id': id,
                'max_points': max_points,
                'user_points': user_points,
                'task_name': task_name
            }
        )

    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        await (self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name,
        )

        await self.accept()

    async def disconnect(self, close_code):
         await (self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    async def send_message(self, text_data : json):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        author = text_data_json['author']
        avatar_link = text_data_json['avatar_link']

        await (self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chatroom_message',
                'message': message,
                'author' : author,
                'avatar_link' : avatar_link
            }
        )

    async def send_chat_message(self, message : Message):
        print('send_chat_message')
        Message_dict = message['message']

        message_content = Message_dict['content']
        author = Message_dict['author']
        avatar_link = Message_dict['avatar_link']
        await(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'content': message_content,
                'author': author,
                'avatar_link' : avatar_link,
                'fetch': False
            }
        )

    async def send_chat_message_fetch(self, message):

        await self.send(text_data=json.dumps(message))
    async def send_user_answers(self,answers):
        print("send_user_answers")
        await self.send(text_data=json.dumps(answers))

    async def send_task(self,event):
        print('send_task')
        message_problem = event['content_problem']
        message_answear = event['content_answer']
        task_name = event['task_name']
        id = event['id']

        print('id' + str(id))
        points = event['points']
        author = event['author']
        await self.send(text_data=json.dumps({
            'type': 'create_task',
            'message_problem': message_problem,
            'answer':message_answear,
            'author': author,

            'id': id,
            'points': points,
            'task_name': task_name
        }))
    async def send_task_with_answer(self,event):
        print('send_task')
        message_problem = event['content_problem']
        message_answear = event['content_answer']
        task_name = event['task_name']
        user_answer = event['user_answer']
        id = event['id']

        print('id' + str(id))
        user_points = event['user_points']
        max_points = event['max_points']
        author = event['author']
        await self.send(text_data=json.dumps({
            'type': 'task_with_answer',
            'message_problem': message_problem,
            'answer':message_answear,
            'author': author,
            'user_answer': user_answer,
            'id': id,
            'user_points': user_points,
            'max_points': max_points,
            'task_name': task_name
        }))
    async def chat_message(self, event):
        message = event['content']
        author = event['author']
        is_fetch = event['fetch']
        avatar_link = event['avatar_link']

        await self.send(text_data=json.dumps({
            'type': 'chat_message',
            'content': message,
            'author': author,
            'avatar_link': avatar_link,
            'fetch': is_fetch
        }))
    pass
