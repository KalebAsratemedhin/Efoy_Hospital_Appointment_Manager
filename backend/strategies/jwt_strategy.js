require("dotenv").config();

const secret = process.env.JWT_SECRET
const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const Doctor = require('../models/doctor')
const User = require('../models/user')


const opts = {
  jwtFromRequest: (req) => {
    return req.cookies.token; 
  }, 
  secretOrKey: secret,
}; 

passport.use(new JWTStrategy(opts, async (jwt_payload, done) => {
  try {

    if(jwt_payload.role == "doctor"){
      const doctor = await Doctor.findOne({user_id: jwt_payload.id}).populate('user_id')
      return done(null, {role: jwt_payload.role, data: doctor});

    }

    const user = await User.findById(jwt_payload.id)

    if (user) {
      return done(null, {role: jwt_payload.role, data: user});
    } else {
      return done(null, false);
    }
      
  } catch (error) {
    return done(error, false);
  }
}));


module.exports = passport;
