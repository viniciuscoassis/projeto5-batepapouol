let nomeDigitado;

pedirNome();

function pedirNome(){
    nomeDigitado = {name: prompt("Digite seu lindo nome")};
    postarNome();
}
function postarNome(){
    let promisseNome = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", nomeDigitado);
    promisseNome.catch(tratarErroNome);
    promisseNome.then(entrarNoChat);
}

function tratarErroNome(erro){
    if(erro.response.status == 400){
        pedirNome();
    }
}


// Verificar se continua online
// setInterval(manterConectado,5000);
// function manterConectado(){
//     let manter = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", nomeDigitado);
//     manter.catch(saiuDaSala); 
// }

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
`;
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

}

function mensagemExitoNome(exito){
    console.log("Deu certo de postar nome");
    console.log(exito);
}

function mensagemErroNome(erro){
    console.log("Não deu certo de postar nome");
    console.log(erro);
}
