import pool from './connection.js';

async function testQuery() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Hora del servidor PostgreSQL:', res.rows[0].now);
  } catch (err) {
    console.error('Error ejecutando consulta:', err);
  } finally {
    pool.end();
  }
}

testQuery();