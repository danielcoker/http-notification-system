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
