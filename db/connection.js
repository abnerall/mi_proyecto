import pg from 'pg';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const { Pool } = pg;

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME,
});

// Probar la conexión al arrancar
pool.connect((err, client, release) => {
  if (err) {
    return console.error('❌ Error al conectar con PostgreSQL:', err.stack);
  }
  console.log('✅ Conexión exitosa a PostgreSQL:', process.env.DB_NAME);
  release();
});

export default pool;