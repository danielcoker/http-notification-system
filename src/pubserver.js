const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const setupMongoose = require('./helpers/setupMongoose');
const routes = require('./routes');
const errorHandler = require('./helpers/errorHandler');

dotenv.config();

// Connect to MongoDB server.
setupMongoose();

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/', routes);

app.use(errorHandler);

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, console.log(`Server running on port ${PORT}`));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);

  // Close server and exit process.
  server.close(() => process.exit(1));
});

module.exports = app;
