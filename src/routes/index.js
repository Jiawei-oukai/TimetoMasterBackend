import customerRouter from "./customer-route.js";
import mailRouter from "./mail.js";
import userRouter from "./user-route.js";
import goalRouter from "./goal-route.js";
import achievementRouter from './achievement-route.js';
import recordsRouter from './records-route.js';

const registerRoutes = (app) => {
  app.use("/users", userRouter);
  app.use("/customers", customerRouter);
  app.use("/mail", mailRouter);
  app.use('/goals', goalRouter);
  app.use('/achievements', achievementRouter);  
  app.use('/records', recordsRouter);
};

export default registerRoutes;
