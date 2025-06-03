import homepageModel from "../model/Homepage.model.js";

const createHomepageContent = async (req, res) => {
  try {
    const homepage = await homepageModel.create(req.body);
    res.status(201).json(homepage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateHomepageContent = async (req, res) => {
  try {
    const homepage = await homepageModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(homepage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getHomepageContent = async (req, res) => {
  try {
    const homepage = await homepageModel.find(req.params.id);
    const homepagecontent = homepage[0];
    res.status(200).json(homepagecontent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { createHomepageContent, updateHomepageContent, getHomepageContent };
