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


#Screenshots 
Log-in window:
![django_proj](https://github.com/LuckyMan26/checkYourKnowledge/assets/90770582/f1d2367b-6382-4981-a590-e9b6a66a1292)

Main window:
![Screenshot 2023-06-26 at 18-37-52 Log-in](https://github.com/LuckyMan26/checkYourKnowledge/assets/90770582/bfef914d-158a-4163-966f-7e1862495ddf)

Classroom:
![Screenshot 2023-06-26 at 18-38-17 ClassRoom](https://github.com/LuckyMan26/checkYourKnowledge/assets/90770582/cbf2673a-09f9-4959-ab1b-f54e6974cfda)
Task solving:
![Screenshot 2023-06-26 at 18-39-33 Create Task](https://github.com/LuckyMan26/checkYourKnowledge/assets/90770582/145907de-1c79-4218-ad27-b36475c02b3e)
