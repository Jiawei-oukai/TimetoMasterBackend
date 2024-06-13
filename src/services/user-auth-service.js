import User from "../models/userers.js";
//get customer by email

export const getByUserName = async (userName) => {
  const user = User.findOne(userName).exec();
  return user;
};
