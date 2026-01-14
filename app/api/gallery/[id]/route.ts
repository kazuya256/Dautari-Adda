
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;
        await pool.query('DELETE FROM gallery WHERE id = $1', [id]);
        return NextResponse.json({ success: true, message: 'Deleted successfully' });
    } catch (error) {

        return NextResponse.json({ success: false, message: 'Failed to delete item' }, { status: 500 });
    }
}
