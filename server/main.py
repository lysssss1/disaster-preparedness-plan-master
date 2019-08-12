from flask import Flask, url_for
from flask import request
from flask import json
from flask import Response
from flask import jsonify
from flaskext.mysql import MySQL
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash
from datetime import datetime

mysql = MySQL()
app = Flask(__name__)
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = '55385823'
app.config['MYSQL_DATABASE_DB'] = 'dppdb'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)

app = Flask(__name__)

@app.errorhandler(404)
def not_found(error=None):
    message = {
            'status': 404,
            'message': 'Not Found: ' + request.url,
    }
    resp = jsonify(message)
    resp.status_code = 404

    return resp


@app.route('/')
def api_root():
    return 'Welcome'


@app.route('/api/login', methods = ['POST'])
def api_login():
    if request.headers['Content-Type'] == 'application/json':
        json_to_python = json.loads(json.dumps(request.json))
        print type(json_to_python)
        username = json_to_python['username']
        password = json_to_python['password']

        cursor = mysql.connect().cursor()
        cursor.execute("SELECT * from users where username='" + username + "'")
        data = cursor.fetchone()
        print data
        if data is None:
            t = {
                'status' : False
            }
            return jsonify(t)
        else:
            password2 = data[2]
            if check_password_hash(password2, password):
                t = {
                    'status' : True,
                    'id' : data[0],
                    'username': data[1]
                }
                return jsonify(t)
            else:
                t = {
                'status' : False
                }
                return jsonify(t)
    else:
        return "Data type is wrong"

@app.route('/api/register', methods = ['POST'])
def api_register():
    if request.headers['Content-Type'] == 'application/json':
        json_to_python = json.loads(json.dumps(request.json))
        print json_to_python
        username = json_to_python['username']
        password = json_to_python['password']
        password = generate_password_hash(password)
        db = mysql.connect()
        cursor1 = db.cursor()
        cursor1.execute("INSERT INTO users (username, password) VALUES ('"+str(username)+"', '"+str(password)+"')")
        db.commit()
        cursor2 = db.cursor()
        cursor2.execute("SELECT * from users where username='" + str(username) + "' and password='" + str(password) + "'")
        data = cursor2.fetchone()
        print data

        t = {
            'status' : True,
            'username': username,
            'id': data[0]
        }
        return jsonify(t)

@app.route('/api/update/basic', methods = ['POST'])
def api_update_basic():
    if request.headers['Content-Type'] == 'application/json':
        json_to_python = json.loads(json.dumps(request.json))
        print json_to_python
        userid = json_to_python['userid']
        location = json_to_python['location']
        days = json_to_python['days']

        db = mysql.connect()
        cursor1 = db.cursor()
        cursor1.execute("UPDATE basic SET userid='"+str(userid)+"', location='"+str(location)+"', days='"+str(days)+"'")
        db.commit()

        t = {
            'status' : True
        }
        return jsonify(t)

@app.route('/api/add/basic', methods = ['POST'])
def api_add_basic():
    if request.headers['Content-Type'] == 'application/json':
        json_to_python = json.loads(json.dumps(request.json))
        print json_to_python
        userid = json_to_python['userid']
        location = json_to_python['location']
        days = json_to_python['days']

        db = mysql.connect()
        cursor1 = db.cursor()
        cursor1.execute("INSERT INTO basic (userid, location, days ) VALUES ('"+str(userid)+"', '"+str(location)+"', '"+str(days)+"')")
        db.commit()

        t = {
            'status' : True
        }
        return jsonify(t)

@app.route('/api/get/basic/<userid>', methods = ['GET'])
def api_basic(userid):
    cursor = mysql.connect().cursor()
    cursor.execute("SELECT * from basic WHERE userid = '"+str(userid)+"'")
    data = cursor.fetchall()
    return jsonify(data)

@app.route('/api/add/memo', methods = ['POST'])
def api_add_memo():
    if request.headers['Content-Type'] == 'application/json':
        json_to_python = json.loads(json.dumps(request.json))
        print json_to_python
        userid = json_to_python['userid']
        title = json_to_python['title']
        content = json_to_python['content']

        db = mysql.connect()
        cursor1 = db.cursor()
        cursor1.execute("INSERT INTO memos (userid, title, content) VALUES ('"+str(userid)+"', '"+str(title)+"', '"+str(content)+"')")
        db.commit()

        t = {
            'status' : True
        }
        return jsonify(t)

