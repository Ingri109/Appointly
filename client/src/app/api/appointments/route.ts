import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';

// Схема з менш суворою перевіркою ISO-формату
const appointmentSchema = z.object({
    workerId: z.string().uuid(), // перевірка що це UUID
    datetime: z.string().refine(
        val => !isNaN(Date.parse(val)),
        { message: 'Invalid date format' }
    )
});

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
    const session = await getServerSession();
    if (!session || !session.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Отримуємо користувача по email
    const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('email', session.user.email)
        .single();

    if (userError || !userData) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await req.json();
    const parsed = appointmentSchema.safeParse(body);

    if (!parsed.success) {
        console.error('Validation errors:', parsed.error.format());
        return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const { workerId, datetime } = parsed.data;

    // Перевірка, чи є вже візит на цей час
    const { data: existing, error: fetchError } = await supabase
        .from('appointments')
        .select('id')
        .eq('worker_id', workerId)
        .eq('appointment_time', datetime)
        .maybeSingle(); // уникнути помилки, якщо немає запису

    if (existing) {
        return NextResponse.json({ error: 'This time slot is already taken.' }, { status: 409 });
    }

    if (fetchError) {
        console.error('Fetch error:', fetchError);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    // Додаємо візит
    const { error: insertError } = await supabase.from('appointments').insert({
        user_id: userData.id,
        worker_id: workerId,
        appointment_time: datetime,
        created_at: new Date().toISOString()
    });

    if (insertError) {
        console.error('Insert error:', insertError);
        return NextResponse.json({ error: 'Failed to create appointment.' }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
}
