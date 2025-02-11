# Fruits App Express.js API with MySQL, NginX & Docker

This is a simple Express.js backend with authentication (JWT) and MySQL integration, all containerized using Docker. NginX reverse proxy is used to handle requests.

## 🚀 Getting Started

### Prerequisites

- **Docker** installed on your system  
- **Docker Compose** (optional but recommended)  

---

## 🛠 Setting Up & Running the Server

1. **Clone the Repository**  
   ```sh
   git clone https://github.com/MalinduLiyanage/FruitsShop_API_ExpressJS.git
   cd FruitsShop_API_ExpressJS
   ```
2. **Build and Run with Docker**  
   ```
   docker-compose up --build  
   ```
3. **Access the API** 
The server is running on
   ```
   http://localhost
   ```

## 📌 API Endpoints for the User

1. **Signup for an user Account**
```
POST /api/signup
```
Request Body
   ```
   {
  "name": "Malindu",
  "email": "malindu@gmail.com",
  "password": "password"
   }
   ```
Sample Response
   ```
   {
    "message": "User registered",
    "userId": 14
   }
   ``` 

2. **Login to an user Account**
```
POST /api/login
```
Request Body
   ```
   {
  "email": "malindu@gmail.com",
  "password": "password"
   }
   ```
Sample Response
   ```
   {
    "message": "Login successful",
    "token": <JWT Token>
   }
   ``` 
3. **Get Users List**
```
GET /api/users
```
Request Headers
   ```
   Authorization : Bearer <JWT Token>
   ```
Sample Response
   ```
   {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "image_path": "https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
   },...
   ``` 

4. **Get Loggedin User Info**
This request is only working for the logged in user. Other user info cannot be obtained.
```
GET /api/users/<user_id>
```
Request Headers
   ```
   Authorization : Bearer <JWT Token>
   ```
Sample Response
   ```
   {
    "id": 1,
    "name": "Malindu",
    "email": "malindu@gmail.com",
    "password": "jfruihf47rjfuwyd84ir04t-o54gjireg854t05ig9hefki954",
    "image_path": null
   }
   ```  

5. **Update Loggedin User Info**
This request is only working for the logged in user. Other user info cannot be updated.
```
PUT /api/users/<user_id>
```
Request Headers
   ```
   Authorization : Bearer <JWT Token>
   ```
Request Body
   ```
   {
  "email": "malinduupdated@gmail.com",
  "password": "passwordupdated"
   }
   ```

6. **Delete Loggedin User Info**
This request is only working for the logged in user. Other user info cannot be deleted.
```
DELETE /api/users/<user_id>
```
Request Headers
   ```
   Authorization : Bearer <JWT Token>
   ```

7. **Update Loggedin User Profile Picture**
This request is only working for the logged in user. Other user info cannot be updated.
```
POST /api/users/<user_id>/upload
```
Request Headers
   ```
   Authorization : Bearer <JWT Token>
   ```
Request Body (form-data)
   ```
   Key : image 
   Key Type : File
   Value : <sample.jpg>
   ```

## 📌 API Endpoints for Products

1. **Get all Fruits list**
```
GET /api/fruits
```
Request Headers
   ```
   Authorization : Bearer <JWT Token>
   ```

2. **Get a Single Fruit info**
```
GET /api/fruits/<fruit_id>
```
Request Headers
   ```
   Authorization : Bearer <JWT Token>
   ```


## 📌 API Endpoints for the HomePage
   ```
   http://localhost/
   ```




