// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const config = {
    matcher: ['/', '/Login', '/Account', '/Visits', '/Booking'],
};

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    const isLoggedIn = !!token;
    const currentPath = req.nextUrl.pathname;

    // Якщо користувач не в сесії
    if (!isLoggedIn) {
        if (currentPath !== '/' && currentPath !== '/Login') {
            return NextResponse.redirect(new URL('/Login', req.url));
        }
    } else {
        // Якщо користувач в сесії
        if (currentPath === '/Login') {
            return NextResponse.redirect(new URL('/Account', req.url));
        }
    }

    return NextResponse.next();
}

