const axios = require('axios');
const MandiPrice = require('../models/mandiPrice');

const fetchAndSyncMandiPrices = async () => {
    try {
        console.log("Starting Mandi Prices sync...");
        const API_KEY = process.env.API_KEY;
        if (!API_KEY) {
            throw new Error("Missing API_KEY in environment variables");
        }

        // We use offset=0 and limit=1000 dynamically or fixed 1000 records
        const url = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${API_KEY}&format=json&limit=1000`;
        const response = await axios.get(url);
        
        if (!response.data || !response.data.records) {
            console.error("Invalid response format from data.gov.in");
            return;
        }

        const records = response.data.records;
        
        let newEntriesCount = 0;
        let duplicateCount = 0;

        for (const record of records) {
            // Check required fields
            if (!record.state || !record.district || !record.market || !record.commodity || !record.arrival_date) {
                continue;
            }

            // Convert DD/MM/YYYY string to Date
            const [day, month, year] = record.arrival_date.split('/');
            const dateObj = new Date(`${year}-${month}-${day}T00:00:00.000Z`);

            const min = parseFloat(record.min_price) || 0;
            const max = parseFloat(record.max_price) || 0;
            const modal = parseFloat(record.modal_price) || 0;

            const existingRecord = await MandiPrice.findOne({
                state: record.state,
                district: record.district,
                market: record.market,
                commodity: record.commodity,
                arrivalDate: dateObj
            });

            if (!existingRecord) {
                await MandiPrice.create({
                    state: record.state,
                    district: record.district,
                    market: record.market,
                    commodity: record.commodity,
                    minPrice: min,
                    maxPrice: max,
                    modalPrice: modal,
                    arrivalDate: dateObj
                });
                newEntriesCount++;
            } else {
                duplicateCount++;
            }
        }

        console.log(`Mandi Prices sync completed. Added: ${newEntriesCount}, Skipped: ${duplicateCount}`);
    } catch (error) {
        console.error("Error syncing Mandi Prices:", error.message);
    }
};

module.exports = {
    fetchAndSyncMandiPrices
};
