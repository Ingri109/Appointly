// app/api/workers/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const resolvedParams = await params;
        const id = resolvedParams.id;

        const { data, error } = await supabase.from('worker').select('*').eq('id', id);

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: 'Database error', details: error.message },
                { status: 500 }
            );
        }
        if (!data || data.length === 0) {
            return NextResponse.json(
                { error: 'Worker not found with ID: ' + id },
                { status: 404 }
            );
        }
        return NextResponse.json(data[0]);

    } catch (err) {
        console.error('Unexpected error:', err);
        return NextResponse.json(
            { error: 'An unexpected error occurred' },
            { status: 500 }
        );
    }
}
