import HealProjectPageModel from "../model/HealProjectPage.model.js";

const createHealProjectContent = async (req, res) => {
  try {
    const homepage = await HealProjectPageModel.create(req.body);
    res.status(201).json(homepage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateHealProjectContent = async (req, res) => {
  console.log(req.body);
  try {
    const homepage = await HealProjectPageModel.findByIdAndUpdate(
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

const getHealProjectContent = async (req, res) => {
  try {
    const homepage = await HealProjectPageModel.find(req.params.id);
    const homepagecontent = homepage[0];
    res.status(200).json(homepagecontent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export {
  createHealProjectContent,
  updateHealProjectContent,
  getHealProjectContent,
};
