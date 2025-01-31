USE fruits_db;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(254) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    image_path VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS fruits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    price DECIMAL(5,2) NOT NULL,
    image_path VARCHAR(255)
);

INSERT INTO users (name, email, password, image_path) VALUES
('John Doe', 'john.doe@example.com', 'password', 'https://cdn-icons-png.flaticon.com/512/9187/9187604.png'), 
('Jane Smith', 'jane.smith@example.com', 'password', 'https://cdn-icons-png.flaticon.com/512/9187/9187604.png');

INSERT INTO fruits (name, description, price, image_path) VALUES
('Apple', 'Crisp and sweet red apple', 150.99, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvM2jLdOR_nEIinl_2x_MXaA9yvbWQO8OHEQ&s'),
('Banana', 'Fresh yellow banana', 250.99, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvM2jLdOR_nEIinl_2x_MXaA9yvbWQO8OHEQ&s'),
('Orange', 'Juicy seedless orange', 65.49, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvM2jLdOR_nEIinl_2x_MXaA9yvbWQO8OHEQ&s'),
('Grapes', 'Sweet green grapes', 150.99, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvM2jLdOR_nEIinl_2x_MXaA9yvbWQO8OHEQ&s'),
('Mango', 'Ripe tropical mango', 80.50, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvM2jLdOR_nEIinl_2x_MXaA9yvbWQO8OHEQ&s'),
('Pineapple', 'Sweet golden pineapple', 290.25, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvM2jLdOR_nEIinl_2x_MXaA9yvbWQO8OHEQ&s'),
('Strawberry', 'Fresh red strawberries', 450.75, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvM2jLdOR_nEIinl_2x_MXaA9yvbWQO8OHEQ&s'),
('Watermelon', 'Large juicy watermelon', 90.99, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvM2jLdOR_nEIinl_2x_MXaA9yvbWQO8OHEQ&s'),
('Kiwi', 'Organic green kiwi', 180.99, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvM2jLdOR_nEIinl_2x_MXaA9yvbWQO8OHEQ&s'),
('Blueberry', 'Fresh pack of blueberries', 150.25, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvM2jLdOR_nEIinl_2x_MXaA9yvbWQO8OHEQ&s');
