const mongoose = require('mongoose');
const mongoURI = 'mongodb://127.0.0.1:27017/Efoy_db';


const connectDatabase = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Mongo db connected")
    } catch (error) { 
        console.log(`error ${error}`)
    }

};

module.exports = connectDatabase;
