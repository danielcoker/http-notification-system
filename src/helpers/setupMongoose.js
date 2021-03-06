const mongoose = require('mongoose');
const { getConnectionUrl, getDefaultConnectionOptions } = require('./mongodb');

/**
 * Connect to mongodb server.
 *
 * @returns MongoDB connection.
 */
const setupMongoose = () => {
  return mongoose.connect(
    getConnectionUrl(),
    getDefaultConnectionOptions(),
    (err) => {
      if (err) throw err;
      console.log('Connected with Mongoose');
    }
  );
};

module.exports = setupMongoose;
