require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('./models/user.js')
const path = require('path');


const cookieParser = require('cookie-parser')
const connectDatabase = require('./config/db.js');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:5000/auth/google/callback'
},
async (req, accessToken, refreshToken, profile, done) => {
  
  try {
    console.log('profile', profile)

    let user = await User.findOne({ googleId: profile.id });
    console.log('user', user)

    if (!user) {
        user = await User.create({
            googleId: profile.id,
            fullName: profile.displayName,
            email: profile.emails[0].value,
            profilePic: profile.photos[0].value,
        });

        console.log("user", user)

    }
 
    return done(null, user);
   
  } catch (err) {
    done(err, null);
  }
}));

const cors = require('cors');      

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

app.use('/bookings', require('./routes/booking.js'));
app.use('/comments', require('./routes/comment.js'));
app.use('/ratings', require('./routes/rating.js'));    
 
app.use('/doctor', require('./routes/doctor.js'));
app.use('/user', require('./routes/user.js'));
app.use('/auth', require('./routes/auth.js'));
app.use('/doctor-applications', require('./routes/doctorApplication.js'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
 