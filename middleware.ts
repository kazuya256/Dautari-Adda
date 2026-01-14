
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // 1. Define Protected Routes
    if (path.startsWith('/admin') && !path.startsWith('/admin/login')) {

        // 2. Check for the auth cookie
        const token = request.cookies.get('admin_token')?.value;

        if (!token) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        try {
            // 3. Verify the token (using jose for Edge Runtime compatibility)
            const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret-key-change-me');
            await jwtVerify(token, secret);

            return NextResponse.next();

        } catch (err) {
            // Invalid token
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    // 4. Secure Headers (OWASP Recommendations)
    const response = NextResponse.next();
    response.headers.set('X-Frame-Options', 'DENY'); // Prevent Clickjacking
    response.headers.set('X-Content-Type-Options', 'nosniff'); // Prevent MIME sniffing
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()'); // Restrict browser features

    return response;
}

// Optimally run only on admin path & root to save resources
export const config = {
    matcher: ['/admin/:path*', '/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
