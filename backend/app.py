# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import mysql.connector

# 创建一个数据库连接对象
db_connection = mysql.connector.connect(
    host="127.0.0.1",
    user="root",
    passwd="20020601Q"
)

db_cursor = db_connection.cursor()
db_cursor.execute("USE sys")
app = Flask(__name__)
CORS(app)


@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()

        if 'username' not in data or 'password' not in data:
            return jsonify({'error': 'Username and password are required'}), 400

        username = data['username']
        password = data['password']

        query = "SELECT * FROM user WHERE username=%s AND password=%s"
        db_cursor.execute(query, (username, password))
        res = db_cursor.fetchone()

        if res:
            return jsonify({'message': 'Login successful', 'username': username})
        else:
            return jsonify({'error': 'Invalid username or password'}), 401

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()

        if 'username' not in data or 'password' not in data or 'email' not in data:
            return jsonify({'error': 'Username, password, and email are required'}), 400

        username = data['username']
        password = data['password']
        email = data['email']

        # Check
        check_query = "SELECT * FROM user WHERE username=%s OR email=%s"
        db_cursor.execute(check_query, (username, email))
        existing_user = db_cursor.fetchone()
        if existing_user:
            return jsonify({'error': 'Username or email already exists'}), 409

        insert_query = "INSERT INTO user (username, password, email) VALUES (%s, %s, %s)"
        db_cursor.execute(insert_query, (username, password, email))
        db_connection.commit()

        return jsonify({'message': 'Registration successful', 'username': username})

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/devices', methods=['GET'])
def get_initial_devices():
    try:
        query = "SELECT * FROM iot_device"
        db_cursor.execute(query)
        devices = db_cursor.fetchall()
        db_connection.commit()
        # print(devices)
        devices_list = []
        for device in devices:
            device_dict = {
                'ID': device[0],
                'name': device[1],
                'value': device[2],
                'type': device[3],
                'alert': device[4]
            }
            devices_list.append(device_dict)
        return jsonify(devices_list)

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/devices/add', methods=['POST'])
def add_devices():
    try:
        query = "SELECT * FROM user"
        db_cursor.execute(query)
        devices = db_cursor.fetchall()
        db_connection.commit()
        # print(devices)
        return jsonify('success'), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/devices/update', methods=['POST'])
def update_devices():
    return


@app.route('/devices/delete', methods=['POST'])
def delete_devices():
    return


if __name__ == '__main__':
    app.run('127.0.0.1', port=5000, debug=True)
