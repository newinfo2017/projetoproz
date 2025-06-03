-- Banco de Dados SQLite
CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT NOT NULL,
    preco REAL NOT NULL,
    cor TEXT NOT NULL,
    tamanho TEXT,
    marca TEXT NOT NULL,
    fabricante TEXT NOT NULL,
    categoria TEXT NOT NULL,
    especificacoes TEXT,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);