// Remplaza esto con tu Client ID real de Google o léelo si estás usando empaquetadores
// Vite expone de forma segura la variable de entorno configurada en el .env
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

window.onload = () => {
  if (window.google && GOOGLE_CLIENT_ID) {
    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large", text: "signin_with" }
    );
  } else {
    console.error('No se encontró el GOOGLE_CLIENT_ID en el archivo .env');
  }
};

async function handleCredentialResponse(response) {
  try {
    // Enviamos la credencial obtenida a nuestro backend
    const res = await fetch('http://localhost:3000/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential: response.credential })
    });

    const data = await res.json();

    if (data.status === 'ok') {
      const u = data.usuario;
      document.getElementById('usuarioInfo').innerHTML = `
        <h3>¡Bienvenido, ${u.nombre}!</h3>
        <p>Email: ${u.email}</p>
        <img src="${u.foto_url}" alt="Foto de perfil" style="border-radius: 50%; width: 80px;">
      `;
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
  }
}