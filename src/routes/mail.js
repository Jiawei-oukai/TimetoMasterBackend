import express from "express";
import { sendMail } from "../controllers/mail-controller.js";

const mailRouter = express.Router();

mailRouter.route("/").post(sendMail);

export default mailRouter;
