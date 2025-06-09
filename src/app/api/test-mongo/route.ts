import dbConnect from '@/lib/dbConnect';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET() {
  try {
    // Optional: log when request hits the endpoint
    console.log('[MongoDB Test API] Request received.');

    // Attempt DB connection
    await dbConnect();

    // Attach listeners (if not already present)
    if (mongoose.connection.readyState === 1) {
      console.log('✅ MongoDB connected successfully');
    }

    return NextResponse.json({ success: true, message: 'MongoDB connected successfully' });
  } catch (err: any) {
    console.error('❌ MongoDB connection error:', err);

    return NextResponse.json(
      {
        success: false,
        error: err?.message || 'Internal Server Error',
      },
      { status: 500 }
    );
  }
}
