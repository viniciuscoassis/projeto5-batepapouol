

let nomeDigitado;

  nomeDigitado = prompt("Digite seu lindo nome");
  nomeDigitado = {name: nomeDigitado};

let promisse = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", nomeDigitado)

promisse.catch(mensagemErro);
promisse.then(entrarNoChat);


// Verificar se continua online
setInterval(manterConectado,5000);
function manterConectado(){
    let manter = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", nomeDigitado);
    manter.then(mensagemSucesso);
    manter.catch(mensagemErro);
}



// verificando horário atual
let dataAtual = new Date();
let horas = dataAtual.getHours();
let minutos = dataAtual.getMinutes();
let segundos = dataAtual.getSeconds();

// mensagem de status de fluxo
let chat = document.querySelector("ul");

function entrarNoChat(exito){

chat.innerHTML+= 
`
<li class="container-mensagem fluxo">
<span class="mensagem">
<em class="horario">(${horas}:${minutos}:${segundos}) </em> <em class="usuario"> ${nomeDigitado.name} </em> <em class="acaoFluxo">entra na sala...</em>
</span>
</li>
`
}

function mensagemErro(erro){

    console.log("ahhh n foi");
    console.log(`erro foi: ${erro}`);
}
function mensagemSucesso(exito){

    console.log("ta funcionando");
    console.log(`o retorno foi: ${exito}`);
}