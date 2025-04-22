const { Cron } = require("croner");
const { logger } = require("./src/config/logger.config");
const { getAllContact } = require("./src/controller/index.controller");

logger.verbose(`**** Into the Croner ****`);
const sync = new Cron(
  "0 11 * * *", // Cron expression for 8:00 AM daily
  { timezone: "Asia/Kolkata" },
  async () => {
    try {
      logger.verbose(
        "* * * * * * * * * * CRON JOB STARTED * * * * * * * * * *"
      );

      await getAllContact();

      logger.verbose(
        "* * * * * * * * * * CRON JOB ENDED * * * * * * * * * *\n\n"
      );
    } catch (error) {
      logger.error(`Error in handling Cron Job :: ${error}`);
      console.log("Error in handling Cron Job...", error);
    }
  }
);
