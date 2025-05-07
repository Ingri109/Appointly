// app/api/users/route.ts
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);
export async function GET() {
    const session = await getServerSession();

    if (!session || !session.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', session.user.email)
        .single();

    console.log(data)
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ user: data });
}

export async function PUT(request: Request) {
    try {
        const session = await getServerSession();

        if (!session || !session.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

        // Check if we're updating a password
        if (body.password) {
            // In a real application, you'd hash the password here
            const { data, error } = await supabase
                .from('users')
                .update({ password: body.password })
                .eq('email', session.user.email)
                .select()
                .single();

            if (error) {
                console.error('Error updating password:', error);
                return NextResponse.json({ error: error.message }, { status: 500 });
            }

            // Don't return the password in the response
            return NextResponse.json({
                message: 'Password updated successfully',
                user: { ...data, password: undefined }
            });
        }

        // Handle other updates (name, email, address)
        const { data, error } = await supabase
            .from('users')
            .update(body)
            .eq('email', session.user.email)
            .select()
            .single();

        if (error) {
            console.error('Error updating user:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        if (!data) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Return the updated user data
        return NextResponse.json({
            message: 'User updated successfully',
            user: { ...data, password: undefined }
        });
    } catch (err) {
        console.error('Unexpected error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}