@app.route('/api/update/memo', methods = ['POST'])
def api_update_memo():
    if request.headers['Content-Type'] == 'application/json':
        json_to_python = json.loads(json.dumps(request.json))
        print json_to_python
        memoid = json_to_python['memoid']
        title = json_to_python['title']
        content = json_to_python['content']

        db = mysql.connect()
        cursor1 = db.cursor()
        cursor1.execute("UPDATE memos SET title='"+str(title)+"', content='"+str(content)+"' WHERE memoid='" + str(memoid) + "'")
        db.commit()

        t = {
            'status' : True
        }
        return jsonify(t)

@app.route('/api/delete/memo', methods = ['POST'])
def api_delete_memo():
    if request.headers['Content-Type'] == 'application/json':
        json_to_python = json.loads(json.dumps(request.json))
        print json_to_python
        memoid = json_to_python['memoid']

        db = mysql.connect()
        cursor1 = db.cursor()
        cursor1.execute("DELETE FROM memos WHERE memoid = '"+str(memoid)+"'")
        db.commit()

        t = {
            'status' : True
        }
        return jsonify(t)

@app.route('/api/get/memo/<userid>', methods = ['GET'])
def api_memo(userid):
    cursor = mysql.connect().cursor()
    cursor.execute("SELECT * from memos WHERE userid = '"+str(userid)+"'")
    data = cursor.fetchall()
    return jsonify(data)

@app.route('/api/update/communication', methods = ['POST'])
def api_update_communication():
    if request.headers['Content-Type'] == 'application/json':
        json_to_python = json.loads(json.dumps(request.json))
        print json_to_python
        communicationid = json_to_python['communicationid']
        firstname = json_to_python['firstname']
        lastname = json_to_python['lastname']
        phone = json_to_python['phone']
        email = json_to_python['email']

        db = mysql.connect()
        cursor1 = db.cursor()
        cursor1.execute("UPDATE communications SET firstname='"+str(firstname)+"', lastname='"+str(lastname)+"', phone='"+str(phone)+"', email='"+str(email)+"' WHERE communicationid='" + str(communicationid) + "'")
        db.commit()

        t = {
            'status' : True
        }
        return jsonify(t)

@app.route('/api/add/communication', methods = ['POST'])
def api_add_communication():
    if request.headers['Content-Type'] == 'application/json':
        json_to_python = json.loads(json.dumps(request.json))
        print json_to_python
        userid = json_to_python['userid']
        firstname = json_to_python['firstname']
        lastname = json_to_python['lastname']
        phone = json_to_python['phone']
        email = json_to_python['email']

        db = mysql.connect()
        cursor1 = db.cursor()
        cursor1.execute("INSERT INTO communications (userid, firstname, lastname, phone, email ) VALUES ('"+str(userid)+"', '"+str(firstname)+"', '"+str(lastname)+"', '"+str(phone)+"', '"+str(email)+"')")
        db.commit()

        t = {
            'status' : True
        }
        return jsonify(t)

@app.route('/api/delete/communication', methods = ['POST'])
def api_delete_communication():
    if request.headers['Content-Type'] == 'application/json':
        json_to_python = json.loads(json.dumps(request.json))
        print json_to_python
        communicationid = json_to_python['communicationid']

        db = mysql.connect()
        cursor1 = db.cursor()
        cursor1.execute("DELETE FROM communications WHERE communicationid = '"+str(communicationid)+"'")
        db.commit()

        t = {
            'status' : True
        }
        return jsonify(t)

@app.route('/api/get/communication/<userid>', methods = ['GET'])
def api_communication(userid):
    cursor = mysql.connect().cursor()
    cursor.execute("SELECT * from communications WHERE userid = '"+str(userid)+"'")
    data = cursor.fetchall()
    return jsonify(data)

