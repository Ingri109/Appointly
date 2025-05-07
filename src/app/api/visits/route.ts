// app/api/appointments/user/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
    const session = await getServerSession();

    if (!session || !session.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Отримуємо ID користувача через email
    const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('email', session.user.email)
        .single();

    if (userError || !userData) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Отримуємо візити з даними працівника
    const { data: appointments, error: appointmentsError } = await supabase
        .from('appointments')
        .select(`
      id,
      appointment_time,
      duration_minutes,
      worker:worker_id (
        id,
        fullName,
        description,
        location
      )
    `)
        .eq('user_id', userData.id)
        .order('appointment_time', { ascending: true });

    console.log(appointments);
    if (appointmentsError) {
        console.error(appointmentsError);
        return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 });
    }

    return NextResponse.json({ appointments });
}
