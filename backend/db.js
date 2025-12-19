const { Pool } = require('pg');

const pool = new Pool({
  host: 'db',
  user: 'rc_user',
  password: 'rc_pass',
  database: 'rc_events',
  port: 5432
});

module.exports = pool;