@app.route('/api/update/human', methods = ['POST'])
def api_update_human():
    if request.headers['Content-Type'] == 'application/json':
        json_to_python = json.loads(json.dumps(request.json))
        print json_to_python
        humanid = json_to_python['humanid']
        firstname = json_to_python['firstname']
        lastname = json_to_python['lastname']
        gender = json_to_python['gender']
        birthdate = json_to_python['birthdate']
        birthdate2 = datetime.strptime(birthdate[:-14], "%Y-%m-%d")
        phone = json_to_python['phone']
        health = json_to_python['health']

        db = mysql.connect()
        cursor1 = db.cursor()
        cursor1.execute("UPDATE humans SET firstname='"+str(firstname)+"', lastname='"+str(lastname)+"', gender='"+str(gender)+"', birthdate='"+str(birthdate2)+"', phone='"+str(phone)+"', health='"+str(health)+"' WHERE humanid='" + str(humanid) + "'")
        db.commit()

        t = {
            'status' : True
        }
        return jsonify(t)

@app.route('/api/add/human', methods = ['POST'])
def api_add_human():
    if request.headers['Content-Type'] == 'application/json':
        json_to_python = json.loads(json.dumps(request.json))
        print json_to_python
        userid = json_to_python['userid']
        firstname = json_to_python['firstname']
        lastname = json_to_python['lastname']
        gender = json_to_python['gender']
        birthdate = json_to_python['birthdate']
        birthdate2 = datetime.strptime(birthdate[:-14], "%Y-%m-%d")
        phone = json_to_python['phone']
        health = json_to_python['health']

        db = mysql.connect()
        cursor1 = db.cursor()
        cursor1.execute("INSERT INTO humans (userid, firstname, lastname, gender, birthdate, phone, health ) VALUES ('"+str(userid)+"', '"+str(firstname)+"', '"+str(lastname)+"', '"+str(gender)+"', '"+str(birthdate2)+"', '"+str(phone)+"', '"+str(health)+"')")
        db.commit()

        t = {
            'status' : True
        }
        return jsonify(t)

@app.route('/api/delete/human', methods = ['POST'])
def api_delete_human():
    if request.headers['Content-Type'] == 'application/json':
        json_to_python = json.loads(json.dumps(request.json))
        print json_to_python
        humanid = json_to_python['humanid']

        db = mysql.connect()
        cursor1 = db.cursor()
        cursor1.execute("DELETE FROM humans WHERE humanid = '"+str(humanid)+"'")
        db.commit()

        t = {
            'status' : True
        }
        return jsonify(t)

@app.route('/api/get/human/<userid>', methods = ['GET'])
def api_human(userid):
    cursor = mysql.connect().cursor()
    cursor.execute("SELECT * from humans WHERE userid = '"+str(userid)+"'")
    data = cursor.fetchall()
    return jsonify(data)

@app.route('/api/update/pet', methods = ['POST'])
def api_update_pet():
    if request.headers['Content-Type'] == 'application/json':
        json_to_python = json.loads(json.dumps(request.json))
        print json_to_python
        petid = json_to_python['petid']
        petname = json_to_python['petname']
        pettype = json_to_python['pettype']
        weight = json_to_python['weight']

        db = mysql.connect()
        cursor1 = db.cursor()
        cursor1.execute("UPDATE pets SET petname='"+str(petname)+"', pettype='"+str(pettype)+"', weight='"+str(weight)+"' WHERE petid='" + str(petid) + "'")
        db.commit()

        t = {
            'status' : True
        }
        return jsonify(t)

@app.route('/api/add/pet', methods = ['POST'])
def api_add_pet():
    if request.headers['Content-Type'] == 'application/json':
        json_to_python = json.loads(json.dumps(request.json))
        print json_to_python
        userid = json_to_python['userid']
        petname = json_to_python['petname']
        pettype = json_to_python['pettype']
        weight = json_to_python['weight']

        db = mysql.connect()
        cursor1 = db.cursor()
        cursor1.execute("INSERT INTO pets (userid, petname, pettype, weight ) VALUES ('"+str(userid)+"', '"+str(petname)+"', '"+str(pettype)+"', '"+str(weight)+"')")
        db.commit()

        t = {
            'status' : True
        }
        return jsonify(t)

