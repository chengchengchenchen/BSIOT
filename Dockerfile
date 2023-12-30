# 阶段1: 构建前端
FROM node:14 AS frontend_builder

COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# 阶段2: 构建后端
FROM python:3.8-slim AS backend_builder

COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# 阶段3: 最终镜像
FROM openjdk:11-jre-slim

# 复制前端构建结果
COPY --from=frontend_builder /build/ ./frontend/build/

# 复制后端构建结果
COPY --from=backend_builder /usr/local/lib/python3.8/site-packages/ /usr/local/lib/python3.8/site-packages/

# 复制整个项目到容器中
COPY . .

# 暴露前端和后端端口
EXPOSE 5000 8000 8080

# 启动前端和后端
CMD ["sh", "-c", "serve -s frontend/build & python backend/IOT.py & python backend/app.py"]
