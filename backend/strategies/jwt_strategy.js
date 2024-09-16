require("dotenv").config();

const secret = process.env.JWT_SECRET
const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const Doctor = require('../models/doctor')
const Patient = require('../models/patientModel')




const opts = {
  jwtFromRequest: (req) => {
    return req.cookies.token; 
  }, 
  secretOrKey: secret,
}; 

passport.use(new JWTStrategy(opts, async (jwt_payload, done) => {
  try {
    if(jwt_payload.role == "patient"){

      const patient = await Patient.findById(jwt_payload.id)

      if (patient) {
        return done(null, {role: jwt_payload.role, data: patient});
      } else {
        return done(null, false);
      }
      
    } else if(jwt_payload.role == "doctor"){
      const doctor = await Doctor.findById(jwt_payload.id)
      
      if (doctor) {
        return done(null, {role: jwt_payload.role, data: doctor});
      } else {
        return done(null, false);
      }

    } else{
      console.log("passport found no role");
      done(null, false);
    }

   
  } catch (error) {
    return done(error, false);
  }
}));


module.exports = passport;
