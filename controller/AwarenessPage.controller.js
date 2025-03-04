import awarenessPageModel from "../model/AwarenessPage.model.js";

const createAwarenessPageContent = async (req, res) => {
  try {
    const homepage = await awarenessPageModel.create(req.body);
    res.status(201).json(homepage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateAwarenessPageContent = async (req, res) => {
  console.log(req.body);
  try {
    const homepage = await awarenessPageModel.findByIdAndUpdate(
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

const getAwarenessPageContent = async (req, res) => {
  try {
    const homepage = await awarenessPageModel.find(req.params.id);
    const homepagecontent = homepage[0];
    res.status(200).json(homepagecontent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export {
  createAwarenessPageContent,
  updateAwarenessPageContent,
  getAwarenessPageContent,
};
