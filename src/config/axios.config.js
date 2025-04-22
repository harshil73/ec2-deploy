const axios = require("axios");
const sleep = require("../helpers/sleep.js");
const { HUBSPOT_API_URL, HUBSPOT_TOKEN } = require("./env.config.js");
const { logger } = require("../config/logger.config");
const axiosHubspot = axios.create({
  baseURL: HUBSPOT_API_URL,
  headers: {
    Authorization: `Bearer ${HUBSPOT_TOKEN}`,
    "Content-Type": "application/json",
  },
  timeout: 3600 * 1000,
});

axiosHubspot.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log("Error received from hubspot ", error);
    logger.error(`Error received from hubspot ${error}`);
    const originalRequest = error.config;
    if (
      error?.code == "ECONNRESET" ||
      error?.code == "EAI_AGAIN" ||
      error?.code == 429 ||
      error?.response?.status == 429 ||
      error?.response?.status == 502 ||
      error?.code == 502 ||
      error?.response?.status == 520 ||
      error?.code == 520
    ) {
      logger.error(
        `Error in axiosHubspot response interceptor, error code :: ${error?.code} ,errno :: ${error?.errno} status :: ${error?.response?.status}`
      );

      await sleep(5000);
      logger.verbose("Sleep completed. Retrying API Call");
      originalRequest._retry = true;
      return axiosHubspot({
        ...originalRequest,
        headers: { ...originalRequest.headers },
      });
    }
    return Promise.reject(error);
  }
);

module.exports = { axiosHubspot };
