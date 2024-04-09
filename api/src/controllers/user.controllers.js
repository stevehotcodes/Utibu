import {
  dataFethched,
  sendBadRequest,
  sendNotFound,
  sendServerError,
  sendSuccess,
} from "../helpers/helper.function.js";
import {
  findByCredentialsService,
  getAllUsersService,
  getUserByEmailService,
  registerNewUserService,
} from "../services/userService.js";
import logger from "../utils/logger.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userRegistrationValidator } from "../validators/userValidators.js";

export const registerNewUser = async (req, res) => {
  try {
    const newUser = {
      firstname: req.body.firstname,
      middlename: req.body.middlename,
      lastname: req.body.lastname,
      email: req.body.email,
      phone_number: req.body.phone_number,
      password: req.body.password,
    };
    const { error } = userRegistrationValidator(newUser);
    const {firstname, middlename,lastname,email,phone_number,password}=req.body
    // console.log("error", error)
    if (error) {
      sendBadRequest(res, error.details[0].message);
    } else {
      const user = await getUserByEmailService(newUser.email);

      if (user[0]) {
        logger.info(
          `there is an existing account associated with that email, ${user[0].email}`
        );
        sendBadRequest(
          res,
          "there is an existing account associated with that email"
        );
      } else {
        logger.info(req.body);

        const response = await registerNewUserService({
          firstname,
          middlename,
          lastname,
          email,
          phone_number,
          password,
       } );
        logger.info("response from the server", response);
        if (response.rowsAffected > 0) {
          sendSuccess(res, "User registered succcessfully");
        } else {
          sendServerError(res, "Error in registering the user");
        }
      }
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

// get all patients records
export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();
    if (users.length) {
      dataFethched(res, users);
    } else {
      sendNotFound(res, `no users' records found`);
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userResponse = await findByCredentialsService({ email, password });
    logger.info(userResponse);

    if (userResponse.sendNotFoundResponse) {
      sendNotFound(res, userResponse.sendNotFoundResponse);
    }

    if (userResponse.user && userResponse.token) {
      return res
        .status(200)
        .json({
          user: userResponse.user,
          token: userResponse.token,
          message: userResponse.message,
        });
    }

    if (userResponse.sendwrongPassword) {
      logger.info(userResponse.sendwrongPassword);
      sendBadRequest(res, userResponse.sendwrongPassword);
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};
