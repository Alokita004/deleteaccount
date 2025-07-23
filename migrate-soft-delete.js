const mysql = require('mysql2/promise');

const runMigration = async () => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'alokita@#004$',
    database: 'delete_account_db'
  });

  try {
    console.log("Running migration...");

    // Attempt to add columns one by one
    try {
      await connection.query(`ALTER TABLE users ADD COLUMN is_deleted BOOLEAN DEFAULT FALSE`);
      console.log("✔️ is_deleted column added.");
    } catch (err) {
      if (err.message.includes('Duplicate column')) {
        console.log("⚠️ is_deleted column already exists. Skipping...");
      } else {
        throw err;
      }
    }

    try {
      await connection.query(`ALTER TABLE users ADD COLUMN deleted_at DATETIME DEFAULT NULL`);
      console.log("✔️ deleted_at column added.");
    } catch (err) {
      if (err.message.includes('Duplicate column')) {
        console.log("⚠️ deleted_at column already exists. Skipping...");
      } else {
        throw err;
      }
    }

    try {
      await connection.query(`ALTER TABLE users ADD COLUMN delete_reason TEXT DEFAULT NULL`);
      console.log("✔️ delete_reason column added.");
    } catch (err) {
      if (err.message.includes('Duplicate column')) {
        console.log("⚠️ delete_reason column already exists. Skipping...");
      } else {
        throw err;
      }
    }

    console.log("✅ Migration completed.");
  } catch (error) {
    console.error("❌ Migration failed:", error.message);
  } finally {
    await connection.end();
  }
};

runMigration();
