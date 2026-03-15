import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();
  const googleScriptUrl = "https://script.google.com/macros/s/AKfycbx3JQsHNrBVmSvHxVfPpEvab-c4SkRdGHyaRgDHwwyFppg-NusyjVZ07UhRA7OoyUX2Ow/exec";

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