const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./utils/db');
const cors = require('cors');
   
  
const authRoutes = require('./routes/routes');
  
// connect to database 
dotenv.config();
connectDB();

const app = express();
app.use(express.json());


 

// CORS configuration 
// app.use(cors({
//     origin:[ '*' , 'https://blogswipe-shivank63s-projects.vercel.app'],
//     methods: 'GET, POST, PUT, DELETE, PATCH, HEAD',
//     credentials: true,
// }));
const allowedOrigins = [
    '*', // If you don't need credentials.
    'https://blogswipe-shivank63s-projects.vercel.app',
  ];
  
  app.use(cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
  
      // Allow specific origins
      if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD'],
    credentials: true, // Allow cookies and HTTP authentication
  }));
  
 // Routes.
app.get('', (req, res) => {
    res.send('Welcome to BlogSwipe app.');
}); 

 
   
app.use('', authRoutes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
}); 