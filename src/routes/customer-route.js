import express from "express";
import * as customerController from "./../controllers/customer-controller.js";
import { verifyjwt } from "./../services/jsonWebToken-servce.js";

const customerRouter = express.Router();

customerRouter
  .route("/auth-customer")
  .post(customerController.authCustomer);

  //get current customer

 // customerRouter.route("/me").get(customerController.getById);
/*
customerRouter
  .route("/")
  .get(customerController.index)
  .post(customerController.post);
  router.get("/", verifyJWT, customerController.index);
*/
customerRouter.route("/").get(customerController.index);
//route protected with JWT
customerRouter.post("/", verifyjwt, customerController.post);

customerRouter
  .route("/:id")
  .get(customerController.getById)
  .put(customerController.updateReminder)
  .delete(customerController.deleteReminder);

customerRouter.route("/:id/openPrime").put(customerController.openPrime);
customerRouter.route("/:id/closePrime").put(customerController.closePrime);

export default customerRouter;
