import express from 'express';
import { connectDB } from './config/db.js';
import authRouter from './routes/authrouter.js';
import path from 'path';
import cors from 'cors';
import QProute from './routes/QProuter.js';

const app = express();
const port = process.env.PORT || 5001;
const __dirname = path.resolve();

// Parse JSON bodies
app.use(express.json());

// Configure CORS options to allow credentials and set the allowed origin
const corsOptions = {
  origin: 'https://expaper.onrender.com', // Adjust this to your frontend's URL
  credentials: true,               // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));

// Use your routes
app.use('/api/auth', authRouter);
app.use('/api/QPs', QProute);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/Frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'Frontend', 'dist', 'index.html'));
    ;
    })
  }

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
