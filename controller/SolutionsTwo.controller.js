import Solution2PageModel from "../model/SolutionTwoPage.model.js";

const createSolution2Content = async (req, res) => {
  try {
    const aboutus = await Solution2PageModel.create(req.body);
    res.status(201).json(aboutus);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateSolution2Content = async (req, res) => {
  //   console.log("==>", req.body);
  console.log(req.params.id);
  try {
    const solution1Content = await Solution2PageModel.findByIdAndUpdate(
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

const getSolution2Content = async (req, res) => {
  try {
    const aboutus = await Solution2PageModel.find(req.params.id);
    const solution1Content = aboutus[0];
    // console.log(solution1Content);
    res.status(200).json(solution1Content);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { createSolution2Content, updateSolution2Content, getSolution2Content };
