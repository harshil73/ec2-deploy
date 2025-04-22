const dotenv = require("dotenv");
const path = require("path");

const environment = process.env.NODE_ENV?.trim() || "development";

dotenv.config({
  path: path.resolve(`./.env.${environment}`),
});

const envObject = {
  PORT: +process.env.PORT || 8878,
  WELCOME_MESSAGE: process.env.WELCOME_MESSAGE,
  HUBSPOT_API_URL: process.env.HUBSPOT_API_URL,
  HUBSPOT_TOKEN: process.env.HUBSPOT_TOKEN,
};

module.exports = envObject;
