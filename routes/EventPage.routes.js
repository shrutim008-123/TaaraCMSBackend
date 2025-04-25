import express from "express";
import {
  createEventContent,
  createEventsPageContent,
  getAllEvents,
  getEventById,
  getEventsPageContent,
  updateEventContent,
  updateEventsPageContent
} from "../controller/EventPage.controller.js";

const eventPageRouter = express.Router();

eventPageRouter.get("/", getEventsPageContent);
eventPageRouter.post("/", createEventsPageContent);
eventPageRouter.put("/:id", updateEventsPageContent);

eventPageRouter.get("/events", getAllEvents);
eventPageRouter.get("/events/:id", getEventById);
eventPageRouter.post("/events", createEventContent);
eventPageRouter.put("/events/:id", updateEventContent);

export default eventPageRouter;
