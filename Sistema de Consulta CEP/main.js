function ConsultarCep() {
    let cepParametro = document.getElementById('consultar-cep').value;
    let nomeCliente = document.getElementById('nome-cliente').value;

    var validaCep = /^[0-9]{8}$/;

    if (validaCep.test(cepParametro)) {
        fetch(`https://api.postmon.com.br/v1/cep/${cepParametro}`).then(retorno_cep => {
            return retorno_cep.json();
        }).then(preenchimento_campo => {
            document.getElementById("nome").value = nomeCliente;
            document.getElementById("cep").value = preenchimento_campo.cep;
            document.getElementById("endereco").value = preenchimento_campo.logradouro ? preenchimento_campo.logradouro : 'sem endereço';
            document.getElementById("cidade").value = preenchimento_campo.cidade;
            document.getElementById("estado").value = preenchimento_campo.estado;
            document.getElementById("bairro").value = preenchimento_campo.bairro ? preenchimento_campo.bairro : 'sem endereço';
        })
    } else {
        alert('Opsss... cep invalido!')
    }
}

function Limpar() {
    ConsultarCep();
    document.getElementById("limpar").value = '';
}



