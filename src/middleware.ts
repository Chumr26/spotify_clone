import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(request: NextRequest) {
    const supabase = createServerComponentClient({ cookies: cookies });
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: '/liked',
};
