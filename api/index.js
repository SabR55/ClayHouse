const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user');
const UserCard = require('./models/userCard');
const TrialClass = require('./models/trialClassNewUser');
const Purchase = require('./models/purchase');
const UserBooking = require('./models/userBooking');
const UserNumSessions = require('./models/userNumSessions');
const bcrypt = require('bcrypt');
const CryptoJS = require('crypto-js');
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

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'default_encryption_key_for_development_only';

// For encryption/decryption
const encryptionUtils = {
  encrypt: (text) => {
    if (!text) return null;
    // Make sure we're always working with strings
    const textString = String(text);
    return CryptoJS.AES.encrypt(textString, ENCRYPTION_KEY).toString();
  },
  
  decrypt: (ciphertext) => {
    if (!ciphertext) return null;
    const bytes = CryptoJS.AES.decrypt(ciphertext, ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
};


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


// -----  Add Credit Card -----
app.post('/addCreditCard/:userID', async (req, res) => {
  try {

    const { userID } = req.params;
    const cardDetails = req.body;

    const newUserCard = await UserCard.create({
      userID: userID,
      userCardNum: encryptionUtils.encrypt(cardDetails.userCardNum),  
      userCardName: encryptionUtils.encrypt(cardDetails.userCardName),
      userCardExpDate: encryptionUtils.encrypt(cardDetails.userCardExpDate)
    })

    // Send success response with the created reservation
    res.status(201).json({
      success: true,
      message: 'Credit card added successfully'
  });

  } catch (error) {
    console.error('User creation error:', error);
    
    // Send error response
    res.status(500).json({
        success: false,
        message: 'Failed to add credit card',
        error: error.message
    });
  }
});


// -----  Payment Page, Get last 3 digits of credit card -----
app.get('/creditCardNumber/:userID', async (req, res) => {
  try {
    const { userID } = req.params;
    
    // Find the user's card by userID
    const userCard = await UserCard.findOne({ userID: userID });
    
    // If no card exists for this user, return an empty string
    if (!userCard) {
      return res.status(200).json({
        success: true,
        lastThreeDigits: ''
      });
    }
    
    // Decrypt the card number
    const decryptedCardNum = encryptionUtils.decrypt(userCard.userCardNum);
    
    // Extract the last 3 digits
    const lastThreeDigits = decryptedCardNum ? decryptedCardNum.slice(-3) : '';
    
    // Return the last 3 digits
    res.status(200).json({
      success: true,
      lastThreeDigits: lastThreeDigits
    });
    
  } catch (error) {
    console.error('Error retrieving card info:', error);
    
    // In case of error, return empty string as per requirement
    res.status(200).json({
      success: false,
      lastThreeDigits: '',
      message: 'Error retrieving card information',
      error: error.message
    });
  }
});


// -----  Profile Details Page, get user card details -----
app.get('/creditCardDetails/:userID', async (req, res) => {
 
  try {
    const { userID } = req.params;
      
    // Find the user's card by userID
    const userCard = await UserCard.findOne({ userID: userID });
    
    // If no card exists for this user, return an empty string
    if (!userCard) {
      return res.status(200).json({
        success: true,
        lastThreeDigits: ''
      });
    }

    // Get card num, return last 3 digits
    const decryptedCardNum = encryptionUtils.decrypt(userCard.userCardNum);
    const lastThreeDigits = decryptedCardNum.slice(-3);
    
    // Decrypt the card number
    const cardDetails = ({
      cardName: encryptionUtils.decrypt(userCard.userCardName),
      cardLastThreeDigits: lastThreeDigits,
      cardExpDate:encryptionUtils.decrypt(userCard.userCardExpDate)
    });

    // Return the last 3 digits
    res.status(200).json({
      success: true,
      data: cardDetails
    });
 } catch (error) {
  console.error('Error retrieving card info:', error);
  
  // In case of error, return empty string as per requirement
  res.status(200).json({
    success: false,
    message: 'Error retrieving card information',
    error: error.message
    });
  }
});

// -----  Delete user card -----
app.delete('/deleteUserCard/:userID', async (req, res) => {
  
  const { userID } = req.params;
  
  try {
    // Find and delete card using userID
    const userCard = await UserCard.findOneAndDelete({ userID: userID });
    
    // Check if card was found and deleted
    if (!userCard) {
      return res.status(404).json({
        success: false,
        message: 'Card not found for this user'
      });
    }
    
    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Card deleted successfully',
      data: userCard
    });

  } catch (error) {
    console.error('Error deleting card:', error);
    
    // In case of error, return error response
    return res.status(500).json({
      success: false,
      message: 'Error deleting card',
      error: error.message
    });
  }
});

