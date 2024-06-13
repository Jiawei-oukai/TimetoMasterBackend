import Customer from "../models/customers.js";
//get customer by email

export const getByEmail = async (email) => {
  const customer = Customer.findOne(email).exec();
  return customer;
};
