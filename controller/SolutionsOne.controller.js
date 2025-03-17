import Solution1PageModel from "../model/SolutionOnePage.model.js";

const createSolution1Content = async (req, res) => {
  try {
    const aboutus = await Solution1PageModel.create(req.body);
    res.status(201).json(aboutus);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateSolution1Content = async (req, res) => {
  console.log("==>", req.body);
  console.log(req.params.id);
  try {
    const solution1Content = await Solution1PageModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(solution1Content);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getSolution1Content = async (req, res) => {
  try {
    const aboutus = await Solution1PageModel.find(req.params.id);
    const solution1Content = aboutus[0];
    console.log(solution1Content);
    res.status(200).json(solution1Content);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { createSolution1Content, updateSolution1Content, getSolution1Content };