// ----- Not Logged, Booking Trial Class -----
app.post('/trialClassNewUser', (req, res) => {
  const formData = req.body;

  try {

    // encrypt credit card
    const userCardEcrypted = encryptionUtils.encrypt(formData.cardNum);

    const trialClassNewUser = TrialClass.create({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      cardName: formData.cardName,
      cardNum: userCardEcrypted,
      carExpDate:formData.cardExpDate,
      workshopDate: formData.date,
      workshopTime: formData.time
    })

    res.status(201).json({
      success: true,
      message: 'New Trial User booked successfully',
      data: trialClassNewUser
    });

  } catch (error) {
    console.error('User creation error:', error);
    
    // Send error response
    res.status(500).json({
        success: false,
        message: 'New Trial User booking failed',
        error: error.message
    });
  }
});


// ----- Trial Class, Check if User Exists -----
app.get('/checkUserProfile/:userEmail', async (req, res) => {

  const {userEmail} = req.params;
  console.log(userEmail);

  try {
    const user = await User.findOne({userEmail: userEmail});

    if (!user) {
      // No user was found
      return res.status(505).json({
        success: false,
        message: 'User not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'User found',
      user: userEmail
    });

  } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'message: "Failed to check if email in Trial DB'
      });
  }
});


// ----- Trial Class, Check if email has booked before -----
app.get('/checkTrialUserEmail/:userEmail', async (req, res) => {
  
  const { userEmail } = req.params;

  try {
    const trialClass = await TrialClass.findOne({email: userEmail});

    if (!trialClass) {
      // No user was found
      return res.status(505).json({
        success: false,
        message: error
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Trial Class: User found',
      user: userEmail
    });

  } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to check if email in Trial DB'
      });
  }
});

// ----- Trial Class Booking, Existing user -----
app.post('/trial-class/:userID', async (req, res) => {

  const { userID } = req.params;
  const bookingData = req.body;

  try {
      const trialClass = await TrialClass.create({
        userID: userID,
        workshopDate: bookingData.date,
        workshopTime: bookingData.time
    });

    try {

      const newPurchase = await Purchase.create({
        userID: userID,
        workshopID: bookingData.workshopID,
        purchaseDate: bookingData.currDate,
        cost: bookingData.cost
      })

      const newBooking = await UserBooking.create({
        userID: userID,
        workshopID: bookingData.workshopID,
        workshopDate: bookingData.date,
        workshopTime: bookingData.time
      })
  
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Failed create data for purchase DB'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Successfully booked trial class'
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed book trial class'
    });
  }

});

// ----- Trial Class Booking, Existing user -----
app.get('/trial-class-userID/:userID', async (req, res) => {
  
  const { userID } =  req.params;
  
  try{
    const trialBooking = await TrialClass.findOne({userID: userID});

    if(trialBooking) {
      return res.status(200).json({
        success: true,
        num: 1,
        message: 'User has booked a trial class before'
      });
    }

    return res.status(200).json({
      success: true,
      num: 2,
      message: 'User can book trial class'
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to check trial class'
    });
  }
});


