let numeroSecreto = 0;
let intentos = 0;
let numeroMaximo = 20;
let juegoTerminado = false;

function asignarTextoElemento(elemento, texto) {
  let elementoHTML = document.querySelector(elemento);
  elementoHTML.innerHTML = texto;
}

function verificarIntento() {
  if (juegoTerminado) {
    return;
  }

  let numeroDeUsuario = parseInt(document.getElementById("valorUsuario").value);

  if (
    isNaN(numeroDeUsuario) ||
    numeroDeUsuario < 1 ||
    numeroDeUsuario > numeroMaximo
  ) {
    asignarTextoElemento(
      ".texto__parrafo",
      `Por favor, introduce un número válido entre 1 y ${numeroMaximo}.`
    );
    limpiarCaja();
    return;
  }

  if (numeroDeUsuario === numeroSecreto) {
    asignarTextoElemento(".texto__parrafo", "¡ACERTASTE EL NUMERO!");
    cambiarImagen("./img/ia_happy.png");
    document
      .querySelector(".texto__parrafo")
      .classList.add("texto__parrafo-special");
    startMatrixEffect();
    finalizarJuego();
    return;
  }

  intentos++;

  if (numeroDeUsuario > numeroSecreto) {
    asignarTextoElemento(
      ".texto__parrafo",
      `Intento ${intentos}: El número secreto es menor.`
    );
  } else if (numeroDeUsuario < numeroSecreto) {
    asignarTextoElemento(
      ".texto__parrafo",
      `Intento ${intentos}: El número secreto es mayor.`
    );
  }

  if (intentos === 4 && numeroDeUsuario !== numeroSecreto) {
    asignarTextoElemento(
      ".texto__parrafo",
      `¡Perdiste! El número secreto era ${numeroSecreto}.`
    );
    cambiarImagen("./img/ia_sad.png");
    startMatrixEffect();
    finalizarJuego();
  }

  limpiarCaja();
}

function limpiarCaja() {
  document.querySelector("#valorUsuario").value = "";
}

function generarNumeroSecreto() {
  return Math.floor(Math.random() * numeroMaximo) + 1;
}

function cambiarImagen(src) {
  const imgElement = document.getElementById("personaImagen");
  imgElement.classList.add("fade-out");
  setTimeout(() => {
    imgElement.src = src;
    imgElement.classList.remove("fade-out");
    imgElement.classList.add("fade-in");
    setTimeout(() => {
      imgElement.classList.remove("fade-in");
    }, 500); // Match this duration with your CSS transition duration
  }, 500); // Match this duration with your CSS transition duration
}

function finalizarJuego() {
  juegoTerminado = true;
  document.getElementById("reiniciar").disabled = false;
  document.getElementById("intentar").disabled = true;
}

function reiniciarJuego() {
  numeroSecreto = generarNumeroSecreto();
  intentos = 0;
  juegoTerminado = false;
  asignarTextoElemento(
    ".texto__parrafo",
    `Indica un número del 1 al ${numeroMaximo}.`
  );
  cambiarImagen("./img/ia_neutral.png");
  stopMatrixEffect();
  document.getElementById("reiniciar").disabled = true;
  document.getElementById("intentar").disabled = false;
  document
    .querySelector(".texto__parrafo")
    .classList.remove("texto__parrafo-special");
  limpiarCaja();
}

function startMatrixEffect() {
  const canvas = document.getElementById("matrixCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const fontSize = 16;
  const columns = canvas.width / fontSize;

  const drops = [];
  for (let x = 0; x < columns; x++) {
    drops[x] = 1;
  }

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0F0";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
      const text = letters.charAt(Math.floor(Math.random() * letters.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }

      drops[i]++;
    }
  }

  const matrixInterval = setInterval(draw, 33);
  canvas.dataset.matrixInterval = matrixInterval;
}

function stopMatrixEffect() {
  const canvas = document.getElementById("matrixCanvas");
  const matrixInterval = canvas.dataset.matrixInterval;
  if (matrixInterval) {
    clearInterval(matrixInterval);
  }
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function condicionesIniciales() {
  asignarTextoElemento("h1", "Juego del número secreto!!!");
  asignarTextoElemento(
    ".texto__parrafo",
    `Indica un número del 1 al ${numeroMaximo}.`
  );
  numeroSecreto = generarNumeroSecreto();
  intentos = 0;
}

condicionesIniciales();
