import { Router } from "express";

import auth from "./app/middlewares/auth";

import yupValidation from "./app/middlewares/yup";

import user from "./app/controllers/UsersController";
import wallet from "./app/controllers/WalletsController";
import sessions from "./app/controllers/SessionsController";
import transfer from "./app/controllers/TransfersController";

const routes = new Router();

// test
routes.get("/wallets", wallet.getAllWallets);

// user routes
routes.get("/users", user.getAllUsers);
routes.post("/users", yupValidation.userRegisterSchema, user.registerNewUser);

// session routes
routes.post("/sessions", yupValidation.sessionsSchema, sessions.createSession);

// auth
routes.use(auth);

// transaction routes
routes.post("/transaction", yupValidation.transactionSchema, transfer.transfer);

export default routes;
