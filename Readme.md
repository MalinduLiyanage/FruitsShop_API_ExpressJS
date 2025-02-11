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
   git clone https://github.com/your-repo-name.git
   cd your-repo-name
   ```
2. **Build and Run with Docker**  
   ```
   docker-compose up --build  
   ```
3. **Access the API** 
The server is running on
   ```
   http://localhost/
   ```

## 📌 API Endpoints

1. **Signup for an user Account**
```
POST /signup
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