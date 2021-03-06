const dotenv = require('dotenv');

dotenv.config();

const NODE_ENV = process.env.NODE_ENV;

/**
 * Get connection URL depending on the NODE_ENV.
 *
 * @returns {String} The connection URL.
 */
const getConnectionUrl = () => {
  let connectionUrl;

  switch (NODE_ENV) {
    case 'production':
      connectionUrl = process.env.DB_PROD_URL;
      break;
    case 'development':
      connectionUrl = process.env.DB_DEV_URL;
      break;
    case 'test':
      connectionUrl = process.env.DB_TEST_URL;
      break;
    default:
      connectionUrl = process.env.DB_DEV_URL;
  }

  return connectionUrl;
};

/**
 * Create the mongoose connection options object.
 *
 * @returns {Object} The connection options object.
 */
const getDefaultConnectionOptions = () => ({
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

module.exports = { getConnectionUrl, getDefaultConnectionOptions };
