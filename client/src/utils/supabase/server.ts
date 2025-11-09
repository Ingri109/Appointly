
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Створюємо клієнт Supabase для серверного використання
export const createClient = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!; // Ваш URL для Supabase, має бути у .env
    const supabaseServiceRoleKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!; // Ваш Service Role Key, також має бути у .env

    // Повертаємо екземпляр клієнта Supabase
    return createSupabaseClient(supabaseUrl, supabaseServiceRoleKey);
};
