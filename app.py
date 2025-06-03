from flask import Flask, render_template, request, redirect
import sqlite3
import os

app = Flask(__name__)

DB_PATH = os.path.join(os.path.dirname(__file__), 'banco_local.db')

def conectar_banco():
    return sqlite3.connect(DB_PATH)

# Página inicial (Index)
@app.route('/')
def index():
    return render_template('index.html')

# Página Sobre
@app.route('/sobre')
def sobre():
    return render_template('sobre.html')

# Página Serviços
@app.route('/servicos')
def servicos():
    return render_template('servicos.html')

# Cadastro de produto
@app.route('/produto', methods=['GET', 'POST'])
def produto():
    if request.method == 'POST':
        dados = (
            request.form.get('produto'),
            request.form.get('descricao'),
            request.form.get('preco'),
            request.form.get('cor'),
            request.form.get('tamanho'),
            request.form.get('marca'),
            request.form.get('fabricante'),
            request.form.get('categoria'),
            request.form.get('especificacoes')
        )
        conn = conectar_banco()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO produtos (nome, descricao, preco, cor, tamanho, marca, fabricante, categoria, especificacoes)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', dados)
        conn.commit()
        conn.close()
        return "Produto cadastrado com sucesso!"
    return render_template('produto.html')

# Cadastro de cliente
@app.route('/contato', methods=['GET', 'POST'])
def contato():
    if request.method == 'POST':
        dados = (
            request.form.get('nome'),
            request.form.get('email'),
            request.form.get('senha'),
            request.form.get('data_nascimento'),
            request.form.get('telefone'),
            request.form.get('mensagem'),
            request.form.get('genero')
        )
        conn = conectar_banco()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO clientes (nome, email, senha, data_nascimento, telefone, mensagem, genero)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', dados)
        conn.commit()
        conn.close()
        return "Cliente cadastrado com sucesso!"
    return render_template('contato.html')

# Consulta de produtos
@app.route('/consultar_produtos')
def consultar_produtos():
    conn = conectar_banco()
    cursor = conn.cursor()
    cursor.execute('SELECT nome, descricao, preco, categoria FROM produtos')
    produtos = cursor.fetchall()
    conn.close()
    return render_template('consultar_produtos.html', produtos=produtos)

if __name__ == '__main__':
    app.run(debug=True)
