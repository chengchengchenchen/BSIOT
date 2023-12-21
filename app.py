# app.py
from flask import Flask, render_template, request, flash, jsonify

app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':  # 判断是否是 POST 请求
        # 获取请求中的json数据
        data = request.get_json()
        # 打印json数据
        print(data)
        # 返回一个json格式的响应
        return jsonify(data)

    return render_template('index.html')


if __name__ == '__main__':
    app.run('127.0.0.1', port=5000, debug=True)
