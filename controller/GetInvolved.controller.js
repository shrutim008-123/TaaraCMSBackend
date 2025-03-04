import getInvolvedModel from "../model/GetInvolved.model.js";

const createGetInvolvedContent = async (req, res) => {
  try {
    const getInvolved = await getInvolvedModel.create(req.body);
    res.status(201).json(getInvolved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateGetInvolvedContent = async (req, res) => {
  console.log(req.body);
  try {
    const getInvolved = await getInvolvedModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(getInvolved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getGetInvolvedContent = async (req, res) => {
  try {
    const getInvolved = await getInvolvedModel.find(req.params.id);
    const getInvolvedcontent = getInvolved[0];
    res.status(200).json(getInvolvedcontent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export {
  createGetInvolvedContent,
  updateGetInvolvedContent,
  getGetInvolvedContent,
};
