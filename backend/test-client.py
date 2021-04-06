import requests
import json

base = "http://localhost:4000/api/"

if False:
	r = requests.post(base + "users/", data={
		'email': 'test@test.de',	
		'password': 'dieTerPetEr123!',
	})
	print(r)
	print(r.text)

r = requests.post(base + "users/login", data={
	'email': 'test@test.de',	
	'password': 'dieTerPetEr123!',
})

if r.status_code != 200:
	print(r)
	print(r.text)

headers = {
	"Authorization": "Bearer " + r.json()["token"]
}
userId = r.json()["userId"]

r = requests.get(base + "characters/", headers=headers)
print(r)
print(r.text)

if True:
	r = requests.post(base + "characters/", headers=headers, data={
		"user": userId,
		"data": json.dumps({
			"name": "Testname",
			"race": "Alb"
		})
	})
	print(r)
	print(r.text)

r = requests.get(base + "characters/606c7eea0bc13b56fc364b25", headers=headers)
print(r)
print(r.text)
