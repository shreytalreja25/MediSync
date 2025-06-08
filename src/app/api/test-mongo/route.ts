import dbConnect from '@/lib/dbConnect';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
} 