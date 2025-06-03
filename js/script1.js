document.getElementById('formProduto').addEventListener('submit', function(event) {
    event.preventDefault();
    clearErrors();

    let isValid = true;

    // Validação do Nome do Produto
    const produto = document.getElementById('produto');
    if (produto.value.trim() === '') {
        showError('errorProduto', 'Por favor, insira o nome do produto.');
        isValid = false;
    }

    // Validação da Descrição
    const descricao = document.getElementById('descricao');
    if (descricao.value.trim() === '') {
        showError('errorDescricao', 'Por favor, insira a descrição.');
        isValid = false;
    }

    // Validação do Preço
    const preco = document.getElementById('preco');
    if (preco.value === '' || isNaN(preco.value) || parseFloat(preco.value) <= 0) {
        showError('errorPreco', 'Por favor, insira um preço válido.');
        isValid = false;
    }

    // Validação da Cor
    const cor = document.getElementById('cor');
    if (cor.value === '') {
        showError('errorCor', 'Por favor, selecione uma cor.');
        isValid = false;
    }

    // Validação da Marca
    const marca = document.getElementById('marca');
    if (marca.value.trim() === '') {
        showError('errorMarca', 'Por favor, insira a marca.');
        isValid = false;
    }

    // Validação do Fabricante
    const fabricante = document.getElementById('fabricante');
    if (fabricante.value.trim() === '') {
        showError('errorFabricante', 'Por favor, insira o fabricante.');
        isValid = false;
    }

    // Validação da Categoria
    const categoria = document.getElementById('categoria');
    if (categoria.value === '') {
        showError('errorCategoria', 'Por favor, selecione uma categoria.');
        isValid = false;
    }

    if (isValid) {
        this.submit(); // Envia o formulário se tudo estiver válido
    }
});

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearErrors() {
    const errors = document.getElementsByClassName('error-message');
    for (let error of errors) {
        error.textContent = '';
        error.style.display = 'none';
    }
}

// Função de validação mantida igual
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formProduto');
    const btnConsultar = document.getElementById('btnConsultar');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (validarFormulario()) {
            await enviarDados();
        }
    });

    btnConsultar.addEventListener('click', async () => {
        await consultarProdutos();
    });
});

async function enviarDados() {
    const formData = {
        nome: document.getElementById('produto').value,
        descricao: document.getElementById('descricao').value,
        preco: parseFloat(document.getElementById('preco').value),
        cor: document.getElementById('cor').value,
        tamanho: document.getElementById('tamanho').value,
        marca: document.getElementById('marca').value,
        fabricante: document.getElementById('fabricante').value,
        categoria: document.getElementById('categoria').value,
        especificacoes: document.getElementById('especificacoes').value
    };

    try {
        const response = await fetch('http://127.0.0.1:5500/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert('Produto cadastrado com sucesso!');
            form.reset();
        } else {
            alert('Erro ao cadastrar produto');
        }
    } catch (error) {
        console.error('Erro:', error);
    }
}

async function consultarProdutos() {
    try {
        const response = await fetch('http://127.0.0.1:5500/produtos');
        const produtos = await response.json();
        exibirResultados(produtos);
    } catch (error) {
        console.error('Erro:', error);
    }
}

function exibirResultados(produtos) {
    const divResultados = document.getElementById('resultados');
    divResultados.innerHTML = '';

    if (produtos.length === 0) {
        divResultados.innerHTML = '<p>Nenhum produto encontrado</p>';
        return;
    }

    const tabela = document.createElement('table');
    tabela.innerHTML = `
        <thead>
            <tr>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Marca</th>
            </tr>
        </thead>
        <tbody>
            ${produtos.map(produto => `
                <tr>
                    <td>${produto.nome}</td>
                    <td>${produto.descricao}</td>
                    <td>R$ ${produto.preco.toFixed(2)}</td>
                    <td>${produto.categoria}</td>
                    <td>${produto.marca}</td>
                </tr>
            `).join('')}
        </tbody>
    `;

    divResultados.appendChild(tabela);
}
