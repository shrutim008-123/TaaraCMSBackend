import AboutUs from "../model/AboutUs.model.js";

const createAboutUsContent = async (req, res) => {
  try {
    const aboutus = await AboutUs.create(req.body);
    res.status(201).json(aboutus);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateAboutUsContent = async (req, res) => {
  console.log(req.body.heroSection.images);
  console.log(req.params.id);
  try {
    const aboutuscontent = await AboutUs.findByIdAndUpdate(
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

const getAboutUsContent = async (req, res) => {
  try {
    const aboutus = await AboutUs.find(req.params.id);
    const aboutuscontent = aboutus[0];
    res.status(200).json(aboutuscontent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { createAboutUsContent, updateAboutUsContent, getAboutUsContent };
