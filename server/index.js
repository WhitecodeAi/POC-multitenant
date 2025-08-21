// server/index.js
require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const { createTenantDb } = require('./utils/createTenantDb');

const app = express();
app.use(cors());
app.use(express.json());

// Static tenant config (can be replaced with dynamic registry later)
const dbMap = {
  vite: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: 'db_vite'
  },
  anc: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: 'db_anc'
  },
  kakade: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: 'db_kakade'
  }
};

 
// GET faculty list for a tenant
app.get('/api/faculty', async (req, res) => {
  const tenant = req.headers['x-tenant-id'];
  const config = dbMap[tenant];

  if (!config) {
    return res.status(400).json({ error: 'Invalid tenant' }); // ✅ JSON response
  }

  try {
    const conn = await mysql.createConnection(config);
    const [rows] = await conn.execute('SELECT * FROM faculty');
    await conn.end();
    res.json({ data: rows }); // ✅ consistent structure
  } catch (err) {
    console.error(`Error fetching faculty for tenant "${tenant}":`, err);
    res.status(500).json({ error: 'Database error' }); // ✅ JSON response
  }
});

// POST to provision a new tenant DB
app.post('/onboard', async (req, res) => {
  const { tenantId } = req.body;
  if (!tenantId) return res.status(400).send('Missing tenantId');

  try {
    await createTenantDb(tenantId);
    res.send(`Tenant "${tenantId}" database created`);
  } catch (err) {
    console.error(`Error creating tenant DB "${tenantId}":`, err);
    res.status(500).send('Provisioning failed');
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
