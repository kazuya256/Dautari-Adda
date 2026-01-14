
import { Pool } from 'pg';



const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:SYSTEM@localhost:5432/dautari_adda';

if (!connectionString) {
    throw new Error('DATABASE_URL is missing. Please check .env or .env.local');
}

const pool = new Pool({
    connectionString,
});

export default pool;
