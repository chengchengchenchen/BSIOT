# BS IOT

## Docker

```bash
docker-compose up --build
```

### windows

在项目根目录下执行命令，打包各个模块；也可以在每个模块下根据`Dockerfile`生成image

### linux

linux系统下在`docker-compose.yml`中为每个模块添加属性，增加`host.docker.internal`，使container间网络通信

```yaml
extra_hosts:
- "host.docker.internal:host-gateway"
```



ps: 

1. 需要注意各进程端口号是否被占用Mosquitto: 1883, mysql: 3306
2. 后端代码在连接数据库时可能会出现docker mysql进程还没启动，代码中已经设置了5次尝试，如果仍然连接失败可以等mysql进程完全启动后再手动拉起后端进程



以下是各个模块说明：

## mosquitto

运行在1883端口，通过`host.docker.internal:1883`访问



## mysql

运行在3306端口，通过`host.docker.internal:3306`访问，目录下包含数据库初始化文件`init.sql`



## mqtt

### client

使用课程提供的java代码实现向mosquitto服务器发送设备信息

### server

IOT.py订阅指定topic并将信息转存到mysql



## frontend

使用React框架，在`/frontend`下打包并运行：

```bash
npm install
npm run build
serve -s /build
```



## backend

使用flask框架，在`/backend`下安装依赖并运行：

```bash
pip install --no-cache-dir -r requirements.txt
python app.py
```

