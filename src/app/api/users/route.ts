// app/api/users/route.ts
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

interface ProfileData {
    full_name?: string;
    email?: string;
    country?: string;
    city?: string;
    street?: string;
    zip_code?: string;
}

// Helper to init Supabase
async function initSupabase() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    return createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: false },
    });
}

export async function GET(req: NextRequest) {
    const supabase = await initSupabase();
    const { data: { session }, error: sessErr } = await supabase.auth.getSession();
    if (sessErr || !session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const url = new URL(req.url);
    const id  = url.searchParams.get('id') || session.user.id;

    const { data, error } = await supabase
        .from('users')
        .select('full_name,email,country,city,street,zip_code')
        .eq('id', id)
        .single();

    if (error) return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
    return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
    const supabase = await initSupabase();
    const { data: { session }, error: sessErr } = await supabase.auth.getSession();
    if (sessErr || !session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const updates: ProfileData = await req.json();
    const userId = session.user.id;

    const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select('full_name,email,country,city,street,zip_code')
        .single();

    if (error) return NextResponse.json({ error: 'Failed to update user data' }, { status: 500 });
    return NextResponse.json(data);
}
