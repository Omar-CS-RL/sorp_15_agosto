/* ======================
   DATOS DE LAS FOTOS
====================== */
const fotos = [
  {
    src: "foto1.jpg",
    descripcion: "Salidita random 5 de julio post hospital 💕"
  },
  {
    src: "foto2.jpg",
    descripcion: "5 de agosto, tú en el hospi 🐁❤️"
  },
  {
    src: "foto3.jpg",
    descripcion: "Salida los dos 15 de agosto uwu 🌹"
  },
  {
    src: "foto4.jpg",
    descripcion: "30 de agosto salidita con los luchones uwu 😊"
  },
  {
    src: "foto5.jpg",
    descripcion: "Flores en discoteca 6 de septiembre 💜"
  },
  {
    src: "foto6.jpg",
    descripcion: "Mi polera el 6 de septiembre antes de ser tuya 🐀"
  },
  {
    src: "foto9.jpg",
    descripcion: "Flores 26 de septiembre 🌹💕"
  },
  {
    src: "foto7.jpg",
    descripcion: "Salidita 3 de octubre 🌻"
  },
  {
    src: "foto8.jpg",
    descripcion: "Flores 16 de octubre 🌹💕"
  }
];

/* ======================
   CONTROL DE MÚSICA
====================== */
const musica = document.getElementById('musica');
const btnMusica = document.getElementById('btn-musica');
const textoMusica = document.getElementById('texto-musica');
const iconoMusica = document.getElementById('icono-musica');
const volumen = document.getElementById('volumen');

// Establecer volumen inicial
musica.volume = 0.5;

btnMusica.addEventListener('click', () => {
  if (musica.paused) {
    musica.play().catch(err => {
      console.error('Error al reproducir:', err);
    });
    textoMusica.textContent = 'Pausar';
    iconoMusica.textContent = '⏸️';
  } else {
    musica.pause();
    textoMusica.textContent = 'Reproducir';
    iconoMusica.textContent = '🎵';
  }
});

volumen.addEventListener('input', (e) => {
  musica.volume = e.target.value / 100;
});

/* ======================
   CUENTA REGRESIVA (FIX)
====================== */

// FECHA OBJETIVO REAL (Perú GMT-5)
// Año, Mes-1, Día, Hora, Minuto, Segundo
const fechaObjetivo = new Date(2025, 1, 15, 17, 20, 0).getTime();
// 1 = Febrero (los meses van de 0 a 11)

let mensajeYaMostrado = false;
let intervalo = null;

function actualizarCuentaRegresiva() {
  const ahora = Date.now();
  let diferencia = fechaObjetivo - ahora;

  if (diferencia <= 0) {
    setTiempo(0, 0, 0, 0);

    if (!mensajeYaMostrado) {
      mensajeYaMostrado = true;
      setTimeout(mostrarMensajeEspecial, 500);
    }

    clearInterval(intervalo);
    return;
  }

  const segundosTotales = Math.floor(diferencia / 1000);

  const dias = Math.floor(segundosTotales / 86400);
  const horas = Math.floor((segundosTotales % 86400) / 3600);
  const minutos = Math.floor((segundosTotales % 3600) / 60);
  const segundos = segundosTotales % 60;

  setTiempo(dias, horas, minutos, segundos);
}

function setTiempo(d, h, m, s) {
  document.getElementById('dias').textContent = String(d).padStart(2, '0');
  document.getElementById('horas').textContent = String(h).padStart(2, '0');
  document.getElementById('minutos').textContent = String(m).padStart(2, '0');
  document.getElementById('segundos').textContent = String(s).padStart(2, '0');
}

intervalo = setInterval(actualizarCuentaRegresiva, 1000);
actualizarCuentaRegresiva();

/* ======================
   MENSAJE ESPECIAL
====================== */
function mostrarMensajeEspecial() {
  // Verificar si ya existe
  if (document.querySelector('.mensaje-especial')) {
    return;
  }
  
  const mensajeDiv = document.createElement('div');
  mensajeDiv.className = 'mensaje-especial active';
  mensajeDiv.innerHTML = `
    <h3>¡Feliz aniversario mi amor!</h3>
    <p style="font-size: 1.2rem; line-height: 1.8;">Hace exactamente 1 año conocí a mi persona favorita 🐁❤️🐀</p>
    <div class="flores-mensaje">🌹 💜 🌻</div>
    <button class="btn-cerrar" onclick="cerrarMensajeEspecial()">Continuar ❤️</button>
  `;
  document.body.appendChild(mensajeDiv);

  lanzarConfeti();
}

