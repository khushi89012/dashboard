// server.js
const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./config/dbConfig');
const authRoutes = require('./routes/authRoutes');
const csvRoutes = require('./routes/dataRoutes')
const TransPortationRoute = require('./routes/transPortation')

dotenv.config();
connectDB();


const app = express();
const server = http.createServer(app);
const io = socketIo(server)


app.use(express.json());

io.on('connection',(socket)=>{
   console.log('Client connected')
   socket.on('disconnect',()=>{
       console.log('Client disconnected')
   })
})

// API Routes
app.use('/auth', authRoutes);
app.use('/api', csvRoutes);
app.use('/',TransPortationRoute)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
