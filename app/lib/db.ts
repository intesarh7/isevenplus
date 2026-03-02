import mysql from "mysql2/promise";

const globalForMySQL = global as unknown as {
  pool: mysql.Pool | undefined;
};

const pool =
  globalForMySQL.pool ??
  mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3307,

    waitForConnections: true,

    // 🔥 Shared hosting safe limit
    connectionLimit: process.env.NODE_ENV === "production" ? 5 : 10,

    queueLimit: 0,

    // Extra stability options
    connectTimeout: 10000,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });

// Prevent multiple pools in dev (Next hot reload fix)
if (process.env.NODE_ENV !== "production") {
  globalForMySQL.pool = pool;
}

export default pool;