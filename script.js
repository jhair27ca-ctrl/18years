// 1. Configuración de la Fecha del Evento (31 de Diciembre de 2026, 10:00 PM)
const partyDate = new Date(2026, 11, 31, 22, 0, 0).getTime();

// 2. Lógica de la Cuenta Regresiva
function updateCountdown() {
  const now = new Date().getTime();
  const difference = partyDate - now;

  if (difference <= 0) {
    document.getElementById('days').innerText = "0";
    document.getElementById('hours').innerText = "00";
    document.getElementById('minutes').innerText = "00";
    document.getElementById('seconds').innerText = "00";
    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  document.getElementById('days').innerText = days;
  document.getElementById('hours').innerText = String(hours).padStart(2, '0');
  document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
  document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// 3. Control de Asistencia previa mediante localStorage
window.addEventListener('DOMContentLoaded', function() {
  if (localStorage.getItem('rsvp_confirmed') === 'true') {
    document.getElementById('rsvp-container').style.display = 'none';
    document.getElementById('rsvp-success').style.display = 'block';
  }
});

// 4. Envío de Formulario RSVP con Confeti Dorado y Redirección a WhatsApp
document.getElementById('rsvp-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('guest-name').value.trim();
  const selectedGuest = document.querySelector('input[name="guests"]:checked');
  const count = selectedGuest ? selectedGuest.value : "0";
  
  let text = "";
  if (count === "0") {
    text = `¡Hola César! Soy ${name} y confirmo mi asistencia a tus 18 años. Iré solo(a). ¡Nos vemos el 31!`;
  } else {
    text = `¡Hola César! Soy ${name} y confirmo mi asistencia a tus 18 años. Asistiré con ${count} acompañante(s). ¡Nos vemos el 31!`;
  }
  
  const phone = "51981995393";
  const message = encodeURIComponent(text);
  
  // Guardar confirmación en localStorage
  localStorage.setItem('rsvp_confirmed', 'true');
  
  // Lanzar explosión de Confeti Dorado
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FFF1B0', '#D4AF37', '#AA7C11', '#ffffff']
    });
  }

  // Ocultar el formulario y abrir WhatsApp tras breve pausa para disfrutar el confeti
  setTimeout(() => {
    document.getElementById('rsvp-container').style.display = 'none';
    document.getElementById('rsvp-success').style.display = 'block';
    
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  }, 1000);
});

// 5. Reproductor de Música con Ecualizador Animado
const musicBtn = document.getElementById('music-btn');
const musicBtnText = document.getElementById('music-btn-text');
const bgMusic = document.getElementById('bg-music');
const equalizer = document.getElementById('equalizer');
let isPlaying = false;

musicBtn.addEventListener('click', function() {
  if (isPlaying) {
    bgMusic.pause();
    musicBtnText.innerText = "Reproducir Música";
    equalizer.classList.remove('music-playing');
    isPlaying = false;
  } else {
    bgMusic.play().then(() => {
      musicBtnText.innerText = "Pausar Música";
      equalizer.classList.add('music-playing');
      isPlaying = true;
    }).catch(error => {
      console.error("Error al reproducir audio:", error);
      alert("Asegúrate de colocar tu archivo de audio en 'music/Rockstar.mp3'");
    });
  }
});

// 6. Interacción del Sobre Digital + Copiado Automático a Portapapeles
const envelopeWrapper = document.getElementById('envelope-wrapper');
const envelopeHint = document.getElementById('envelope-hint');
const yapeNumber = "981995393";
const copyBadge = document.getElementById('copy-badge');

if (envelopeWrapper) {
  envelopeWrapper.addEventListener('click', function() {
    this.classList.toggle('open');
    
    if (this.classList.contains('open')) {
      envelopeHint.innerText = "✨ Toca para cerrar el sobre";
      
      // Copiar número al portapapeles usando la API Clipboard
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(yapeNumber).then(() => {
          showCopyFeedback();
        }).catch(err => {
          console.error("Error al copiar al portapapeles: ", err);
        });
      } else {
        // Método de respaldo (Fallback) para navegadores antiguos
        const tempInput = document.createElement("input");
        tempInput.value = yapeNumber;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        showCopyFeedback();
      }
    } else {
      envelopeHint.innerText = "✨ Toca para abrir el sobre";
      if (copyBadge) copyBadge.style.opacity = '0';
    }
  });
}

function showCopyFeedback() {
  if (copyBadge) {
    copyBadge.style.opacity = '1';
    setTimeout(() => {
      copyBadge.style.opacity = '0';
    }, 2500);
  }
}