# API Server

基于 Express + SQLite 的 RESTful API 服务器

## 🚀 快速开始

### 安装依赖
```bash
npm install
```

### 启动服务器
```bash
npm start
```

服务器将在 http://localhost:3000 启动

## 📚 API 端点

### 认证 (Authentication)

#### 注册
```
POST /api/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}

Response:
{
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com"
  }
}
```

#### 登录
```
POST /api/auth/login
Content-Type: application/json

{
  "username": "testuser",
  "password": "password123"
}

Response:
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com"
  }
}
```

#### 获取当前用户
```
GET /api/auth/me
Authorization: Bearer <token>

Response:
{
  "id": 1,
  "username": "testuser",
  "email": "test@example.com",
  "created_at": "2026-03-06T02:00:00.000Z"
}
```

### 用户 (Users)

#### 获取所有用户
```
GET /api/users
Authorization: Bearer <token>
```

#### 获取用户详情
```
GET /api/users/:id
Authorization: Bearer <token>
```

### 文章 (Posts)

#### 获取所有文章
```
GET /api/posts
```

#### 获取文章详情
```
GET /api/posts/:id
```

#### 创建文章
```
POST /api/posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My First Post",
  "content": "This is my first post content"
}
```

#### 更新文章
```
PUT /api/posts/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content"
}
```

#### 删除文章
```
DELETE /api/posts/:id
Authorization: Bearer <token>
```

## 🔐 安全特性

- 密码使用 bcrypt 加密
- JWT 认证
- CORS 已启用
- 请求体大小限制
- SQL 注入防护（使用参数化查询）

## 📁 数据库

- SQLite 数据库文件: `database.sqlite`
- 自动初始化用户和文章表

## 🔧 环境变量

创建 `.env` 文件：

```
PORT=3000
JWT_SECRET=your-secret-key-here
```

## 🧪 测试

使用 curl 或 Postman 测试 API：

```bash
# 注册
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"123456"}'

# 登录
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"123456"}'
```

---

*创建时间: 2026-03-06*
*技术栈: Node.js, Express, SQLite, JWT, bcrypt*
