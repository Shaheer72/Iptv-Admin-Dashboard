"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("./models/User");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT ? Number(process.env.PORT) : 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/muu_iptv';
// Connect to MongoDB
mongoose_1.default.connect(MONGO_URI).then(() => {
    // eslint-disable-next-line no-console
    console.log('Connected to MongoDB');
}).catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Failed to connect to MongoDB:', err);
});
// Simple admin auth using env vars
const ADMIN_USER = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'password';
const adminTokens = new Set();
// POST /api/register -> save to MongoDB
app.post('/api/register', async (req, res) => {
    try {
        const { fullName, phoneNumber, referralName } = req.body || {};
        if (!fullName || !phoneNumber) {
            return res.status(400).json({ success: false, message: 'fullName and phoneNumber are required' });
        }
        const user = await User_1.UserModel.create({ fullName, phoneNumber, referralName });
        const out = user.toObject();
        // normalize field name expected by client
        // @ts-ignore
        out.registrationDate = out.createdAt;
        return res.json({ success: true, message: 'Registration successful', data: out });
    }
    catch (err) {
        // eslint-disable-next-line no-console
        console.error('Register error:', err);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
// POST /api/admin/login
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body || {};
    if (!username || !password)
        return res.status(400).json({ success: false, message: 'username and password required' });
    if (username === ADMIN_USER && password === ADMIN_PASS) {
        const token = `${Date.now()}-${Math.round(Math.random() * 1000000)}`;
        adminTokens.add(token);
        return res.json({ success: true, token });
    }
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
});
// Middleware to check admin token
function requireAdmin(req, res, next) {
    const token = String(req.header('x-admin-token') || '');
    if (!token || !adminTokens.has(token))
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    next();
}
// GET /api/admin/users
app.get('/api/admin/users', requireAdmin, async (_req, res) => {
    try {
        const users = await User_1.UserModel.find().sort({ createdAt: -1 }).lean();
        const mapped = users.map((u) => ({
            ...u,
            // @ts-ignore
            registrationDate: u.createdAt,
        }));
        return res.json({ success: true, data: mapped });
    }
    catch (err) {
        // eslint-disable-next-line no-console
        console.error('Fetch users error:', err);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
// DELETE /api/admin/users/:id
app.delete('/api/admin/users/:id', requireAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        const result = await User_1.UserModel.findByIdAndDelete(id);
        if (!result)
            return res.status(404).json({ success: false, message: 'User not found' });
        return res.json({ success: true, message: 'User deleted' });
    }
    catch (err) {
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
