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

function verifyToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf8');
    const parts = decoded.split(':');
    if (parts.length < 2) return false;
    const [u, p] = parts;
    const ADMIN_USER = process.env.ADMIN_USERNAME || 'admin';
    const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'password';
    return u === ADMIN_USER && p === ADMIN_PASS;
  } catch (e) {
    return false;
  }
}

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('x-admin-token') || req.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
    if (!verifyToken(token)) {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      );
    }

    await connectDB();
    const users = await UserModel.find({}).lean();
    
    return NextResponse.json(
      { success: true, data: users },
      { status: 200 }
    );
  } catch (err) {
    console.error('Get users error:', err);
    return NextResponse.json(
      { success: false, message: 'Internal server error', error: String(err) },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const authHeader = req.headers.get('x-admin-token') || req.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
    if (!verifyToken(token)) {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      );
    }

    await connectDB();
    
    const url = new URL(req.url);
    const pathParts = url.pathname.split('/');
    const id = pathParts[pathParts.length - 1];
    
    if (!id || id === 'users') {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }

    const result = await UserModel.findByIdAndDelete(id);
    
    if (!result) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { success: true, message: 'User deleted successfully' },
      { status: 200 }
    );
  } catch (err) {
    console.error('Delete user error:', err);
    return NextResponse.json(
      { success: false, message: 'Internal server error', error: String(err) },
      { status: 500 }
    );
  }
}
