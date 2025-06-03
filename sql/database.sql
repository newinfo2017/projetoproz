-- Banco de Dados MySQL
CREATE DATABASE IF NOT EXISTS produtos_db;
USE produtos_db;

CREATE TABLE IF NOT EXISTS produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    cor VARCHAR(50) NOT NULL,
    tamanho VARCHAR(10),
    marca VARCHAR(100) NOT NULL,
    fabricante VARCHAR(100) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    especificacoes TEXT,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);