import financialPageModel from "../model/Financial.model.js";

const createFinancialPageContent = async (req, res) => {
  try {
    const financialPage = await financialPageModel.create(req.body);
    res.status(201).json(financialPage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateFinancialPageContent = async (req, res) => {
  console.log(req.body);
  try {
    const financialPage = await financialPageModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );
    res.status(200).json(financialPage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getFinancialPageContent = async (req, res) => {
  try {
    const financialPage = await financialPageModel.find();
    const financialPagecontent = financialPage[0];
    res.status(200).json(financialPagecontent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export {
  createFinancialPageContent,
  updateFinancialPageContent,
  getFinancialPageContent
};
