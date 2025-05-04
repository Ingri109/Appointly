// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const config = {
    matcher: ['/Account'],
};

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    const protectedPaths = ['/Account'];

    const isProtected = protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path));

    if (isProtected && !token) {
        return NextResponse.redirect(new URL('/Login', req.url)); // редірект на сторінку входу
    }

    return NextResponse.next(); // дозвіл на доступ
}
