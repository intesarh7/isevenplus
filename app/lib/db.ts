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
    port: Number(process.env.DB_PORT) || 3306, // 🔥 FIXED

    waitForConnections: true,
    connectionLimit: process.env.NODE_ENV === "production" ? 5 : 10,
    queueLimit: 0,

    connectTimeout: 10000,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,

    ssl:
      process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: false }
        : undefined, // 🔥 Hostinger sometimes requires SSL
  });

if (process.env.NODE_ENV !== "production") {
  globalForMySQL.pool = pool;
}

export default pool;