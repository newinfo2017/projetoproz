/* * Script para validação de formulário */
function validarFormulario(event){
    event.preventDefault();

/*   Validação de Campos Obrigatórios Senha */
    const senha = document.getElementById("senha").value;
    const confirmarsenha = document.getElementById("confirmar_senha").value;

    if(senha !== confirmarsenha){
        alert("As senhas não coincidem!");
        return false;
    }

/*   Validação de Campos Obrigatórios E-mail */
    const email = document.getElementById('email').value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if(!emailRegex.test(email)) {
            alert('Por favor, insira um e-mail válido!');
            return false;
        }

/*   Validação de Campos Obrigatórios Termos */
    if(!document.getElementById('termos').checked) {
        alert('Você deve aceitar os termos de uso!');
        return false;
    }

/*   Validação de Campos Obrigatórios Telefone */
    if(!document.getElementById('telefone').value) {
        const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
        alert('Você deve preencher o campo Telefone!');
        return false;
    }

/*   Validação de Campos Obrigatórios Alert Envio */
    alert('Formulário enviado com sucesso!');
    event.target.submit();
    return true;

    // Validação em Tempo Real
    document.getElementById('email').addEventListener('input', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(this.value)) {
            this.setCustomValidity('E-mail inválido!');
        } else {
            this.setCustomValidity('');
        }
    });

    // Validação de Confirmação de Senha
    document.getElementById('confirmar_senha').addEventListener('input', function() {
        if(this.value !== document.getElementById('senha').value) {
            this.setCustomValidity('Senhas não coincidem!');
        } else {
            this.setCustomValidity('');
        }
    });
}

/* * Script para validação de CEP */
document.getElementById('cep').addEventListener('input', function(e) {
    // Aplica máscara de CEP
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 5) {
        value = value.replace(/^(\d{5})(\d)/, '$1-$2');
    }
    e.target.value = value.substring(0, 9);
    
    // Validação em tempo real
    validarCEP(value);
});

document.getElementById('cep').addEventListener('blur', async function() {
    const cep = this.value.replace(/\D/g, '');
    if (cep.length === 8) {
        await buscarCEP(cep);
    }
});

async function buscarCEP(cep) {
    try {
        showLoading(true);
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        
        if (data.erro) {
            showError('cepError', 'CEP não encontrado');
            resetAddressFields();
        } else {
            preencherEndereco(data);
            showError('cepError', '');
        }
    } catch (error) {
        showError('cepError', 'Erro na busca do CEP');
        resetAddressFields();
    } finally {
        showLoading(false);
    }
}

function preencherEndereco(data) {
    document.getElementById('rua').value = data.logradouro || '';
    document.getElementById('nr').value = data.logradourocomplemento || '';
    document.getElementById('bairro').value = data.bairro || '';
    document.getElementById('cidade').value = data.localidade || '';
    document.getElementById('uf').value = data.uf || '';
    document.getElementById('estado').value = data.uf || '';
    document.querySelector('.address-fields').classList.add('active');
}

function validarCEP(cepValue) {
    const cepClean = cepValue.replace(/\D/g, '');
    const errorElement = document.getElementById('cepError');
    
    if (cepClean.length === 8) {
        errorElement.textContent = '';
        return true;
    }
    
    if (cepClean.length > 0 && cepClean.length < 8) {
        errorElement.textContent = 'CEP incompleto';
        return false;
    }
    
    errorElement.textContent = '';
    return false;
}

function resetAddressFields() {
    document.querySelector('.address-fields').classList.remove('active');
    ['rua', 'bairro', 'cidade', 'uf'].forEach(id => {
        document.getElementById(id).value = '';
    });
}

function showLoading(show) {
    document.getElementById('cepLoading').style.display = show ? 'block' : 'none';
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = message ? 'block' : 'none';
}
