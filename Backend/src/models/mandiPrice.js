const mongoose = require("mongoose");

const mandiPriceSchema = new mongoose.Schema({
    state: { type: String, required: true },
    district: { type: String, required: true },
    market: { type: String, required: true },
    commodity: { type: String, required: true },
    minPrice: { type: Number, required: true },
    maxPrice: { type: Number, required: true },
    modalPrice: { type: Number, required: true },
    arrivalDate: { type: Date, required: true },
    timestamp: { type: Date, default: Date.now }
});

// Create a unique compound index to prevent duplicate entries
mandiPriceSchema.index({ state: 1, district: 1, market: 1, commodity: 1, arrivalDate: 1 }, { unique: true });

const MandiPrice = mongoose.model("MandiPrice", mandiPriceSchema);

module.exports = MandiPrice;
