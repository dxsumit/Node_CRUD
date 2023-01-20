const mongoose = require('mongoose');

const connectionString = ''; // security string has been removed for security purpose..

const connectToDB = () => {
    return mongoose.connect(connectionString);
}


module.exports = {connectToDB}




