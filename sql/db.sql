CREATE DATABASE IF NOT EXISTS ApiTechnical;
USE ApiTechnical;

CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- almacenará la contraseña hasheada
    rol ENUM('admin', 'user') NOT NULL DEFAULT 'user'
);

CREATE TABLE Projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    startDate DATE,
    finalDate DATE,
    state ENUM('No started', 'In progress', 'Completed') NOT NULL DEFAULT 'No started',
    userId INT,
    FOREIGN KEY (userId) REFERENCES Users(id)
);

CREATE TABLE Tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    creationDate DATE,
    updateDate DATE,
    state ENUM('Pending', 'In progress', 'Completed') NOT NULL DEFAULT 'Pending',
    projectId INT,
    FOREIGN KEY (projectId) REFERENCES Projects(id)
);


INSERT INTO Users (name, email, password, rol) VALUES ('Admin', 'admin@example.com', '123456', 'admin');
INSERT INTO Users (name, email, password, rol) VALUES ('User1', 'user1@example.com', '123456', 'user');
INSERT INTO Users (name, email, password, rol) VALUES ('User2', 'user2@example.com', '123456', 'user');

INSERT INTO Projects (name, description, startDate, finalDate, state, userId) VALUES ('Project1', 'Description', '2024-06-21', '2024-07-04', 'In progress', 1);
INSERT INTO Projects (name, description, startDate, finalDate, state, userId) VALUES ('Project2', 'Description', '2024-06-21', '2024-07-04', 'No started', 2);
INSERT INTO Projects (name, description, startDate, finalDate, state, userId) VALUES ('Project3', 'Description', '2024-06-21', '2024-07-04', 'Completed', 2);

INSERT INTO Tasks (name, description, creationDate, updateDate, state, projectId) VALUES ('Task1', 'Description', '2024-06-22', '2024-07-06', 'In progress', 1);
INSERT INTO Tasks (name, description, creationDate, updateDate, state, projectId) VALUES ('Task2', 'Description', '2024-06-22', '2024-07-06', 'Pending', 2);
INSERT INTO Tasks (name, description, creationDate, updateDate, state, projectId) VALUES ('Task3', 'Description', '2024-06-22', '2024-07-06', 'Completed', 2);