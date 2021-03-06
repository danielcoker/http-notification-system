const axios = require('axios');
const Topic = require('./models/Topic');

/**
 * Creates a subscription to a topic.
 *
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 *
 * @returns JSON response containing the url and the topic.
 */
exports.createSubscription = async (req, res) => {
  const topic = await Topic.findOne({ name: req.params.topic });

  // Check if URL is already subscribed to this topic.
  const isSubscribed = topic.subscribers.some(
    (subscriber) => subscriber === req.body.url
  );

  if (!isSubscribed) {
    topic.subscribers.push(req.body.url);
    await topic.save();
  }

  res.status(200).json({ url: req.body.url, topic: topic.name });
};

/**
 * Publish a message to topic and send HTTP requests to topic subscribers.
 *
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 *
 * @returns HTTP response based on successful or unsuccessful publish.
 */
exports.publishMessage = async (req, res) => {
  const topic = await Topic.findOne({ name: req.params.topic });
  if (!topic) res.status(404).json({ message: 'Unable to publish message.' });

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

  res.status(200).json({ message: 'Message published successfuly.' });
};
