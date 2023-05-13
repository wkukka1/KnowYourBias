import requests

BASE = 'http://127.0.0.1:5000/'

response = requests.put(BASE + '''/knowyourbiasapi?url=https://www.foxnews.com/politics/house-step-gutting-bidens-400-billion-student-loan-handout''')


print(response.json())
