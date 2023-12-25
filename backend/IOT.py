# 导入paho-mqtt客户端库
import paho.mqtt.client as mqtt
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


# 定义一个回调函数，当连接到mqtt服务器时调用
def on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))
    # 订阅一个主题
    client.subscribe("testapp")


# 定义一个回调函数，当收到mqtt服务器发送的消息时调用
def on_message(client, userdata, msg):
    # print(msg.payload.decode('utf-8'))
    res = json.loads(msg.payload.decode('utf-8'))
    sql1 = f'''
    UPDATE iot_device 
    SET value = {res['value']}, alert = {res['alert']} 
    WHERE ID = '{res['iD']}'
    '''
    sql2 = f'''
    INSERT INTO iot_message (ID, info, lng, lat, timestamp) 
    VALUES ('{res['iD']}', '{res['info']}', {res['lng']}, {res['lat']}, {res['timestamp']});
    '''

    db_cursor.execute(sql1)
    db_cursor.execute(sql2)
    db_connection.commit()


# 创建一个mqtt客户端对象
client = mqtt.Client()
# 设置连接和消息的回调函数
client.on_connect = on_connect
client.on_message = on_message

# 连接到mqtt服务器，需要提供服务器的地址和端口
client.connect("127.0.0.1", 7990, 60)

# 启动一个循环，处理网络事件和调度回调函数
client.loop_forever()
