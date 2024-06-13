import Customer from "../models/customers.js";
import * as customerService from "../services/customer-services.js";
import { setResponse, setErrorResponse } from "./response-handler.js";
import _ from "lodash";
import { hashFunction } from "../services/harsh-service.js";
import { validatePassword } from "../services/validatePassword-service.js";
import { signjwt, verifyjwt } from "../services/jsonWebToken-servce.js";
import config from "config";

//controller function to get all customers
export const index = async (request, response) => {
  try {
    const params = { ...request.query };
    const customers = await customerService.search(params);

    setResponse(customers, response);
  } catch (error) {
    setErrorResponse(500, error, response);
  }
};

//controller function to create customer
export const post = async (request, response) => {
  //verifyjwt(request, response);
  try {
    const newCustomer = request.body;
    const customerEmail = { email: newCustomer.email };
    let customer = await customerService.getByEmail(customerEmail);
    if (customer) return response.status(400).send("User already registered");
    newCustomer.password = await hashFunction(newCustomer.password);

    customer = await customerService.save(newCustomer);
    const _array = [
      "_id",
      "name",
      "email",
      "address",
      "DOB",
      "country",
      "phone",
      "primeCustomer",
    ];
    const _customer = _.pick(customer, _array);
    setResponse(_customer, response);
  } catch (error) {
    setErrorResponse(500, error, response);
  }
};

//controller function to get customer by ID
export const getById = async (request, response) => {
  try {
    const id = request.params.id;
    const customer = await customerService.getById(id);
    const _array = [
      "_id",
      "name",
      "email",
      "address",
      "DOB",
      "country",
      "phone",
      "primeCustomer",
    ];
    const _customer = _.pick(customer, _array);
    setResponse(_customer, response);
  } catch (error) {
    setErrorResponse(500, error, response);
  }
};

//controller function to update customer
export const updateReminder = async (request, response) => {
  try {
    const id = request.params.id;
    const updatedCustomer = request.body;
    const customer = await customerService.update(id, updatedCustomer);
    const _array = [
      "_id",
      "name",
      "email",
      "address",
      "DOB",
      "country",
      "phone",
      "primeCustomer",
    ];
    const _customer = _.pick(customer, _array);
    setResponse(_customer, response);
  } catch (error) {
    setErrorResponse(500, error, response);
  }
};

//controller function to delete customer
export const deleteReminder = async (request, response) => {
  try {
    const id = request.params.id;
    const customer = await customerService.remove(id);
    const _array = [
      "_id",
      "name",
      "email",
      "address",
      "DOB",
      "country",
      "phone",
      "primeCustomer",
    ];
    const _customer = _.pick(customer, _array);
    setResponse(_customer, response);
  } catch (error) {
    setErrorResponse(500, error, response);
  }
};

//function to authenticate customer

export const authCustomer = async (request, response) => {
  try {
    const authRequest = request.body;
    const customerEmail = { email: authRequest.email };
    let customer = await customerService.getByEmail(customerEmail);
    if (!customer)
      return response.status(400).send("Invalid email or password");
    const validPassword = await validatePassword(
      authRequest.password,
      customer.password
    );
    if (!validPassword)
      return response.status(400).send("Invalid email or password");
    const tokenObj = {
      _id: customer._id,
      primeCustomer: customer.primeCustomer,
      email: customer.email,
    };
    //const token = await signjwt(tokenObj, config.get("jwtPrivateKey"));
    const token = await signjwt(tokenObj, "jwtPrivateKey");
    response
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token");
    setResponse(token, response);
  } catch (error) {
    setErrorResponse(500, error, response);
  }
};

export const openPrime = async (request, response) => {
  const id = request.params.id;

  try {
    const result = await customerService.openPrime(id);
    response.status(200).json(result);
  } catch (error) {
    response.status(500).json({ error: error.toString() });
  }
};

// export const closePrime = async (request, response) => {
//   //wait to be implemented
// }

export const closePrime = async (request, response) => {
  const id = request.params.id;

  try {
    const result = await customerService.closePrime(id);
    response.status(200).json(result);
  } catch (error) {
    response.status(500).json({ error: error.toString() });
  }
};
