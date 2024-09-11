var estadoEscolhido;

document.getElementById('estados').addEventListener('change', function (evento){
    if(evento.target.value === "centro-oeste"){
        let elems = document.getElementsByClassName('ocultavel');
        for (let i = 0; i < elems.length; i++){
            elems[i].style.display = 'none';
            elems[i].checked = false;
        }
    } else{
        let elems = document.getElementsByClassName('ocultavel');
        for (let i = 0; i < elems.length; i++){
            elems[i].style.display = 'inline';
        }
    }

    estadoEscolhido = evento.target.value;
});

document.getElementById('reset').addEventListener('click', function(){
    estadoEscolhido = undefined;
    let elems = document.getElementsByClassName('ocultavel');
        for (let i = 0; i < elems.length; i++){
            elems[i].style.display = 'inline';
        }
})

document.getElementById('formulario').addEventListener('submit', function (event) {
    event.preventDefault(); 

    
    resetErrors();

    let temErro = false;
    
    const nome = document.getElementById('nome')
    if (nome.value.trim().length < 3) {
        mostrarErro(nome, 'O nome deve ter pelo menos 3 caracteres.');
        temErro = true;
        
    }

    
    const sobrenome = document.getElementById('sobrenome');
    if (sobrenome.value.trim() === '') {
        mostrarErro(sobrenome, 'O sobrenome é obrigatório.');
        temErro = true;
    }

    
    const email = document.getElementById('email');
    if (!validarEmail(email.value)) {
        mostrarErro(email, 'Por favor, insira um e-mail válido no formato nn@nn.nn.');
        temErro = true;
    }


    const website = document.getElementById('website');
    if (website.value.trim() !== '' && !validarWebSite(website.value)) {
        mostrarErro(website, 'O website deve ser um URL válido no formato http://xxx.xx.');
        temErro = true;
    }

    const activity = document.querySelectorAll('[name = atividade]');
    if (validarAtividades(activity) == false){
        mostrarErro(atividades, 'Selecione no mínimo 1 e no máximo 3 atividades');
        temErro = true;
    }

    const dataini = document.getElementById('dataini');
    const datafim = document.getElementById('datafim');
    const hoje = new Date().toISOString().split('T')[0];

    if (estadoEscolhido === "" || estadoEscolhido === undefined){
        mostrarErro(estados, 'Selecione o estado em que irá atuar');
        temErro = true;
    }

    if (dataini.value < hoje) {
        mostrarErro(dataini, 'A data inicial não pode ser menor que a data atual.');
        temErro = true;
    }

    if (datafim.value <= dataini.value) {
        mostrarErro(datafim, 'A data final deve ser maior que a data inicial.');
        temErro = true;
    }
    
    if (temErro) {
        return;
    }
    
    console.log('Formulário enviado com sucesso!');
});

function resetErrors() {
    const mensagensErro = document.querySelectorAll('.error-message');
    mensagensErro.forEach(message => {
        message.textContent = '';
    });
    const inputs = document.querySelectorAll('.error');
    inputs.forEach(input => {
        input.classList.remove('error');
    });
}


function mostrarErro(input, message) {
    input.classList.add('error');
    const mensagemErro = document.getElementById(`${input.id}-error`);
    mensagemErro.textContent = message;
}


function validarEmail(email) {
    const parts = email.split('@');
    if (parts.length !== 2) return false;
    const domainParts = parts[1].split('.');
    return domainParts.length >= 2 && domainParts[0] !== '' && domainParts[1] !== '';
}


function validarWebSite(url) {
    return (url.startsWith('http://') || url.startsWith('https://')) && url.includes('.');
}

function validarAtividades(atividade){
    let taCerto = false;
    let check = 0;
    atividade.forEach(elemento => {
        if (elemento.checked == true){
            check++;
        }
    })

    if(check >= 1 && check <=3){
        taCerto = true;
    }
    return taCerto;
}
