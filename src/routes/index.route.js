const express = require("express");
const routes = express.Router();
const { WELCOME_MESSAGE } = require("../config/env.config");
const { logger } = require("../config/logger.config");

const { getAllContact } = require("../controller/index.controller");

routes.all("/", async (req, res) => {
  try {
    return res.status(200).send(`<center>${WELCOME_MESSAGE}</center>`);
  } catch (error) {
    logger.debug(error);
    logger.error(`Error in index route :: ${error.message}`);
  }
});

routes.post("/getAllContact", getAllContact);

module.exports = routes;
