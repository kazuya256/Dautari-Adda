
import { NextResponse } from 'next/server';
import pool from '@/lib/db';



export async function GET() {
    try {

        const result = await pool.query('SELECT * FROM gallery ORDER BY created_at DESC');
        return NextResponse.json({ success: true, gallery: result.rows });
    } catch (error) {

        return NextResponse.json({ success: false, message: 'Failed to fetch gallery' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, image_url } = body;

        if (!title || !image_url) {
            return NextResponse.json({ success: false, message: 'Title and Image URL are required' }, { status: 400 });
        }



        const result = await pool.query(
            'INSERT INTO gallery (title, image_url) VALUES ($1, $2) RETURNING *',
            [title, image_url]
        );

        return NextResponse.json({ success: true, item: result.rows[0] });
    } catch (error) {

        return NextResponse.json({ success: false, message: 'Failed to add gallery item' }, { status: 500 });
    }
}
