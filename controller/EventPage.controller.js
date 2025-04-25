import eventModel from "../model/Event.model.js";
import eventPageModel from "../model/EventsPage.model.js";

const createEventsPageContent = async (req, res) => {
  try {
    const eventsPage = await eventPageModel.create(req.body);
    res.status(201).json(eventsPage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateEventsPageContent = async (req, res) => {
  console.log(req.body);
  try {
    const eventsPage = await eventPageModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );
    res.status(200).json(eventsPage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getEventsPageContent = async (req, res) => {
  try {
    const eventsPage = await eventPageModel.find();
    const eventsPagecontent = eventsPage[0];
    res.status(200).json(eventsPagecontent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createEventContent = async (req, res) => {
  try {
    const event = await eventModel.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateEventContent = async (req, res) => {
  console.log(req.body);
  try {
    const event = await eventModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await eventModel.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await eventModel.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export {
  createEventsPageContent,
  updateEventsPageContent,
  getEventsPageContent,
  createEventContent,
  updateEventContent,
  getAllEvents,
  getEventById
};
