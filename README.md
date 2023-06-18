# "Google Classroom"-like site built with Django
Get started: 

1. Clone the repository `git clone https://github.com/LuckyMan26/checkYourKnowledge`
2. Move to the newly created folder `cd checkYourKnowledge`
3. Set up a virtual environment `python -m venv env`
4. Start the virtual environment `source env/Scripts/activate`
5. Update pip `python -m pip install --upgrade pip`
6. Install all dependencies `python -m pip install --no-cache-dir -r requirements.txt`
7. Move to the Django files `cd djangoApp`
8. OPTIONALLY, if you want to delete all the previous information about classes, users, etc. - execute `python manage.py flush`. Then set up local migrations: `python manage.py makemigrations chatrooms`, `python manage.py makemigrations account` and then `python manage.py migrate`
9. Open the site `python manage.py runserver`. If it gives an error try to change the port, for example - `python manage.py runserver 7000` (by default port is 8000).

# Used patterns
1. Command Pattern
2. Decorator Pattern
3. Observer Pattern
4. Stategy Pattern
5. Factory Pattern
6. JSON Serialization Pattern
7. Model-View-Template (MVT) Pattern (interpretation of MVC pattern where Controller is the “view”, and the View is the “template”)
8. Front Controller Pattern
9. Template-View Pattern
10. Singleton Pattern
