import express from "express";
import {
  createEventContent,
  createEventsPageContent,
  deleteEvent,
  getAllEvents,
  getEventById,
  getEventsPageContent,
  updateEventContent,
  updateEventsPageContent,
} from "../controller/EventPage.controller.js";
import { verifyToken } from "../middleware/authorization.middleware.js";

const eventPageRouter = express.Router();

eventPageRouter.get("/", getEventsPageContent);
eventPageRouter.post("/", verifyToken, createEventsPageContent);
eventPageRouter.put("/:id", verifyToken, updateEventsPageContent);

eventPageRouter.get("/events", getAllEvents);
eventPageRouter.get("/events/:id", getEventById);
eventPageRouter.post("/events", verifyToken, createEventContent);
eventPageRouter.put("/events/:id", verifyToken, updateEventContent);
eventPageRouter.delete("/events/:id", verifyToken, deleteEvent);

export default eventPageRouter;
