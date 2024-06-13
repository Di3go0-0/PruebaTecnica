CREATE DATABASE IF NOT EXISTS PruebaTecnica;
USE PruebaTecnica;

CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL, -- almacenará la contraseña hasheada
    rol ENUM('admin', 'usuario') NOT NULL DEFAULT 'usuario'
);

CREATE TABLE Proyecto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fechaInicio DATE,
    fechaFin DATE,
    estado ENUM('no iniciado', 'en progreso', 'completado') NOT NULL DEFAULT 'no iniciado',
    usuarioId INT,
    FOREIGN KEY (usuarioId) REFERENCES Usuario(id)
);

CREATE TABLE Tarea (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fechaCreacion DATE,
    fechaActualizacion DATE,
    estado ENUM('pendiente', 'en progreso', 'completada') NOT NULL DEFAULT 'pendiente',
    proyectoId INT,
    FOREIGN KEY (proyectoId) REFERENCES Proyecto(id)
);