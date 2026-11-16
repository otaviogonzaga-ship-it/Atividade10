const palavras = [
  "javascript",
  "html",
  "css",
  "internet",
  "navegador",
  "programacao",
  "computador",
  "teclado",
  "monitor",
  "tecnologia",
  "desenvolvimento",
  "algoritmo"
];

let palavraSecreta;
let letrasCorretas = [];
let letrasUsadas = [];
let tentativas = 6;
let jogoEncerrado = false;

const elementoPalavra = document.getElementById("palavra");
const elementoTentativas = document.getElementById("tentativas");
const inputLetra = document.getElementById("letra");
const mensagem = document.getElementById("mensagem");
const elementoLetrasUsadas = document.getElementById("letras-usadas");
const botaoTentar = document.getElementById("btn-tentar");
const botaoReiniciar = document.getElementById("btn-reiniciar");

function iniciarJogo() {
  const indice = Math.floor(Math.random() * palavras.length);
  palavraSecreta = palavras[indice];

  tentativas = 6;
  letrasCorretas = [];
  letrasUsadas = [];
  jogoEncerrado = false;

  mensagem.textContent = "Boa sorte! Digite uma letra.";
  elementoTentativas.textContent = tentativas;
  elementoLetrasUsadas.textContent = "Nenhuma";
  inputLetra.value = "";
  inputLetra.disabled = false;
  botaoTentar.disabled = false;

  atualizarPalavra();
  inputLetra.focus();
}

function atualizarPalavra() {
  let exibicao = "";

  for (let i = 0; i < palavraSecreta.length; i++) {
    const letra = palavraSecreta[i];

    if (letrasCorretas.includes(letra)) {
      exibicao += letra + " ";
    } else {
      exibicao += "_ ";
    }
  }

  elementoPalavra.textContent = exibicao.trim();
}

function venceu() {
  for (let i = 0; i < palavraSecreta.length; i++) {
    const letra = palavraSecreta[i];

    if (!letrasCorretas.includes(letra)) {
      return false;
    }
  }

  return true;
}

function encerrarJogo() {
  jogoEncerrado = true;
  inputLetra.disabled = true;
  botaoTentar.disabled = true;
}

function verificarLetra() {
  if (jogoEncerrado) {
    return;
  }

  const letra = inputLetra.value.toLowerCase().trim();
  inputLetra.value = "";

  if (!/^[a-záàâãéèêíïóôõöúçñ]$/i.test(letra)) {
    mensagem.textContent = "Digite apenas uma letra válida.";
    inputLetra.focus();
    return;
  }

  if (letrasUsadas.includes(letra)) {
    mensagem.textContent = "Essa letra já foi utilizada.";
    inputLetra.focus();
    return;
  }

  letrasUsadas.push(letra);

  if (palavraSecreta.includes(letra)) {
    letrasCorretas.push(letra);
    mensagem.textContent = "Você acertou!";
  } else {
    tentativas--;
    mensagem.textContent = "Você errou! Tente outra letra.";
  }

  atualizarPalavra();
  elementoTentativas.textContent = tentativas;
  elementoLetrasUsadas.textContent = letrasUsadas.join(", ");

  if (venceu()) {
    mensagem.textContent = "Parabéns! Você venceu!";
    encerrarJogo();
  } else if (tentativas === 0) {
    mensagem.textContent = "Você perdeu! A palavra era: " + palavraSecreta;
    encerrarJogo();
  } else {
    inputLetra.focus();
  }
}

botaoTentar.addEventListener("click", verificarLetra);
botaoReiniciar.addEventListener("click", iniciarJogo);

// Desafio extra: permite tentar uma letra pressionando Enter.
inputLetra.addEventListener("keydown", function(evento) {
  if (evento.key === "Enter") {
    verificarLetra();
  }
});

iniciarJogo();
