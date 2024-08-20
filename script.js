const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Dimensões do canvas
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Bola
let ballX = canvasWidth / 2;
let ballY = canvasHeight - 50;
let ballRadius = 10;
let ballSpeedX = 2;
let ballSpeedY = -4;

// Cesto
let basketX = canvasWidth / 2;
let basketY = 10;
let basketWidth = 50;
let basketHeight = 10;

// Placar
let score = 0;

// Função para desenhar a bola
function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = 'orange';
  ctx.fill();
  ctx.closePath();
}

// Função para desenhar o cesto
function drawBasket() {
  ctx.fillStyle = 'brown';
  ctx.fillRect(basketX - basketWidth / 2, basketY, basketWidth, basketHeight);
}

// Função para atualizar o placar
function updateScore() {
  ctx.font = '20px Arial';
  ctx.fillStyle = 'black';
  ctx.fillText('Placar: ' + score, 10, 30);
}

// Função para atualizar a posição da bola
function updateBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Colisão com as bordas
  if (ballX + ballRadius > canvasWidth || ballX - ballRadius < 0) {
    ballSpeedX = -ballSpeedX;
  }
  if (ballY - ballRadius < 0) {
    ballSpeedY = -ballSpeedY;
  }

  // Colisão com o cesto
  if (ballX > basketX - basketWidth / 2 &&
      ballX < basketX + basketWidth / 2 &&
      ballY + ballRadius > basketY &&
      ballY < basketY + basketHeight) {
    score++;
    ballX = canvasWidth / 2;
    ballY = canvasHeight - 50;
  }

  // Bola cai fora do canvas
  if (ballY + ballRadius > canvasHeight) {
    ballX = canvasWidth / 2;
    ballY = canvasHeight - 50;
  }
}

// Função para limpar o canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

// Função para atualizar o jogo
function updateGame() {
  clearCanvas();
  updateBall();
  drawBall();
  drawBasket();
  updateScore();
}

// Iniciar o jogo
setInterval(updateGame, 10);