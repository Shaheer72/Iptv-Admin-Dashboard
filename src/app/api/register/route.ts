import { UserModel } from '@/models/User';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

// Connect to MongoDB
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/muu_iptv';

async function connectDB() {
  try {
    if (mongoose.connection.readyState === 1) {
      return;
    }
    await mongoose.connect(MONGO_URI);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
}

export async function POST(req: NextRequest) {
  try {
    // If deploying to Vercel ensure MONGODB_URI is configured
    if (!process.env.MONGODB_URI && (process.env.NODE_ENV === 'production' || process.env.VERCEL)) {
      return NextResponse.json(
        { success: false, message: 'MONGODB_URI not configured on server' },
        { status: 500 }
      );
    }

    await connectDB();

    const body = await req.json();
    const { fullName, phoneNumber, referralName } = body || {};
    
    if (!fullName || !phoneNumber) {
      return NextResponse.json(
        { success: false, message: 'fullName and phoneNumber are required' },
        { status: 400 }
      );
    }

    const user = await UserModel.create({ fullName, phoneNumber, referralName });
    const out = user.toObject();
    
    return NextResponse.json(
      { success: true, message: 'Registration successful', data: out },
      { status: 200 }
    );
  } catch (err) {
    console.error('Register error:', err);
    const msg = (err as any)?.message ?? String(err);
    return NextResponse.json(
      { success: false, message: 'Internal server error', error: msg },
      { status: 500 }
    );
  }
}

