
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            name,
            phone,
            date,
            time,
            guests,
            specialRequest,
            selectedItem,
            totalPrice
        } = body;



        // 2. Insert Reservation
        const result = await pool.query(
            `INSERT INTO reservations 
      (name, phone, res_date, res_time, guests, special_request, selected_item, total_price) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
      RETURNING id`,
            [name, phone, date, time, guests, specialRequest, selectedItem, totalPrice]
        );

        return NextResponse.json({ success: true, id: result.rows[0].id });

    } catch (error) {

        return NextResponse.json({ success: false, message: 'Failed to save reservation' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const result = await pool.query('SELECT * FROM reservations ORDER BY created_at DESC');
        return NextResponse.json({ success: true, reservations: result.rows });
    } catch (error) {

        return NextResponse.json({ success: false, message: 'Failed to fetch reservations' }, { status: 500 });
    }
}
