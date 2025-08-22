require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
 
const app = express();
app.use(cors());
app.use(express.json());

// Static tenant config (can be replaced with dynamic registry later)
const dbMap = {
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
  },
  lic: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: 'db_lic'
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
    res.json(rows); // <-- Return array directly!
  } catch (err) {
    console.error(`Error fetching faculty for tenant "${tenant}":`, err);
    res.status(500).json({ error: 'Database error' }); // ✅ JSON response
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));