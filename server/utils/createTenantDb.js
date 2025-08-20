// createTenantDb.js
const mysql = require('mysql2/promise');

async function createTenantDb(tenantId) {
  const conn = await mysql.createConnection({ host: 'localhost', user: 'root', password: '' });
  await conn.query(`CREATE DATABASE db_${tenantId}`);
  await conn.query(`USE db_${tenantId}`);
  await conn.query(`CREATE TABLE faculty (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100))`);
}

 