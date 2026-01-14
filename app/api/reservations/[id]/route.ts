
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// Handle requests for a specific reservation ID
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { status } = body;

        // Update the status in the database
        const result = await pool.query(
            'UPDATE reservations SET status = $1 WHERE id = $2 RETURNING *',
            [status, id]
        );

        if (result.rows.length === 0) {
            return NextResponse.json({ success: false, message: 'Reservation not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, reservation: result.rows[0] });

    } catch (error) {

        return NextResponse.json({ success: false, message: 'Failed to update reservation' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const result = await pool.query('DELETE FROM reservations WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return NextResponse.json({ success: false, message: 'Reservation not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Deleted successfully' });
    } catch (error) {

        return NextResponse.json({ success: false, message: 'Failed to delete reservation' }, { status: 500 });
    }
}
