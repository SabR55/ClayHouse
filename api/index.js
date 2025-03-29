const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.json());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

// MongoDB Connection
const url = process.env.MONGODB_URL;

mongoose.connect(url, {})
.then(result => console.log("Database is connected"))
.catch(err => console.log(err))

app.get('/test', (req, res) => {
    res.json('test ok');
});

// -----  Create a new User -----
app.post('/register', async (req, res) => {
    
    try {
        const formData = req.body;

        // Find the last reservation to get the latest ID
        const lastUser = await User.findOne().sort({ _id: -1 });
        
        // Generate new ID - if no previous reservation, start with "001"
        let userID;
        if (!lastUser) {
            userID = "0001";
        } else {
            // Convert the last ID to number, add 1, then format back to 3-digit string
            const lastUserID = parseInt(lastUser.userID);
            userID = (lastUserID + 1).toString().padStart(4, '0');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(formData.password, saltRounds);

        // Create a new user
        const newUser = await User.create({
            userID: userID,
            userName: formData.name,
            userEmail: formData.email,
            userPhone: formData.phone,
            userPassword: hashedPassword,
        })

        // Send success response with the created reservation
        res.status(201).json({
            success: true,
            message: 'Reservation created successfully',
            data: newUser
        });
        
    } catch (error) {
        console.error('Reservation creation error:', error);
        
        // Send error response
        res.status(500).json({
            success: false,
            message: 'Failed to create reservation',
            error: error.message
        });
    }
});

app.listen(port, () => {
    console.log("Server is running at port " + port)
})