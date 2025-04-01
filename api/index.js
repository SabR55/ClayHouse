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


// -----  Login -----
app.post('/login', async (req, res) => {

    try {
        const formData = req.body;

        const user = await User.findOne({userEmail: formData.email});

        // Check if user exists
        if (!user) {
            return res.status(400).json({ msg: "User does not exist" });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(formData.password, user.userPassword);

        if (!isPasswordValid) {
            return res.status(400).json({ msg: "Incorrect password" });
        }

        const responseData = {
            userID: user.userID,
            userName: user.userName
        };

        res.json(responseData);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
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
            message: 'User created successfully',
            data: newUser
        });
        
    } catch (error) {
        console.error('User creation error:', error);
        
        // Send error response
        res.status(500).json({
            success: false,
            message: 'Failed to create user',
            error: error.message
        });
    }
});


// -----  Retrieve User Details -----
app.get('/userProfile/:userID', async (req, res) => {
    try {
      const { userID } = req.params;
      
      // Validate userID (basic validation example)
      if (!userID) {
        return res.status(400).json({ 
          success: false, 
          message: 'User ID is required' 
        });
      }
      
      // Fetch user from database 
      const user = await User.findOne({userID: userID});
      
      // Check if user exists
      if (!user) {
        return res.status(404).json({ 
          success: false, 
          message: 'User not found' 
        });
      }
      
      // Return user profile
      return res.status(200).json({
        success: true,
        data: user
      });
      
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  });

// -----  Retrieve User Details -----
app.put('/userProfile/:userID', async (req, res) => {
  try {
    const { userID } = req.params;
    
    // Validate userID (basic validation example)
    if (!userID) {
      return res.status(400).json({ 
        success: false, 
        message: 'User ID is required' 
      });
    }
    
    // Extract user data from request body
    const { userName, userEmail, userPhone, userCreditCard } = req.body;
    
    // Find and update the user
    const updatedUser = await User.findOneAndUpdate(
      { userID: userID },
      { 
        userName, 
        userEmail, 
        userPhone, 
        userCreditCard 
      },
      { new: true }
    );
    
    // Check if user exists
    if (!updatedUser) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }
    
    // Return updated user profile
    return res.status(200).json({
      success: true,
      message: 'User profile updated successfully',
      data: updatedUser
    });
    
  } catch (error) {
    console.error('Error updating user profile:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

app.listen(port, () => {
    console.log("Server is running at port " + port)
})