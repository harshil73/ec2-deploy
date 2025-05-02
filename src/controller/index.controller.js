const { axiosHubspot } = require("../config/axios.config");
const { logger } = require("../config/logger.config");
const getAllContact = async (req, res) => {
  let url = `/crm/v3/objects/contacts?limit=100`;
  let response;
  let startIndex = 1,
    batchIndex = 0,
    endIndex;
  do {
    response = await axiosHubspot.get(`${url}`);
    if (response?.data?.paging) {
      after = response?.data?.paging?.next?.after;
      logger.verbose(`<><><><><> after <><><><><> ${after}`);
      url = `/crm/v3/objects/contact?after=${after}&limit=100`;
    }

    const contactBatch = response?.data?.results;

    endIndex = startIndex + contactBatch.length - 1;

    logger.verbose(
      `startIndex:- ${startIndex}, endIndex:- ${endIndex} and batchIndex:- ${batchIndex}`
    );
    for (const element of contactBatch) {
      const contactObj = {
        contact_id: element?.properties?.hs_object_id,
        contactEmail: element?.properties?.email,
      };
      logger.verbose(`contactObj :- ${JSON.stringify(contactObj, null, 3)}`);
    }

    startIndex += response?.data?.results?.length;
    batchIndex++;
  } while (response.data.results.length >= 100);
  logger.verbose("**** Script Completed. Done With All Contacts ****");
};

module.exports = { getAllContact };
