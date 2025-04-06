// Dados do jogo
const imagens = document.querySelectorAll('.imagem-hover');
const tentativasContainer = document.querySelector('.tentativas-container');
const botaoVoltar = document.getElementById('botao-voltar');

const escolha = [
  { nome: "elPrimo" },
  { nome: "poco" },
  { nome: "nita" },
  { nome: "spike" }
];

let senha = [];
let tentativaAtual = 0;
let slotAtual = 0;
const maxTentativas = 3;

// Gera senha aleatória
function gerarSenha() {
  senha = [];
  for (let i = 0; i < 4; i++) {
    const num = Math.floor(Math.random() * escolha.length);
    senha.push(escolha[num].nome);
  }
  console.log(`Senha secreta = ${senha.join(', ')}`);
}
gerarSenha();

// Utilitário: pegar os slots da tentativa atual
function getSlotsDaTentativa(tentativaIndex) {
  return document.querySelectorAll(`.tentativa-${tentativaIndex} .slot`);
}

// Clique nas imagens
imagens.forEach(img => {
  img.addEventListener('click', () => {
    if (tentativaAtual >= maxTentativas) return;

    const slotsAtuais = getSlotsDaTentativa(tentativaAtual);
    if (slotAtual < 4) {
      const imagemSelecionada = img.cloneNode(true);
      imagemSelecionada.classList.add('selecionada');
      slotsAtuais[slotAtual].innerHTML = '';
      slotsAtuais[slotAtual].appendChild(imagemSelecionada);
      slotAtual++;
    }

    if (slotAtual === 4) {
      setTimeout(() => verificarSenhaMultipla(), 300);
    }
  });
});

// Botão de apagar última imagem
botaoVoltar.addEventListener('click', () => {
  if (slotAtual > 0) {
    const slotsAtuais = getSlotsDaTentativa(tentativaAtual);
    slotAtual--;
    slotsAtuais[slotAtual].innerHTML = '';
  }
});

function mostrarMensagem(texto, cor = "#fff") {
  const mensagemDiv = document.getElementById("mensagem-resultado");
  mensagemDiv.textContent = texto;
  mensagemDiv.style.color = cor;
  mensagemDiv.classList.add("mostrar");

  setTimeout(() => {
    mensagemDiv.classList.remove("mostrar");
  }, 3000);
}

function mostrarFeedbackVisual(tentativa, senha) {
    // Remove feedback anterior
    document.querySelectorAll('.tentativa').forEach(tentativaEl => {
      tentativaEl.querySelectorAll('.feedback-icon').forEach(icon => icon.remove());
    });
  
    tentativa.forEach((nome, index) => {
      const tentativaEl = document.querySelector(`.tentativa-${tentativaAtual}`);
      const slot = tentativaEl.querySelectorAll('.slot')[index];
      let feedbackImg = document.createElement("img");
      feedbackImg.classList.add("feedback-icon");
  
      if (senha[index] === nome) {
        feedbackImg.src = "img/check.png"; // posição correta
      } else if (senha.includes(nome)) {
        feedbackImg.src = "img/seta.png"; // está na senha, posição errada
      } else {
        feedbackImg.src = "img/x.png"; // não está na senha
      }
  
      slot.appendChild(feedbackImg);
    });
  }  

function verificarSenhaMultipla() {
  const slotsAtuais = getSlotsDaTentativa(tentativaAtual);
  const tentativa = [];

  slotsAtuais.forEach(slot => {
    const img = slot.querySelector("img");
    tentativa.push(img?.dataset.nome || '');
  });

  const acertou = tentativa.join() === senha.join();

  if (acertou) {
    mostrarMensagem("🎉 Você acertou a senha!", "#0f0");
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    document.getElementById("tentar-novamente").style.display = "block";
  } else {
    mostrarMensagem("❌ Tentativa incorreta!", "#f00");
    mostrarFeedbackVisual(tentativa, senha);

    tentativaAtual++;
    slotAtual = 0;

    if (tentativaAtual >= maxTentativas) {
      mostrarMensagem(`🔒 Fim do jogo! A senha era: ${senha.join(', ')}`, "#ff0");
      document.getElementById("tentar-novamente").style.display = "block";
    }
  }

  console.log("Tentativa:", tentativa.join(", "));
  console.log("Senha:", senha.join(", "));
}

// Botão "Tentar Novamente"
document.getElementById("tentar-novamente").addEventListener("click", () => {
  // Limpa todos os slots
  for (let i = 0; i < maxTentativas; i++) {
    const slots = getSlotsDaTentativa(i);
    slots.forEach(slot => slot.innerHTML = '');
  }

  tentativaAtual = 0;
  slotAtual = 0;
  gerarSenha();

  document.getElementById("tentar-novamente").style.display = "none";
});