FROM mysql:latest

# 设置环境变量，用于初始化数据库
ENV MYSQL_DATABASE=sys \
    MYSQL_ALLOW_EMPTY_PASSWORD=true \
    MYSQL_USER=qjc \
    MYSQL_PASSWORD=20020601Q

# 复制本地的初始化 SQL 文件到容器内的默认目录
COPY init.sql /docker-entrypoint-initdb.d/

EXPOSE 3306
