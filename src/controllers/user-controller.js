import * as userService from "../services/user-services.js";
import { setResponse, setErrorResponse } from "./response-handler.js";
import { hashFunction } from "../services/harsh-service.js";
import { request, response } from "express";
import { validatePassword } from "../services/validatePassword-service.js";
import { signjwt } from "../services/jsonWebToken-servce.js";
import config from "config";

export const index = async (requst, response) => {
  try {
    const params = { ...requst.query };
    const users = await userService.search(params);
    setResponse(users, response);
  } catch (error) {
    setErrorResponse(500, error, response);
  }
};

//controller function to create user
export const createNewUser = async (request, response) => {
  try {
    const newUser = request.body;
    newUser.password = await hashFunction(newUser.password);
    const user = await userService.save(newUser);
    setResponse(user, response);
  } catch (error) {
    setErrorResponse(500, error, "response");
  }
};

//controller function to get user by ID
export const getById = async (request, response) => {
  try {
    const id = request.params.id;
    const user = await userService.getById(id);
    setResponse(user, response);
  } catch (error) {
    setErrorResponse(500, error, response);
  }
};

export const validateUser = async (request, response) => {
  try {
    const UserInfo = request.body;
    const user = await userService.validate(UserInfo);
    setResponse(user, response);
  } catch (error) {
    setErrorResponse(401, error, response);
  }
};

//controller function to get user by Email
export const getByEmail = async (request, response) => {
  try {
    const email = request.params.email;
    const user = await userService.getByEmail(email);
    setResponse(user, response);
  } catch (error) {
    setErrorResponse(500, error, response);
  }
};

//controller function to update user
export const updateReminder = async (request, response) => {
  try {
    const id = request.params.id;
    const updateduser = request.body;
    const user = await userService.update(id, updateduser);
    setResponse(user, response);
  } catch (error) {
    setErrorResponse(500, error, response);
  }
};

//controller function to delete user
export const deleteReminder = async (request, response) => {
  try {
    const id = request.params.id;
    const user = await userService.remove(id);
    setResponse(user, response);
  } catch (error) {
    setErrorResponse(500, error, response);
  }
};

// function to authenticate user

// export const authUser = async (request, response) => {
//   try {
//     const authRequest = request.body;
//     const userName = { userName: authRequest.userName };
//     let user = await userService.getByUserName(userName);
//     if (!user) return response.status(400).send("Invalid username or password");
//     const validPassword = await validatePassword(
//       authRequest.password,
//       user.password
//     );
//     if (!validPassword)
//       return response.status(400).send("Invalid username or password");
//     const tokenObj = {
//       _id: user._id,
//       isAdmin: user.isAdmin,
//       userName: user.userName,
//     };
//     const token = await signjwt(tokenObj, "jwtPrivateKey");
//     // const token = await signjwt(tokenObj, config.get('jwtPrivateKey'));
//     setResponse(token, response);
//   } catch (error) {
//     setErrorResponse(500, error, response);
//   }
// };



