import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dbConnect from '@/lib/dbConnect'
import User from '@/lib/models/User'

const JWT_SECRET = process.env.JWT_SECRET as string

export async function POST(req: NextRequest) {
  await dbConnect()
  const { email, password } = await req.json()

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 })
  }

  const user = await User.findOne({ email })
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 })
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 })
  }

  const token = jwt.sign(
    { _id: user._id, email: user.email, role: user.role, name: user.name },
    JWT_SECRET,
    { expiresIn: '7d' }
  )

  const res = NextResponse.json({ success: true })
  res.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
  return res
} 