import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // 1. Parse the incoming JSON body
    const body = await request.json();
    const { name, email, phone, message } = body;

    // 2. Server-Side Validation (The "Safety Net")
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and Email are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format.' },
        { status: 400 }
      );
    }

    // 3. Process the data
    // This is where you would send an email (via Resend/SendGrid) or save to a database (via Prisma/Supabase)
    console.log('Form submission received:', body);

    // Simulated "Success" response
    return NextResponse.json(
      { message: 'Message sent successfully!' },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}