// server/utils/createTenantDb.js
const mysql = require('mysql2/promise');

async function createTenantDb(tenantId) {
  // Connect to MySQL server (no DB selected yet)
 const conn = await mysql.createConnection({ 
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || ''
});


  // Create database if it doesn't exist
  await conn.query(`CREATE DATABASE IF NOT EXISTS db_${tenantId}`);
  await conn.end();

  // Connect to the newly created tenant DB
const tenantConn = await mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: `db_${tenantId}`
});


  // Create faculty table if it doesn't exist
  await tenantConn.query(`
    CREATE TABLE IF NOT EXISTS faculty (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100)
    )
  `);

  await tenantConn.end();
}

module.exports = { createTenantDb };