@app.route('/api/delete/pet', methods = ['POST'])
def api_delete_pet():
    if request.headers['Content-Type'] == 'application/json':
        json_to_python = json.loads(json.dumps(request.json))
        print json_to_python
        petid = json_to_python['petid']

        db = mysql.connect()
        cursor1 = db.cursor()
        cursor1.execute("DELETE FROM pets WHERE petid = '"+str(petid)+"'")
        db.commit()

        t = {
            'status' : True
        }
        return jsonify(t)

@app.route('/api/get/pet/<userid>', methods = ['GET'])
def api_pet(userid):
    cursor = mysql.connect().cursor()
    cursor.execute("SELECT * from pets WHERE userid = '"+str(userid)+"'")
    data = cursor.fetchall()
    return jsonify(data)

@app.route('/api/add/travel', methods = ['POST'])
def api_add_travel():
    if request.headers['Content-Type'] == 'application/json':
        json_to_python = json.loads(json.dumps(request.json))
        print json_to_python
        userid = json_to_python['userid']
        traveltipid = json_to_python['traveltipid']

        db = mysql.connect()
        cursor1 = db.cursor()
        cursor1.execute("INSERT INTO user_traveltips (userid, traveltipid ) VALUES ('"+str(userid)+"', '"+str(traveltipid)+"')")
        db.commit()

        t = {
            'status' : True
        }
        return jsonify(t)

@app.route('/api/delete/travel', methods = ['POST'])
def api_delete_travel():
    if request.headers['Content-Type'] == 'application/json':
        json_to_python = json.loads(json.dumps(request.json))
        print json_to_python
        userid = json_to_python['userid']
        traveltipid = json_to_python['traveltipid']

        db = mysql.connect()
        cursor1 = db.cursor()
        cursor1.execute("DELETE FROM user_traveltips WHERE userid = '"+str(userid)+"' and traveltipid = '"+str(traveltipid)+"'")
        db.commit()

        t = {
            'status' : True
        }
        return jsonify(t)

@app.route('/api/get/travel', methods = ['GET'])
def api_travel():
    cursor = mysql.connect().cursor()
    cursor.execute("SELECT * from traveltips")
    data = cursor.fetchall()
    return jsonify(data)

@app.route('/api/get/travel/<userid>', methods = ['GET'])
def api_user_travel(userid):
    cursor = mysql.connect().cursor()
    cursor.execute("SELECT * from user_traveltips WHERE userid = '"+str(userid)+"'")
    data = cursor.fetchall()
    return jsonify(data)

@app.route('/api/update/userclothingbedding', methods = ['POST'])
def api_update_clothingbedding():
    if request.headers['Content-Type'] == 'application/json':
        json_to_python = json.loads(json.dumps(request.json))
        print json_to_python
        userid = json_to_python['userid']
        clothingbeddingid = json_to_python['clothingbeddingid']
        quantity = json_to_python['quantity']
        if str(quantity)=='0':
            db = mysql.connect()
            cursor1 = db.cursor()
            cursor1.execute("DELETE FROM user_clothing_bedding WHERE userid = '"+str(userid)+"' and clothingbeddingid = '"+str(clothingbeddingid)+"'")
            db.commit()
        else:
            db = mysql.connect()
            cursor1 = db.cursor()
            cursor1.execute("SELECT * FROM user_clothing_bedding WHERE userid = '"+str(userid)+"' and clothingbeddingid = '"+str(clothingbeddingid)+"'")
            data = cursor1.fetchone()
            if data is None:
                cursor2 = db.cursor()
                print data
                cursor2.execute("INSERT INTO user_clothing_bedding (userid, clothingbeddingid, quantity ) VALUES ('"+str(userid)+"', '"+str(clothingbeddingid)+"', '"+str(quantity)+"')")
                db.commit()
            else:
                cursor2 = db.cursor()
                cursor2.execute("UPDATE user_clothing_bedding SET quantity='"+str(quantity)+"' WHERE userid='" + str(userid) + "' AND clothingbeddingid='"+str(clothingbeddingid)+"'")
                db.commit()

        t = {
            'status' : True
        }
        return jsonify(t)

