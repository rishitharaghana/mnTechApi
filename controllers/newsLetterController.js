const NewsLetterSubscribe = require("../models/newsLetterSubscribeModel");

const subscribeToNewsletter = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const exists = await NewsLetterSubscribe.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "Already subscribed" });
    }

    const newEntry = new NewsLetterSubscribe({ email });
    await newEntry.save();

    return res.status(201).json({ message: "Subscribed successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
 
};

const getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await NewsLetterSubscribe.find().sort({ createdAt: -1 });
    res.status(200).json(subscribers);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch subscribers", error: err.message });
  }
};

module.exports = { subscribeToNewsletter,getAllSubscribers };
