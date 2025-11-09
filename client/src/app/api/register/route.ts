import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request){
    const body = await req.json();
    const { fullName, email, password } = body;

    console.log(`FullName:${fullName}, Email: ${email}, Password: ${password}`);
    if (!email || !password) {
        return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    const { data: userData, error: signUpError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata:{
            fullName: 'Full name',
        }
    });

    if (signUpError) {
        console.log(signUpError);
        return NextResponse.json({ error: signUpError.message }, {status: 400});
    }

    const userId = userData.user?.id ;

    if (!userId) {
        return NextResponse.json({ error: 'User ID was not returned' }, { status: 500 });
    }
    const { error: updateError } = await supabase.from('users').upsert({
        id: userId,
        email,
        fullName,
    });

    if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Successful registration' });
}