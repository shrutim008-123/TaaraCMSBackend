import eventModel from "../model/Event.model.js";
import eventPageModel from "../model/EventsPage.model.js";
import cloudinary from "../config/cloudinaryConfig.js";

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
        new: true,
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
      new: true,
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

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const event = await eventModel.findById(id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const imagePublicIds = [];

    // Push hero and showcase images
    if (event.heroImage?.publicId)
      imagePublicIds.push(event.heroImage.publicId);
    if (event.showcaseImage?.publicId)
      imagePublicIds.push(event.showcaseImage.publicId);

    // Extract extraInfo image publicIds
    event.extraInfo.forEach((info) => {
      if (info.informationType === "crousel" && Array.isArray(info.crousel)) {
        info.crousel.forEach(
          (item) =>
            item.image?.publicId && imagePublicIds.push(item.image.publicId)
        );
      }
      if (
        info.informationType === "gridImages" &&
        Array.isArray(info.gridImages)
      ) {
        info.gridImages.forEach(
          (img) => img?.publicId && imagePublicIds.push(img.publicId)
        );
      }
    });

    // Delete images from Cloudinary
    const deletePromises = imagePublicIds.map((publicId) =>
      cloudinary.uploader.destroy(publicId)
    );
    await Promise.all(deletePromises);

    // Delete event document
    await eventModel.findByIdAndDelete(id);

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  createEventsPageContent,
  updateEventsPageContent,
  getEventsPageContent,
  createEventContent,
  updateEventContent,
  getAllEvents,
  getEventById,
};
