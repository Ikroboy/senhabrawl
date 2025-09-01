
# Jogo da Senha Secreta (versão Brawl Stars)

Este projeto é um jogo de dedução no estilo **"Senha Secreta"**, inspirado no clássico Mastermind, mas usando personagens do universo Brawl Stars. O jogador deve tentar adivinhar a sequência correta em até 3 tentativas.

## 👾 Como funciona

- O sistema gera aleatoriamente uma sequência de **4 personagens** (senha).
- O jogador deve escolher os personagens nas **4 posições** de cada tentativa.
- Após preencher os 4 slots, o jogo avalia a tentativa e fornece um **feedback visual**:
  - ✅ **Check**: Personagem certo na posição certa.
  - 🔄 **Seta**: Personagem certo, mas na posição errada.
  - ❌ **X**: Personagem não faz parte da senha.

O jogador tem **3 chances** para acertar a combinação.

---

## 📁 Estrutura de Arquivos

```
/img
  elPrimo.png
  poco.png
  nita.png
  spike.png
  x.png
  seta.png
  check.png
  return.png
  Tela_do_jogo.png

/css
  style.css

/js
  script.js

index.html
```

---

## 🧠 Lógica Principal

A lógica do jogo está no arquivo `script.js`:

- A senha é gerada aleatoriamente com 4 personagens.
- O jogador interage clicando nos personagens disponíveis para preencher os slots.
- Quando os 4 slots são preenchidos, a função `verificarSenha()` é chamada.
- A função `mostrarFeedbackVisual()` exibe os ícones com base na tentativa e na senha gerada.

---

## 💅 Estilo Visual

O estilo está em `style.css`, com destaque para:

- Feedback visual com `drop-shadow` e ícones de resultado.
- Layout responsivo com Flexbox.
- Fundo com imagem do jogo Brawl Stars para ambientação.

---

## ✨ Créditos

Criado como projeto de aprendizado e diversão!  
Inspirado no jogo físico **Mastermind** com uma pitada de Brawl Stars.