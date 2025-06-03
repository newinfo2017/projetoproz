# criar_banco_local.py
import sqlite3

conn = sqlite3.connect("banco_local.db")
cursor = conn.cursor()

# Tabela Produtos
cursor.execute('''
CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT,
    preco REAL,
    cor TEXT,
    tamanho TEXT,
    marca TEXT,
    fabricante TEXT,
    categoria TEXT,
    especificacoes TEXT
)
''')

# Tabela Clientes
cursor.execute('''
CREATE TABLE IF NOT EXISTS clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    email TEXT,
    senha TEXT,
    data_nascimento TEXT,
    telefone TEXT,
    mensagem TEXT,
    genero TEXT
)
''')

conn.commit()
conn.close()
print("Banco criado com sucesso!")
