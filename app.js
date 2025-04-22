const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { PORT } = require("./src/config/env.config");
const { logger } = require("./src/config/logger.config");
const routes = require("./src/routes/index.route");
require("./cron");

app.use(routes);

app.listen(PORT, () => {
  logger.verbose(`server is running on ${PORT}`);
});
