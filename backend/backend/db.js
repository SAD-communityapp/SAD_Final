// 連接到 PostgreSQL 數據庫
const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'SAD_project',
    password: 'xu3t/6vm0 ',
    port: 5432,
  });

module.exports = pool;
