
import { NextResponse } from 'next/server';
import pool from '@/lib/db';



export async function GET() {
    try {

        const result = await pool.query('SELECT * FROM menu_items ORDER BY category, id');

        // Group by category for easier frontend consumption
        const items = result.rows;
        const categories = {
            'Small Plates & Street Food': [],
            'Main & Bhojans': [],
            'Side & Breads': [],
            'Desserts': [],
            'Cold Drinks': []
        };

        // Initialize with empty arrays or just return flat list? 
        // The MenuModal expects structured data. Let's return the flat list and let frontend group it, 
        // OR return grouped. Returning flat list is more RESTful.

        return NextResponse.json({ success: true, items });
    } catch (error) {

        return NextResponse.json({ success: false, message: 'Failed to fetch menu' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, description, price, category } = body;

        if (!name || !category) {
            return NextResponse.json({ success: false, message: 'Name and Category are required' }, { status: 400 });
        }



        const result = await pool.query(
            'INSERT INTO menu_items (name, description, price, category) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, description, price, category]
        );

        return NextResponse.json({ success: true, item: result.rows[0] });
    } catch (error) {

        return NextResponse.json({ success: false, message: 'Failed to add menu item' }, { status: 500 });
    }
}