@app.route('/api/get/clothingbedding', methods = ['GET'])
def api_clothingbedding():
    cursor = mysql.connect().cursor()
    cursor.execute("SELECT * from clothing_bedding")
    data = cursor.fetchall()
    return jsonify(data)

@app.route('/api/get/clothingbedding/<userid>', methods = ['GET'])
def api_user_clothingbedding(userid):
    cursor = mysql.connect().cursor()
    cursor.execute("SELECT * from user_clothing_bedding WHERE userid = '"+str(userid)+"'")
    data = cursor.fetchall()
    return jsonify(data)

@app.route('/api/update/userfood', methods = ['POST'])
def api_update_food():
    if request.headers['Content-Type'] == 'application/json':
        json_to_python = json.loads(json.dumps(request.json))
        print json_to_python
        userid = json_to_python['userid']
        foodid = json_to_python['foodid']
        quantity = json_to_python['quantity']
        if str(quantity)=='0':
            db = mysql.connect()
            cursor1 = db.cursor()
            cursor1.execute("DELETE FROM user_food WHERE userid = '"+str(userid)+"' and foodid = '"+str(foodid)+"'")
            db.commit()
        else:
            db = mysql.connect()
            cursor1 = db.cursor()
            cursor1.execute("SELECT * FROM user_food WHERE userid = '"+str(userid)+"' and foodid = '"+str(foodid)+"'")
            data = cursor1.fetchone()
            if data is None:
                cursor2 = db.cursor()
                print data
                cursor2.execute("INSERT INTO user_food (userid, foodid, quantity ) VALUES ('"+str(userid)+"', '"+str(foodid)+"', '"+str(quantity)+"')")
                db.commit()
            else:
                cursor2 = db.cursor()
                cursor2.execute("UPDATE user_food SET quantity='"+str(quantity)+"' WHERE userid='" + str(userid) + "' AND foodid='"+str(foodid)+"'")
                db.commit()

        t = {
            'status' : True
        }
        return jsonify(t)

@app.route('/api/get/food', methods = ['GET'])
def api_food():
    cursor = mysql.connect().cursor()
    cursor.execute("SELECT * from food")
    data = cursor.fetchall()
    return jsonify(data)

@app.route('/api/get/food/<userid>', methods = ['GET'])
def api_user_food(userid):
    cursor = mysql.connect().cursor()
    cursor.execute("SELECT * from user_food WHERE userid = '"+str(userid)+"'")
    data = cursor.fetchall()
    return jsonify(data)

@app.route("/authenticate")
def authenticate():
    username = request.args.get('UserName')
    password = request.args.get('Password')
    cursor = mysql.connect().cursor()
    cursor.execute("SELECT * from User where Username='" + username + "' and Password='" + password + "'")
    data = cursor.fetchone()
    if data is None:
     return "Username or Password is wrong"
    else:
     return "Logged in successfully"

@app.route('/articles')
def api_articles():
    return 'List of ' + url_for('api_articles')

@app.route('/articles/<int:articleid>')
def api_article(articleid):
    return 'You are reading ' + articleid

@app.route('/api/hello', methods = ['GET'])
def api_hello():
    data = {
        'hello'  : 'world',
        'number' : 3
    }
    js = json.dumps(data)

    resp = Response(js, status=200, mimetype='application/json')
    #resp.headers['Link'] = 'http://luisrei.com'

    return resp


@app.route('/messages', methods = ['POST'])
def api_message():

    if request.headers['Content-Type'] == 'text/plain':
        return "Text Message: " + request.data

    elif request.headers['Content-Type'] == 'application/json':
        return "JSON Message: " + json.dumps(request.json)

    elif request.headers['Content-Type'] == 'application/octet-stream':
        f = open('./binary', 'wb')
        f.write(request.data)
        f.close()
        return "Binary message written!"

    else:
        return "415 Unsupported Media Type ;)"

@app.route('/users/<userid>', methods = ['GET'])
def api_users(userid):
    users = {'1':'john', '2':'steve', '3':'bill'}

    if userid in users:
        return jsonify({userid:users[userid]})
    else:
        return not_found()


if __name__ == '__main__':
    app.run()
