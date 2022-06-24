let nomeDigitado = prompt("Digite seu lindo nome");
nomeDigitado = {name: nomeDigitado};

let promisse = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", nomeDigitado)

promisse.then(entrarNoChat);
promisse.catch(mensagemErro);


// Verificar se continua online
let chat = document.querySelector("ul");

function entrarNoChat(exito){
console.log("aeee cadastrou");
console.log(nomeDigitado);
console.log(exito);


chat.innerHTML+= 
`
<li class="container-mensagem fluxo">
<span class="mensagem">
<em class="horario">(23:49:09) </em> <em class="usuario"> ${nomeDigitado.name} </em> <em class="acaoFluxo">entra na sala...</em>
</span>
</li>
`

}

function mensagemErro(erro){

    console.log("ahhh n foi");
    console.log(`erro foi: ${erro}`);
}