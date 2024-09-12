require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const Patient = require('./models/patientModel.js')

const cookieParser = require('cookie-parser')
const connectDatabase = require('./config/db.js');
const bookingRoutes = require('./routes/bookingRoutes.js')
const authRoutes = require('./routes/authRoutes.js')
const doctorRoutes = require('./routes/doctorRoutes.js')
const patientRoutes = require('./routes/patientRoutes.js')
const commentRoutes = require('./routes/commentRoutes.js')
const ratingRoutes = require('./routes/ratingRoutes.js')

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:5000/auth/google/callback'
},
async (accessToken, refreshToken, profile, done) => {
  
  try {
    // Find the user in the database based on their Google ID
    console.log("google auth middleware", profile)
    const email = profile.emails[0].value
    const username = email.split("@")[0]


    let [user] = await Patient.find({ email: email });

    if (!user) {
      const user = await Patient.create({
        fullName: profile.displayName,
        email: email,
        username: username, 
        
      })
    
    }

    done(null, user);
  } catch (err) {
    done(err, null);
  }
}));

const cors = require('cors');      
require('./strategies/jwt_strategy');

const corsOpts = {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],  
    exposedHeaders: ['Content-Type']
  };
const app = express();
const PORT = process.env.PORT; 
app.use(cors(corsOpts));



connectDatabase();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use('/bookings', bookingRoutes);
app.use('/comments', commentRoutes);
app.use('/ratings', ratingRoutes);    
 
app.use('/doctor', doctorRoutes);
app.use('/patient', patientRoutes);
app.use('/auth', authRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
 