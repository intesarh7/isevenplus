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
    port: Number(process.env.DB_PORT) || 3306,

    waitForConnections: true,
    connectionLimit: 10, // 🔥 IMPORTANT (zyada mat rakho)
    queueLimit: 0,

    connectTimeout: 10000,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,

    ssl:
      process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: false }
        : undefined,
  });

// 🔥 ALWAYS assign (production + dev dono me)
globalForMySQL.pool = pool;

export default pool;
