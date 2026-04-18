import { Router } from "express";
import { JobController } from "../controllers/jobs.js";

export const jobsRouter = Router()

jobsRouter.get("/", JobController.getAll)
jobsRouter.get("/:id", JobController.getId)
jobsRouter.post("/", JobController.create)
jobsRouter.put("/", JobController.update)
jobsRouter.patch("/", JobController.partialUpdate)
jobsRouter.delete("/", JobController.delete)