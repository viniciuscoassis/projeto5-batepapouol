
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

    manter.catch(saiuDaSala); 
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

// buscando as mensagens
function buscarMensagens(){
    let promisseMensagens = axios.get('http://mock-api.driven.com.br/api/v6/uol/messages');

    promisseMensagens.then(mensagemSucesso);
    promisseMensagens.catch(mensagemErro);
}

function saiuDaSala(){
    chat.innerHTML+= 
`
<li class="container-mensagem fluxo">
<span class="mensagem">
<em class="horario">(${horas}:${minutos}:${segundos}) </em> <em class="usuario"> ${nomeDigitado.name} </em> <em class="acaoFluxo">saiu da sala...</em>
</span>
</li>
`
}
// postar mensagens
let objetoEnviado;
function enviarMensagem(){
    let input = document.querySelector(".mensagemASerEnviada");
    let mensagemEnviada = input.value;

    objetoEnviado = {
        from: nomeDigitado.name,
        to: "Todos",
        text: mensagemEnviada,
        type: "message"
    }
    let promisseMensagemEnviada = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages",objetoEnviado);
    promisseMensagemEnviada.then(mensagemSucesso);
    promisseMensagemEnviada.catch(mensagemErro);

}

function mensagemErro(erro){

    console.log("ahhh n deu pra enviar a mensagens");
    console.log(`erro foi: ${erro}`);
}
function mensagemSucesso(exito){

    console.log("deu certo de enviar as mensagens");
    console.log(`o retorno foi: ${exito}`);
}