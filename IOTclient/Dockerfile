# 构建阶段
FROM maven:3.8.4-openjdk-11-slim AS build


WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn clean package

# 
FROM openjdk:11-jre-slim

WORKDIR /app

COPY --from=build /app/target/iotclient-1.0.0.jar .
COPY iot.properties .

# 复制 Maven 依赖项到工作目录的 lib 目录
RUN mkdir -p lib
COPY --from=build /root/.m2/repository/org/eclipse/paho/org.eclipse.paho.client.mqttv3/1.2.5/org.eclipse.paho.client.mqttv3-1.2.5.jar lib/
COPY --from=build /root/.m2/repository/com/alibaba/fastjson/1.2.75/fastjson-1.2.75.jar lib/

CMD ["java", "-cp", ".:iotclient-1.0.0.jar:lib/*", "cn.edu.zju.cs.bs.IOTClient"]
