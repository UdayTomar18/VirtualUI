import dotenv from 'dotenv';
dotenv.config();


import express from 'express';
import { connectDB } from './configs/connectDB.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route.js';
import cors from 'cors'
import userRouter from './routes/user.route.js';
import componentRouter from './routes/component.routes.js';



const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors({
    origin: "https://virtualui-main-20t9.onrender.com",
    credentials:true
}))


app.use(express.json());
app.use(cookieParser());



app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/auth', authRouter);
app.use('/api/user',userRouter);
app.use("/api/component", componentRouter)


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
    connectDB();



});

