import SolutionPageModel from "../model/SolutionPage.model.js";

const createSolutionContent = async (req, res) => {
  try {
    const aboutus = await SolutionPageModel.create(req.body);
    res.status(201).json(aboutus);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateSolutionContent = async (req, res) => {
  console.log("==>", req.body);
  console.log(req.params.id);
  try {
    const aboutuscontent = await SolutionPageModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(aboutuscontent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getSolutionContent = async (req, res) => {
  try {
    const aboutus = await SolutionPageModel.find(req.params.id);
    const aboutuscontent = aboutus[0];
    res.status(200).json(aboutuscontent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { createSolutionContent, updateSolutionContent, getSolutionContent };
