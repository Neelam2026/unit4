const User = require("../models/user.model");
const passport = require("passport")
const {uuidv4} = require('uuidv4');
require('dotenv').config()
var GoogleStrategy = require('passport-google-oauth20').Strategy;
 
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback"
  },
 async function(accessToken, refreshToken, profile, cb) {
     let user=await User.findOne({email:profile?._json?.email}).lean().exec()

     if(!user){
        user = await User.create({
            email : profile._json.email,
            password : uuidv4(), 
            role : ["customer"]
        })
    }

    console.log(user)
    return cb(null, user);
  }

))

module.exports = passport;