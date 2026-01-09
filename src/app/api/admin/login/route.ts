import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

// Connect to MongoDB just to ensure connection (optional for login)
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/muu_iptv';

async function connectDB() {
  try {
    if (mongoose.connection.readyState === 1) {
      return;
    }
    await mongoose.connect(MONGO_URI);
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    
    const body = await req.json();
    const { username, password } = body || {};
    
    const ADMIN_USER = process.env.ADMIN_USERNAME || 'admin';
    const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'password';

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      // Generate a simple token
      const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');
      return NextResponse.json(
        { success: true, token, message: 'Login successful' },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json(
      { success: false, message: 'Internal server error', error: String(err) },
      { status: 500 }
    );
  }
}

