import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { UserModel } from './models/User';

dotenv.config();

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 5000;

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/muu_iptv';

// Connect to MongoDB
mongoose.connect(MONGO_URI).then(() => {
  // eslint-disable-next-line no-console
  console.log('Connected to MongoDB');
}).catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Failed to connect to MongoDB:', err);
});

// Simple admin auth using env vars
const ADMIN_USER = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'password';
const adminTokens = new Set<string>();

// POST /api/register -> save to MongoDB
app.post('/api/register', async (req, res) => {
  try {
    const { fullName, phoneNumber, referralName } = req.body || {};
    if (!fullName || !phoneNumber) {
      return res.status(400).json({ success: false, message: 'fullName and phoneNumber are required' });
    }

    const user = await UserModel.create({ fullName, phoneNumber, referralName });
    const out = user.toObject();
    // normalize field name expected by client
    // @ts-ignore
    out.registrationDate = out.createdAt;
    return res.json({ success: true, message: 'Registration successful', data: out });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Register error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// POST /api/admin/login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ success: false, message: 'username and password required' });
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = `${Date.now()}-${Math.round(Math.random() * 1000000)}`;
    adminTokens.add(token);
    return res.json({ success: true, token });
  }
  return res.status(401).json({ success: false, message: 'Invalid credentials' });
});

// Middleware to check admin token
function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const token = String(req.header('x-admin-token') || '');
  if (!token || !adminTokens.has(token)) return res.status(401).json({ success: false, message: 'Unauthorized' });
  next();
}

// GET /api/admin/users
app.get('/api/admin/users', requireAdmin, async (_req, res) => {
  try {
    const users = await UserModel.find().sort({ createdAt: -1 }).lean();
    const mapped = users.map((u) => ({
      ...u,
      // @ts-ignore
      registrationDate: u.createdAt,
    }));
    return res.json({ success: true, data: mapped });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Fetch users error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// DELETE /api/admin/users/:id
app.delete('/api/admin/users/:id', requireAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const result = await UserModel.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ success: false, message: 'User not found' });
    return res.json({ success: true, message: 'User deleted' });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Delete user error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Health
app.get('/api/health', (_req, res) => res.json({ success: true }));

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API server listening on http://localhost:${port}`);
});
