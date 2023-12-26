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
        print(str(e))
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
        print(str(e))
        return jsonify({'error': str(e)}), 500


@app.route('/devices', methods=['GET'])
def get_devices():
    try:
        query = "SELECT * FROM iot_device"
        db_cursor.execute(query)
        devices = db_cursor.fetchall()
        db_connection.commit()

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
        print(str(e))
        return jsonify({'error': str(e)}), 500


@app.route('/devices/add', methods=['POST'])
def add_device():
    try:
        data = request.get_json()
        print(data)
        if 'ID' not in data or 'name' not in data or 'value' not in data or 'alert' not in data:
            return jsonify({'error': 'ID, Name, value, type, and alert are required'}), 400

        ID = int(data['ID'])
        name = data['name']
        value = int(data['value'])
        alert = int(data['alert'])
        if 'type' in data:
            device_type = data['type']
            insert_query = "INSERT INTO iot_device (ID, name, value, type, alert) VALUES (%s, %s, %s, %s, %s)"
            db_cursor.execute(insert_query, (ID, name, value, device_type, alert))
        else:
            insert_query = "INSERT INTO iot_device (ID, name, value, alert) VALUES (%s, %s, %s, %s)"
            db_cursor.execute(insert_query, (ID, name, value, alert))

        db_connection.commit()
        return jsonify({'message': 'Device added successfully'})

    except Exception as e:
        print(str(e))
        return jsonify({'error': str(e)}), 500


@app.route('/devices/update', methods=['POST'])
def update_device():
    try:
        data = request.get_json()

        if 'ID' not in data or 'name' not in data or 'value' not in data or 'type' not in data or 'alert' not in data:
            return jsonify({'error': 'ID, Name, value, type, and alert are required'}), 400

        ID = int(data['ID'])
        name = data['name']
        value = int(data['value'])
        device_type = data['type']
        alert = int(data['alert'])

        update_query = "UPDATE iot_device SET name = %s, value = %s, type = %s, alert = %s WHERE ID = %s"
        db_cursor.execute(update_query, (name, value, device_type, alert, ID))
        db_connection.commit()

        return jsonify({'message': 'Device updated successfully'})

    except Exception as e:
        print(str(e))
        return jsonify({'error': str(e)}), 500


@app.route('/devices/delete', methods=['POST'])
def delete_device():
    try:
        data = request.get_json()

        if 'ID' not in data:
            return jsonify({'error': 'Device ID is required'}), 400

        ID = int(data['ID'])

        delete_query = "DELETE FROM iot_device WHERE ID = %s"
        db_cursor.execute(delete_query, (ID,))
        db_connection.commit()

        return jsonify({'message': 'Device deleted successfully'})

    except Exception as e:
        print(str(e))
        return jsonify({'error': str(e)}), 500


@app.route('/search', methods=['POST'])
def search_messages():
    try:
        data = request.get_json()

        if 'ID' not in data:
            return jsonify({'error': 'Device ID is required'}), 400

        deviceId = int(data['ID'])

        query = "SELECT * FROM iot_message WHERE ID = %s ORDER BY timestamp DESC LIMIT 50"
        db_cursor.execute(query, (deviceId,))
        messages = db_cursor.fetchall()
        db_connection.commit()

        messages_list = []
        for message in messages:
            message_dict = {
                'ID': message[0],
                'info': message[1],
                'lng': message[2],
                'lat': message[3],
                'timestamp': message[4]
            }
            messages_list.append(message_dict)

        return jsonify(messages_list)

    except Exception as e:
        print(str(e))
        return jsonify({'error': str(e)}), 500


@app.route('/device/statistics', methods=['GET'])
def get_device_statistics():
    try:
        # Total Devices
        total_query = "SELECT COUNT(*) FROM iot_device"
        db_cursor.execute(total_query)
        total = db_cursor.fetchone()[0]

        # Alert Devices
        alert_query = "SELECT COUNT(*) FROM iot_device WHERE alert <> 0"
        db_cursor.execute(alert_query)
        alert = db_cursor.fetchone()[0]

        # Online Devices
        online_query = "SELECT COUNT(DISTINCT ID) FROM iot_message"
        db_cursor.execute(online_query)
        online = db_cursor.fetchone()[0]

        db_connection.commit()

        return jsonify({'total': total, 'alert': alert, 'online': online})

    except Exception as e:
        print(str(e))
        return jsonify({'error': str(e)}), 500


@app.route('/device/data', methods=['GET'])
def get_device_data():
    try:
        # Query to get message count for each device ID
        data_query = """
                SELECT ID, COUNT(*) as value
                FROM iot_message
                GROUP BY ID
            """
        db_cursor.execute(data_query)
        data = db_cursor.fetchall()
        db_connection.commit()

        # Convert the result to a list of dictionaries
        data_list = [{'name': row[0], 'value': row[1]} for row in data]

        return jsonify(data_list)

    except Exception as e:
        print(str(e))
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run('127.0.0.1', port=5000, debug=True)
