import newMembersModel from "../model/NewMembers.model.js";

const createNewMemberContent = async (req, res) => {
  try {
    const newsLetter = await newMembersModel.create(req.body);
    res.status(201).json(newsLetter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getNewMemberData = async (req, res) => {
  try {
    const data = await newMembersModel.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { createNewMemberContent, getNewMemberData };
