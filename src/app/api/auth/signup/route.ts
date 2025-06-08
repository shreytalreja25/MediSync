import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import dbConnect from '@/lib/dbConnect'
import User from '@/lib/models/User'

export async function POST(req: NextRequest) {
  console.log('Signup API called');
  try {
    await dbConnect();
    console.log('Connected to MongoDB in signup API');
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

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: 'Email already in use.' }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, password: hashed, role });
    console.log('User created:', user._id);

    return NextResponse.json({ success: true, user: { _id: user._id, name, email, role } });
  } catch (err: any) {
    console.error('Signup API error:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
} 