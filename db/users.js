import pool from './connection.js';

/**
 * Registra o actualiza un usuario cuando inicia sesión con Google.
 */
export async function registrarOBuscarUsuarioGoogle({ googleId, email, nombre, fotoUrl }) {
  const queryText = `
    INSERT INTO usuarios (google_id, email, nombre, foto_url, ultimo_login)
    VALUES ($1, $2, $3, $4, NOW())
    ON CONFLICT (google_id) 
    DO UPDATE SET 
      nombre = EXCLUDED.nombre,
      email = EXCLUDED.email,
      foto_url = EXCLUDED.foto_url,
      ultimo_login = NOW()
    RETURNING *;
  `;

  const values = [googleId, email, nombre, fotoUrl];

  try {
    const res = await pool.query(queryText, values);
    return res.rows[0]; // Retorna el usuario registrado/actualizado
  } catch (error) {
    console.error('❌ Error al guardar usuario de Google:', error);
    throw error;
  }
}

/**
 * Busca un usuario por su ID interno.
 */
export async function obtenerUsuarioPorId(id) {
  try {
    const res = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    return res.rows[0];
  } catch (error) {
    console.error('❌ Error al buscar usuario por ID:', error);
    throw error;
  }
}