const mongoose = require('mongoose');

const connectDB = async (uri,dbName) => {
    try {
        await mongoose.connect(uri,{dbName: dbName});
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
    }
};

module.exports = connectDB;
