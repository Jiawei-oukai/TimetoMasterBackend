//route restful
import express from 'express';
import * as achievementController from './../controllers/achievement-controller.js';

const achievementRouter = express.Router();

// achievementRouter.route('')
//     .post(achievementController.post)
//     ;

achievementRouter.route('')
  .get(achievementController.index)
  .post(achievementController.post);

achievementRouter.route('/:id')
    .get(achievementController.find)
    .put(achievementController.Update)
    .delete(achievementController.Remove);

achievementRouter.route('/user/:userId')
    .get(achievementController.Fetch);

export default achievementRouter;