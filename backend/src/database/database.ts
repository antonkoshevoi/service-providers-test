import Knex from 'knex';
import { Model } from 'objection';
import knexConfig from '../../knexfile';

const knex = Knex(knexConfig.development);

Model.knex(knex);

async function testDatabaseConnection() {
  try {
    await knex.raw('SELECT 1');
    console.log('✅ Database connection successful');
  } catch (err) {
    console.error('❌ Database connection failed:', err);
    process.exit(1);
  }
}

testDatabaseConnection();

export default knex;
