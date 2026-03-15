import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();
  const googleScriptUrl = "https://script.google.com/macros/s/AKfycbz6zwjaND4kb-hlZRG940YuX6d9O0NDcFrueqquPK8osX321rxCR6qUaswpsQiBAyGPPA/exec";

  try {
    const response = await fetch(googleScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    return new Response("OK", { status: 200 });
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
}