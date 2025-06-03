document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const container = document.getElementById('produtosContainer');
    const loading = document.getElementById('loading');
    const errorMessage = document.getElementById('errorMessage');

    const showLoading = () => {
        loading.style.display = 'block';
        container.innerHTML = '';
        errorMessage.style.display = 'none';
    };

    const showError = (message) => {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        loading.style.display = 'none';
    };

    const fetchProdutos = async (search = '') => {
        showLoading();
        
        try {
            const response = await fetch(`/produtos?search=${encodeURIComponent(search)}`);
            
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            
            const produtos = await response.json();
            
            if (produtos.length === 0) {
                container.innerHTML = '<p class="no-results">Nenhum produto encontrado</p>';
            } else {
                renderProdutos(produtos);
            }
            
        } catch (error) {
            showError(`Falha ao carregar produtos: ${error.message}`);
        } finally {
            loading.style.display = 'none';
        }
    };

    const renderProdutos = (produtos) => {
        container.innerHTML = produtos.map(produto => `
            <div class="produto-card">
                <h3>${produto.nome}</h3>
                <p class="produto-detail">${produto.descricao}</p>
                <p class="produto-detail">Preço: R$ ${produto.preco.toFixed(2)}</p>
                <p class="produto-detail">Categoria: ${produto.categoria}</p>
                <p class="produto-detail">Marca: ${produto.marca}</p>
                <p class="produto-detail">Cor: ${produto.cor}</p>
                ${produto.especificacoes ? `<p class="produto-detail">Especificações: ${produto.especificacoes}</p>` : ''}
            </div>
        `).join('');
    };

    // Event Listeners
    searchButton.addEventListener('click', () => fetchProdutos(searchInput.value));
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') fetchProdutos(searchInput.value);
    });

    // Carregar inicial
    fetchProdutos();
});