
import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { compare } from 'bcryptjs';
import { SignJWT } from 'jose';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        // Fetch user by email
        const result = await pool.query(
            'SELECT * FROM admins WHERE email = $1',
            [email]
        );

        if (result.rows.length === 0) {

            return NextResponse.json({ success: false, message: 'Invalid email or password' }, { status: 401 });
        }

        const user = result.rows[0];

        // Verify Password
        const isValid = await compare(password, user.password);


        if (isValid) {
            // Create JWT Token
            const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret-key-change-me');
            const alg = 'HS256';

            const jwt = await new SignJWT({ 'email': user.email, 'role': 'admin' })
                .setProtectedHeader({ alg })
                .setIssuedAt()
                .setExpirationTime('2h')
                .sign(secret);

            // Set Cookie
            const response = NextResponse.json({ success: true, user: { email: user.email } });

            response.cookies.set({
                name: 'admin_token',
                value: jwt,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 2, // 2 hours
                path: '/',
            });

            return response;
        } else {
            // Invalid credentials
            return NextResponse.json({ success: false, message: 'Invalid email or password' }, { status: 401 });
        }

    } catch (error) {

        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
}
