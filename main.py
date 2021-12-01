from flask import Flask, render_template, redirect, request, make_response
from flask.helpers import send_from_directory
from flask_bootstrap import Bootstrap
from bson import json_util
from bson.objectid import ObjectId
import pymongo
from pprint import pprint
from datetime import datetime
from pymongo import cursor

from werkzeug.wrappers import response

app = Flask(__name__)
app.config['SECRET_KEY'] = "sfdsfasdf546a51afdasdfadf"
Bootstrap(app)


# Connecting to Database
client = pymongo.MongoClient("mongodb://localhost:27017")
db = client["coffeeAndWiki"]


@app.route("/", methods=['GET', 'POST'])
def get_all_cafe():
    if request.method == "POST":
        print(f"Search Query: {request.form['q']}")
    cafes = db.cafe.find({})
    cafe_list = []
    for cafe in cafes:
        cafe_record = {
            "name": cafe["name"],
            "id": str(cafe["_id"]),
            "address": cafe["address"]
        }
        cafe_list.append(cafe_record)
    return render_template('index.html', cafe_list=cafe_list, show_landing=True)


@app.route("/cafes/<string:cafe_id>")
def get_cafe(cafe_id):
    cafe = db.cafe.find_one({"_id": ObjectId(cafe_id)})
    return render_template('cafe.html', cafe=cafe)


@app.get("/picture/<string:name>")
def get_picture(name):
    response = make_response(send_from_directory('static', f'img/{name}'))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.get("/search")
def search():
    q = request.args.getlist('query')[0]
    search_parameter = request.args.getlist('parameter')[0]
    cafe_list = []
    if search_parameter == "Name":
        cursor = db.cafe.find({"name": q})
    else:
        cursor = db.cafe.find({f"address.{search_parameter.lower()}": q})
    for cafe in cursor:
        cafe_record = {
            "name": cafe["name"],
            "id": str(cafe["_id"]),
            "address": cafe["address"]
        }
        cafe_list.append(cafe_record)
    return render_template('index.html', cafe_list=cafe_list, show_landing=False)


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)

# cafe_list = [
#     {
#         "name": "Happy's Cafe",
#         "address": {
#             "main": "304, Beverly Park",
#             "locality": "Mira Road",
#             "city": "Mumbai",
#             "state": "Maharashtra",
#             "country": "India"
#         },
#         "contact": {
#             "email": "happycafe@gmail.com",
#             "phone": 4984865515,
#             "website": "xyz@email.com"
#         },
#         "owner": "Sanskar Biyani",
#         "established": datetime(2021, 2, 14),
#         "features": {
#             "socket": "Yes",
#             "socketRating": 4,
#             "wifi": "Yes",
#             "wifiRating": 3
#         }
#     },
#     {
#         "name": "Rahul Cafe",
#         "address": {
#             "main": "304, Beverly Park",
#             "locality": "Mira Road",
#             "city": "Mumbai",
#             "state": "Maharashtra",
#             "country": "India",
#             "near": "Hanuman Mandir"
#         },
#         "contact": {
#             "email": "rahulcafe@gmail.com",
#             "phone": 4984865515,
#             "website": "xyz@email.com"
#         },
#         "owner": "Sanskar Biyani",
#         "established": datetime(2021, 2, 14),
#         "features": {
#             "socket": "Yes",
#             "socketRating": 4,
#             "wifi": "Yes",
#             "wifiRating": 3
#         }
#     },
#     {
#         "name": "Cafe Nostalgia",
#         "address": {
#             "main": "1st Floor, Building no 2, Vardhaman Complex, Golden Nest",
#             "locality": "Bhayander",
#             "city": "Mumbai",
#             "state": "Maharashtra",
#             "country": "India",
#             "near": "Hanuman mandir"
#         },
#         "contact": {
#             "email": "cafenostalgia@gmail.com",
#             "phone": 4984865515,
#             "website": "xyz@email.com"
#         },
#         "owner": "Sanskar Biyani",
#         "established": datetime(2021, 2, 14),
#         "features": {
#             "socket": "Yes",
#             "socketRating": 4,
#             "wifi": "Yes",
#             "wifiRating": 3
#         }
#     }
# ]

# db.cafe.insert_many(cafe_list)
# db.cafe.update_one(
#     {"_id": ObjectId("61827e3443c0e2ba73195726")}, {"$set": {"description": "a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis varius quam quisque id diam vel quam elementum"}})

# pprint(db.cafe.find_one({"_id": ObjectId("61827e3443c0e2ba73195726")}))

# menu = {
#     "Burning Beverage": {
#         "Americano(Black Coffe)": 100,
#         "Cappuccino": 100,
#         "Latte": 100,
#         "Hot Chocolate": 100,
#         "Mocha": 100,
#         "Irish Coffee": 100
#     },
#     "Hot Teas": {
#         "Masala Tea": 100,
#         "Ginger Tea": 100,
#         "Black Tea": 100,
#         "Irani Tea": 100,
#         "Lemon Ginger Tea": 100,
#         "Mint Tea": 100,
#         "Green Tea": 100
#     },
#     "Cafe Frappers": {
#         "Cold Coffee": 140,
#         "Irish Delight": 160,
#         "Mocha Shake": 160,
#         "Rich Coffee": 160,
#         "Brownie Coffee": 180,
#         "Oreo Shake": 180,
#         "Kitkat Shake": 180,
#         "Cookie Shake": 180
#     },
#     "Ice Teas": {
#         "Lemon Ice Tea": 120,
#         "Peach Ice Tea": 120,
#         "Cranberry Tea": 120,
#         "Mint Ice Tea": 120,
#         "Watermelon Ice Tea": 120
#     },
#     "Lemonades": {
#         "Classic lemonade": 100,
#         "Kiwi Lemonade": 120,
#         "Watermelon Lemonade": 120,
#         "Ocean Lemonade": 120,
#         "Masala Lemonade": 120
#     },
#     "Mocktales": {
#         "Lost Island": 160,
#         "Mojito": 140,
#         "Green Island": 140,
#         "Blue Nirvana": 140,
#         "Green Apple": 140
#     },
#     "Deserts": {
#         "Sizzling Browning": 160,
#         "Coffee Afogate": 120,
#         "Strawberry Delight": 140,
#         "Brownie Delight": 140,
#         "Coffee Chocolate Sunday": 140
#     }
# }

# db.cafe.update_one({"name": "Cafe Nostalgia"}, {"$set": {"menu": menu}})
