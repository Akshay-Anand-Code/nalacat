import express from 'express';
import cors from 'cors';
import handler from './api/chat.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

// Update CORS configuration
app.use(cors({
   origin: '*', // Be more specific in production
   methods: ['POST', 'GET', 'OPTIONS'],
   allowedHeaders: ['Content-Type', 'Accept']
}));

app.use(express.json());

// Add OPTIONS handler for preflight requests
app.options('/api/chat', cors());

// Serve static files from the current directory
app.use(express.static('./'));

// Chat API endpoint
app.post('/api/chat', async (req, res) => {
    // Add CORS headers explicitly
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');

    await handler(req, res);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 