// ----- Delete Booking Class -----
app.delete('/cancel-booking/:bookingID', async (req, res) => {
  
  const { bookingID } = req.params;
  const { userID } = req.body;

  try {

    const bookingDetails = await UserBooking.findById(bookingID);
    console.log("bookingDetails: "+bookingDetails);

    const lessSession = await UserNumSessions.findOne({
      userID: userID,
      workshopID: bookingDetails.workshopID,
    })
    console.log("lessSession: ", lessSession)

    if (lessSession) {
      // Convert string to number, add 1, and convert back to string if needed
      const updatedSessions = parseInt(lessSession.numOfSessions) + 1;
      console.log("updatedSessions: "+ updatedSessions);
      
      
      await UserNumSessions.updateOne(
        { 
          userID: userID, 
          workshopID: bookingDetails.workshopID 
        },
        { $set: { numOfSessions: updatedSessions.toString() } }
      );
    }

    const booking = await UserBooking.findByIdAndDelete(bookingID);
    
    // Check if booking was found and deleted
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting class',
      error: error.message
    });
  }
});

// ----- Get Purchases -----
app.get('/purchases/:userID', async (req, res) => {

  const { userID } = req.params;

  try {

    const purchases = await Purchase.find({
      userID: userID
      }).sort({ workshopDate: 1 }); // Sort by date ascending

      res.status(200).json({
        success: true,
        data: purchases
      });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving purchases',
      error: error.message
    });
  }


});

// ----- Buy Regular Workshop -----
app.post('/book-class/:userID', async (req, res) => {

  const { userID } = req.params;
  const bookingData = req.body;

  try {
    const newPurchase = await Purchase.create({
      userID: userID,
      workshopID: bookingData.workshopID,
      purchaseDate: bookingData.currDate,
      cost: bookingData.cost
    })

    const newSessions = await UserNumSessions.create({
      userID: userID,
      workshopID: bookingData.workshopID,
      numOfSessions: "5"
    })

    res.status(200).json({
      success: true,
      data: newPurchase
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error posting workshop purchase',
      error: error.message
    });
  }
});

// ----- Book Regular Workshop -----
app.post('/book-workshop/:userID', async (req, res) => {

  const { userID } = req.params;
  const bookingDetails = req.body;

  try {
    const newBooking = await UserBooking.create({
      userID: userID,
      workshopID: bookingDetails.workshopID,
      workshopDate: bookingDetails.date,
      workshopTime: bookingDetails.time
    })

    const lessSession = await UserNumSessions.findOne({
      userID: userID,
      workshopID: bookingDetails.workshopID,
    })

    if (lessSession) {
      // Convert string to number, subtract 1, and convert back to string if needed
      const updatedSessions = parseInt(lessSession.numOfSessions) - 1;
      
      // Update the document in the database
      await UserNumSessions.updateOne(
        { 
          userID: userID, 
          workshopID: bookingDetails.workshopID 
        },
        { $set: { numOfSessions: updatedSessions.toString() } }
      );
    }

    res.status(200).json({
      success: true,
      data: newBooking
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error posting workshop purchase',
      error: error.message
    });
  }
});


// ----- Trial Class Booking, Existing user -----
app.get('/user-upcoming-classes/:userID', async (req, res) => {

  const { userID } = req.params; 

  try {

    const now = new Date();
    const todayFormatted = now.toISOString().split('T')[0];
    
    const upcomingClasses = await UserBooking.find({
      userID: userID,
      }).sort({ workshopDate: 1 });

      res.status(200).json({
        success: true,
        data: upcomingClasses
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching upcoming classes',
      error: error.message
    });
  }
});


// ----- Retrieve Workshops for Booking -----
app.get('/bookings/:userID', async (req, res) => {

  const { userID } = req.params;

  try {

    const bookings = await UserNumSessions.find({userID: userID})

    res.status(200).json({
      success: true,
      data: bookings
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving purchases',
      error: error.message
    });
  }


});


app.listen(port, () => {
    console.log("Server is running at port " + port)
})