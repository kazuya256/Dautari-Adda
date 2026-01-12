import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:SYSTEM@localhost:5432/dautari_adda',
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { personName, phoneNumber, resDate, resTime, guests, quickOrder } = body;

        if (!personName || !phoneNumber || !resDate || !resTime || !guests || !quickOrder) {
            return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
        }

        const query = `
      INSERT INTO bookings (person_name, phone_number, res_date, res_time, guests, quick_order)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
        const values = [personName, phoneNumber, resDate, resTime, guests, quickOrder];

        const result = await pool.query(query, values);

        return NextResponse.json({ message: 'Booking successful', booking: result.rows[0] }, { status: 200 });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
