import express from "express";

import * as goalController from "./../controllers/goal-controller.js";

const goalRouter = express.Router();

goalRouter
  .route('')
  .get(goalController.index)
  .post(goalController.post);

goalRouter
  .route('/:id')
  .get(goalController.getById)
  .put(goalController.put)
  .delete(goalController.remove);

goalRouter
  .route('/user/:userId')
  .get(goalController.getByUserId);

goalRouter
  .route('/userEmail/:userEmail')
  .get(goalController.getByUserEmail);

/**
 * URL: /goals/search/progress?start=AA&end=BB
 *
 * For example:
 * http://localhost:9002/goals/search/progress?email=123456&start=50&end=100
 * http://localhost:9002/goals/search/progress?email=123456&start=0&end=50
 **/
goalRouter.route('/search/progress').get(goalController.searchByProgress);



export default goalRouter;
