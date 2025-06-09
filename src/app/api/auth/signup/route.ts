import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectToDatabase } from '@/lib/dbClient'

export async function POST(req: NextRequest) {
  console.log('Signup API called');
  try {
    const db = await connectToDatabase();
    const users = db.collection('users');
    const { name, email, password, role } = await req.json();
    console.log('Received data:', { name, email, role });

    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email.' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters.' }, { status: 400 });
    }

    const existing = await users.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: 'Email already in use.' }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 12);
    const result = await users.insertOne({ name, email, password: hashed, role, createdAt: new Date() });
    console.log('User created:', result.insertedId);

    return NextResponse.json({ success: true, user: { _id: result.insertedId, name, email, role } });
  } catch (err: any) {
    console.error('Signup API error:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
} 