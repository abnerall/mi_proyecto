import { registrarOBuscarUsuarioGoogle } from './users.js';

async function probarGuardado() {
  const usuarioFalsoGoogle = {
    googleId: '109876543210987654321',
    email: 'maria.ejemplo@gmail.com',
    nombre: 'María',
    fotoUrl: 'https://lh3.googleusercontent.com/a/default-user'
  };

  try {
    const usuarioGuardado = await registrarOBuscarUsuarioGoogle(usuarioFalsoGoogle);
    console.log('✅ Usuario registrado/actualizado con éxito en PostgreSQL:');
    console.log(usuarioGuardado);
  } catch (err) {
    console.error('Error en la prueba:', err);
  }
}

probarGuardado();