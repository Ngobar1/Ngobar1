const dotenv = require('dotenv');
const userMigration = require('./migrations/userMigration');

dotenv.config();

console.log('Running migrations...');
console.log('Migration will use the DB:', process.env.DB_NAME);

(async () => {
  console.log('Creating users table...');
  await userMigration.createUsersTable();
  console.log('Users table created');

  await userMigration.dropUsersTable();

  console.log('Migrations completed');
})();
