import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

// get url from .env file
const URL = process.env.CONNECTION_URL;

// establish a connection to the database
function connection(){
    try {
        mongoose.connect(URL);

    } catch (error) {
        handleError(error);
    }

    const mongodb = mongoose.connection;
    mongodb.on('connected', console.log.bind(console, 'MongoDB & Mongoose Connected'));
    mongodb.on('error', err => { logError(err); });
}

export default connection
