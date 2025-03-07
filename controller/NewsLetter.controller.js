import newsLetterModel from "../model/NewsLetter.model.js";

const createNewsLetterContent = async (req, res) => {
  try {
    const newsLetter = await newsLetterModel.create(req.body);
    res.status(201).json(newsLetter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getNewsLetterData = async (req, res) => {
  try {
    const data = await newsLetterModel.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { createNewsLetterContent, getNewsLetterData };
