from email.mime import base
from flask import Flask, jsonify, render_template, redirect, request, make_response, url_for
from flask.helpers import flash, send_from_directory
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


@app.route("/")
def get_all_cafe():
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


@app.route("/cafe/<string:cafe_id>")
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
    print(request.full_path)
    if request.args.getlist('query'):
        q = request.args.getlist('query')[0]
        search_parameter = request.args.getlist('parameter')[0]
        print(f'Query: {q}\t\tParameter: {search_parameter}')
        cafe_list = []
        # Matches if word is present inside the statement.
        if search_parameter == "Name":
            cursor = db.cafe.find({"name": {"$regex": f".*{q}.*"}})
        else:
            cursor = db.cafe.find(
                {f"address.{search_parameter.lower()}": {"$regex": f".*{q}.*"}})
        for cafe in cursor:
            cafe_record = {
                "name": cafe["name"],
                "id": str(cafe["_id"]),
                "address": cafe["address"]
            }
            cafe_list.append(cafe_record)
        return render_template('index.html', cafe_list=cafe_list, show_landing=False)
    else:
        cafes = db.cafe.find({})
        cafe_list = []
        for cafe in cafes:
            cafe_record = {
                "name": cafe["name"],
                "id": str(cafe["_id"]),
                "address": cafe["address"]
            }
            cafe_list.append(cafe_record)
        return render_template('index.html', cafe_list=cafe_list, show_landing=False)


@app.get("/register")
def register():
    return render_template('cafeRegistration.html')


@app.post("/register")
def register_post():
    received_data = request.get_json()
    pprint(received_data)
    doc_id = db.cafe.insert_one(received_data).inserted_id
    base_url = request.base_url.split("/")[:-1]
    deli = "/"
    url = deli.join(base_url) + "/" + url_for('get_cafe', cafe_id=doc_id)
    print(base_url)
    # print(url_for('get_cafe', cafe_id=doc_id))
    res = {
        "redirectURL": url
    }
    return jsonify(res), 200


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
