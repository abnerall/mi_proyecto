import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';
import { registrarOBuscarUsuarioGoogle } from '../db/users.js';

dotenv.config();

const app = express();
const port = 3000;
const client = new OAuth2Client(process.env.VITE_GOOGLE_CLIENT_ID);

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Ruta para procesar el inicio de sesión con Google
app.post('/api/auth/google', async (req, res) => {
  const { credential } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.VITE_GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name: nombre, picture: fotoUrl } = payload;

    // Guardamos o actualizamos en PostgreSQL
    const usuario = await registrarOBuscarUsuarioGoogle({
      googleId,
      email,
      nombre,
      fotoUrl,
    });

    res.json({ status: 'ok', usuario });
  } catch (error) {
    console.error('Error al autenticar token de Google:', error);
    res.status(401).json({ status: 'error', message: 'Token de Google inválido' });
  }
});

app.listen(port, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${port}`);
});