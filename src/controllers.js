const axios = require('axios');
const ErrorResponse = require('./helpers/errorResponse');
const asyncHandler = require('./helpers/asyncHandler');
const Topic = require('./models/Topic');
const { isEmpty, isURL } = require('./helpers/validations');

/**
 * Creates a subscription to a topic.
 *
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 *
 * @returns JSON response containing the url and the topic.
 */
exports.createSubscription = asyncHandler(async (req, res) => {
  const { url } = req.body;

  const topic = await Topic.findOne({ name: req.params.topic });
  if (!topic) {
    throw new ErrorResponse('Topic does not exist.', 404);
  }

  // Check if URL is already subscribed to this topic.
  const isSubscribed = topic.subscribers.some(
    (subscriber) => subscriber === url
  );

  if (!isSubscribed) {
    if (isEmpty(url)) throw new ErrorResponse('URL cannot be empty.', 400);

    if (!isURL(url)) {
      throw new ErrorResponse('Subscriber must be a valid URL.', 400);
    }

    topic.subscribers.push(url);
    await topic.save();
  }

  res.status(200).json({ url, topic: topic.name });
});

/**
 * Publish a message to topic and send HTTP requests to topic subscribers.
 *
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 *
 * @returns HTTP response based on successful or unsuccessful publish.
 */
exports.publishMessage = asyncHandler(async (req, res) => {
  const topic = await Topic.findOne({ name: req.params.topic });
  if (!topic) {
    throw new ErrorResponse('Unable to publish message to this topic.', 404);
  }

  const payload = {
    topic: topic.name,
    data: { ...req.body },
  };

  const axiosConfig = {
    headers: { 'Content-Type': 'application/json' },
  };

  topic.subscribers.forEach(async (subscriber) => {
    try {
      await axios.post(subscriber, payload, axiosConfig);
    } catch (error) {
      console.log(subscriber);
    }
  });

  res.status(200).json({ message: 'Message published successfully.' });
});
