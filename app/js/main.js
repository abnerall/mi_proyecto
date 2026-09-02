document.getElementById('mensaje').textContent = '¡El servidor y el JavaScript están conectados con éxito!';
import confetti from 'canvas-confetti';

// Ejecutamos una animación de confetti cuando la página carga
confetti({
  particleCount: 100,
  spread: 70,
  origin: { y: 0.6 }
});

console.log('Librería canvas-confetti cargada correctamente.');