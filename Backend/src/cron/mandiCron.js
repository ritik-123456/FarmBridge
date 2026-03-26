const cron = require('node-cron');
const { fetchAndSyncMandiPrices } = require('../services/mandiService');

// Schedule job to run gracefully every 6 hours
const initCronJobs = () => {
    console.log("Initializing Node-Cron jobs...");
    cron.schedule('0 */6 * * *', () => {
        fetchAndSyncMandiPrices();
    });
};

module.exports = initCronJobs;