function cerrarMensajeEspecial() {
  const mensaje = document.querySelector('.mensaje-especial');
  if (mensaje) {
    mensaje.remove();
  }
  detenerConfeti();
}

/* ======================
   CONFETI
====================== */
const canvas = document.getElementById('confeti-canvas');
const ctx = canvas.getContext('2d');
let particulas = [];
let animacionConfeti;

function lanzarConfeti() {
  canvas.classList.add('active');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colores = ['#e8b4c8', '#c8a4d4', '#f4c2c2', '#f4d29c', '#ff69b4', '#da70d6'];
  
  particulas = [];
  for (let i = 0; i < 150; i++) {
    particulas.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 150 + 10,
      color: colores[Math.floor(Math.random() * colores.length)],
      tilt: Math.floor(Math.random() * 10) - 10,
      tiltAngleIncremental: Math.random() * 0.07 + 0.05,
      tiltAngle: 0
    });
  }

  animarConfeti();
}

function animarConfeti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particulas.forEach((p, index) => {
    p.tiltAngle += p.tiltAngleIncremental;
    p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
    p.x += Math.sin(p.d);
    p.tilt = Math.sin(p.tiltAngle - index / 3) * 15;

    ctx.beginPath();
    ctx.lineWidth = p.r / 2;
    ctx.strokeStyle = p.color;
    ctx.moveTo(p.x + p.tilt + p.r / 4, p.y);
    ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
    ctx.stroke();

    if (p.y > canvas.height) {
      p.y = -20;
      p.x = Math.random() * canvas.width;
    }
  });

  animacionConfeti = requestAnimationFrame(animarConfeti);
}

function detenerConfeti() {
  if (animacionConfeti) {
    cancelAnimationFrame(animacionConfeti);
  }
  canvas.classList.remove('active');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particulas = [];
}

/* ======================
   FLORES FLOTANTES
====================== */
const floresContainer = document.getElementById('flores-container');
const tiposFlores = ['🌹', '💜', '🌻'];
let floresActivas = 0;
const maxFlores = 12;

function crearFlor() {
  if (floresActivas >= maxFlores) return;

  const flor = document.createElement('div');
  flor.className = 'flor-flotante';
  flor.textContent = tiposFlores[Math.floor(Math.random() * tiposFlores.length)];
  flor.style.left = Math.random() * 100 + 'vw';
  flor.style.animationDuration = (Math.random() * 5 + 8) + 's';
  flor.style.animationDelay = Math.random() * 2 + 's';
  
  floresContainer.appendChild(flor);
  floresActivas++;

  setTimeout(() => {
    flor.remove();
    floresActivas--;
  }, 15000);
}

setInterval(crearFlor, 1500);

for (let i = 0; i < 8; i++) {
  setTimeout(crearFlor, i * 300);
}

/* ======================
   NAVEGACIÓN
====================== */
function mostrarGaleria() {
  document.getElementById('pagina-principal').classList.remove('active');
  document.getElementById('galeria-seccion').classList.add('active');
  window.scrollTo(0, 0);
}

function volverInicio() {
  document.getElementById('galeria-seccion').classList.remove('active');
  document.getElementById('pagina-principal').classList.add('active');
  window.scrollTo(0, 0);
}

/* ======================
   GALERÍA
====================== */
const galeriaGrid = document.getElementById('galeria-grid');

function crearGaleria() {
  fotos.forEach((foto, index) => {
    const card = document.createElement('div');
    card.className = 'foto-card';
    card.innerHTML = `
      <img src="${foto.src}" alt="Momento ${index + 1}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
      <div class="foto-placeholder" style="display: none;">📷</div>
      <div class="foto-descripcion">
        <p>${foto.descripcion}</p>
      </div>
    `;
    
    card.addEventListener('click', () => abrirModal(foto.src, foto.descripcion));
    galeriaGrid.appendChild(card);
  });
}

crearGaleria();

/* ======================
   MODAL
====================== */
const modal = document.getElementById('modal');
const modalImagen = document.getElementById('modal-imagen');
const modalDescripcion = document.getElementById('modal-descripcion');

function abrirModal(src, descripcion) {
  modal.classList.add('active');
  modalImagen.src = src;
  modalDescripcion.textContent = descripcion;
  document.body.style.overflow = 'hidden';
}

function cerrarModal() {
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    cerrarModal();
  }
});

/* ======================
   INICIALIZACIÓN
====================== */
window.addEventListener('load', () => {
  document.getElementById('pagina-principal').classList.add('active');
});