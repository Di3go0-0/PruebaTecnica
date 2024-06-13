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