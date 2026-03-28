import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './src/routes/auth.js';
import tweetRoutes from './src/routes/tweet.js';
import followRoutes from './src/routes/follow.js';
import commentRoutes from './src/routes/comment.js'

dotenv.config({quiet:true});

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tweets', tweetRoutes);
app.use('/api/follow', followRoutes);
app.use('/api/comments',commentRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});