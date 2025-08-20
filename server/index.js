// server/index.js
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
//const { createTenantDb } = require('./utils/CreateTenantsDb');

const app = express();
app.use(cors());
app.use(express.json());

// Static tenant config (for existing tenants)
const dbMap = {
  vite: { host: 'localhost', user: 'root', password: '', database: 'db_vite' },
  anc: { host: 'localhost', user: 'root', password: '', database: 'db_anc' },
  kakade: { host: 'localhost', user: 'root', password: '', database: 'db_kakade' },
};

// GET faculty list for a tenant
app.get('/api/faculty', async (req, res) => {
  const tenant = req.headers['x-tenant-id'];
  const config = dbMap[tenant];
  if (!config) return res.status(400).send('Invalid tenant');

  try {
    const conn = await mysql.createConnection(config);
    const [rows] = await conn.execute('SELECT * FROM faculty');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching faculty:', err);
    res.status(500).send('Database error');
  }
});

// POST to provision a new tenant DB
app.post('/onboard', async (req, res) => {
  const { tenantId } = req.body;
  if (!tenantId) return res.status(400).send('Missing tenantId');

  try {
    await createTenantDb(tenantId);
    res.send(`Tenant ${tenantId} database created`);
  } catch (err) {
    console.error('Error creating tenant DB:', err);
    res.status(500).send('Provisioning failed');
  }
});

app.listen(3001, () => console.log('Server running on port 3001'));
