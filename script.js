let chat = document.querySelector("ul");
pegarMensagens();


function pegarMensagens(){
    let promomissePegarMensagens = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promomissePegarMensagens.then(carregarMensagens);
    let todasMensagens = chat.querySelectorAll("li");
    let t = todasMensagens.length-1;
    todasMensagens[t].scrollIntoView();
    
}

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


function entrarNoChat(){

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
    promisseMensagemEnviada.then(pegarMensagens);
    promisseMensagemEnviada.catch(refrescoPagina);
}
// deixar mais dinamico
setInterval(pegarMensagens,2000)

function refrescoPagina(){
    window.location.reload();
}

function mensagemExitoNome(exito){
    console.log("Deu certo de postar nome");
    console.log(exito);
}

function mensagemErroNome(erro){
    console.log("Não deu certo de postar nome");
    console.log(erro);
}
let mensagens;
function carregarMensagens(mensagens){

    mensagens = mensagens.data;
    chat.innerHTML = "";
for (let i=0; i< mensagens.length; i++){


    // mensagem publica
    if (mensagens[i].type == "message" && mensagens[i].to == "Todos"){
        chat.innerHTML += `
      <li class="container-mensagem todos">
      <span class="mensagem">
      <em class="horario">(${mensagens[i].time}) </em> <em class="usuario"> ${mensagens[i].from} </em> <em>para </em> <em class="usuario"> ${mensagens[i].to} </em>: <em class="mensagemEnviada">${mensagens[i].text}</em>
      </span>
      </li>
      `;
    }
    else if (mensagens[i].type == "status" && mensagens[i].to == "Todos"){
        chat.innerHTML += 
        
        `<li class="container-mensagem fluxo">
        <span class="mensagem">
      <em class="horario">(${mensagens[i].time}) </em> <em class="usuario "> ${mensagens[i].from} </em> <em class="mensagem">${mensagens[i].text}</em>
      </span>
      </li> `;
    }
   else if (mensagens[i].type == "private_message" && nomeDigitado == mensagens[i].to){
`<li class="container-mensagem reservadamente">
<span class="mensagem">
<em class="horario">(${mensagens[i].time}) </em> <em class="usuario remetente"> ${mensagens[i].from} </em> <em class="modoMensagem">reservadamente para </em> <em class="usuario destinatario"> ${mensagens[i].to} </em>: <em class="mensagemEnviada">${mensagens[i].text} </em>
</span>
</li>`
   }

    
    
   // mensagem privada
}
}
