
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
    try {


        // Fetch both promotions
        const result = await pool.query('SELECT * FROM promotions');

        // Convert array to object for easier frontend consumption
        const promotions = {
            todays_special: result.rows.find(r => r.key === 'todays_special') || null,
            limited_offer: result.rows.find(r => r.key === 'limited_offer') || null
        };

        return NextResponse.json({ success: true, promotions });
    } catch (error) {

        return NextResponse.json({ success: false, message: 'Failed to fetch' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { key, title, description, image_url, offer_percent, is_active } = body;

        // Upsert logic (Insert or Update)
        const query = `
            INSERT INTO promotions (key, title, description, image_url, offer_percent, is_active)
            VALUES ($1, $2, $3, $4, $5, $6)
            ON CONFLICT (key) 
            DO UPDATE SET 
                title = EXCLUDED.title,
                description = EXCLUDED.description,
                image_url = EXCLUDED.image_url,
                offer_percent = EXCLUDED.offer_percent,
                is_active = EXCLUDED.is_active;
        `;

        await pool.query(query, [key, title, description, image_url, offer_percent, is_active]);

        return NextResponse.json({ success: true });
    } catch (error) {

        return NextResponse.json({ success: false, message: 'Failed to save' }, { status: 500 });
    }
}
