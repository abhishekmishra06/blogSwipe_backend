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
app.use(cors({
    origin:[ '*' , 'https://blogswipe-shivank63s-projects.vercel.app'],
    methods: 'GET, POST, PUT, DELETE, PATCH, HEAD',
    credentials: true,
}));
 
 // Routes
app.get('', (req, res) => {
    res.send('Welcome to BlogSwipe app.');
}); 

 
   
app.use('', authRoutes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
}); 