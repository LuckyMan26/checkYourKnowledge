from .Command import *

class CommandFactory:
    @staticmethod
    def create_command(consumer, command_name, data):
        print(command_name)
        if command_name == 'fetch':
            return FetchCommand(consumer, data)
        elif command_name == 'new_message':
            return NewMessageCommand(consumer, data)
        elif command_name == 'new_task':
            return NewTaskCommand(consumer, data)
        elif command_name == 'check_answer':
            return CheckAnswerCommand(consumer, data)
        elif command_name == 'save_answer':
            return SaveAnswerCommand(consumer, data)
        elif command_name == 'get_task':
            return GetTask(consumer, data)
        elif command_name == 'fetch_task':
            return FetchTasks(consumer, data)
        elif command_name == 'generate_invite':
            return GenerateInviteLink(consumer, data)
        elif command_name == 'get_users_answers':
            return GetUsersAnswers(consumer, data)
        elif command_name == 'change_score':
            return ChangeScoreCommand(consumer,data)
        elif command_name == 'create_quiztask':
            return CreateQuizTaskCommand(consumer,data)
        elif command_name == 'fetch_quizzes':
            return FetchQuizzes(consumer,data)
        elif command_name == 'get_quiz':
            return GetQuiz(consumer,data)
        elif command_name == 'save_answer_quiz':
            return SaveQuizAnswer(consumer,data)
        return None