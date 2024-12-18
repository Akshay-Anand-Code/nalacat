import express from 'express';
import cors from 'cors';
import { sendMessage } from './api/chatService.js';

const app = express();
const port = 3000;

// Enable CORS
app.use(cors());
app.use(express.json());

// Serve static files from the current directory
app.use(express.static('./'));

// Chat API endpoint
app.post('/api/chat', async (req, res) => {
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