import express from 'express';
import cors from 'cors';
import { sendMessage } from './api/chatService.js';

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

    try {
        const message = req.body.message;
        const response = await sendMessage(message);
        res.json({ message: response });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: "Oops! Something went wrong!" });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 