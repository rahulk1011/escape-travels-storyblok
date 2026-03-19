import { NextResponse } from 'next/server';

function generateBookingId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 10; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const scriptURL = "https://script.google.com/macros/s/AKfycbz9a_ZXdIw3RKL5QTbuQzzoY0mgStj5Nsyi0npb77ZBotWTK5htGsQbVT_VaUJPbCqZ/exec";
    // Generate the ID on the server
    const bookingId = generateBookingId();

    // Add the ID to the data being sent to Google Sheets
    const dataToSave = { ...body, bookingId };

    if (!scriptURL) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Forward the data to Google Apps Script
    const response = await fetch(scriptURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSave),
    });

    if (!response.ok) throw new Error('Google Sheets error');

    // Return the ID back to the frontend
    return NextResponse.json({ success: true, bookingId });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process booking' }, { status: 500 });
  }
}