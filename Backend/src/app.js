const express=require("express");
const cors=require("cors");
const Credentials=require("./models/credentials");
const MandiPrice = require("./models/mandiPrice");
const app=express();

app.use(cors());
app.use(express.json());

app.post("/api/signup",async(req,res)=>{
    try{
        const {farmerName,password}=req.body;
        
        // Check if user already exists
        const existingUser = await Credentials.findOne({ farmerName });
        if (existingUser) {
            return res.status(400).json({ message: "Farmer Name already exists" });
        }

        const credentials=new Credentials({farmerName,password});
        await credentials.save();
        res.status(201).json({message:"User registered successfully"});
    }catch(error){
        console.error("Signup error:", error);
        res.status(500).json({message:"Error registering user"});
    }
})

app.post("/api/login", async (req, res) => {
    try {
        const { farmerName, password } = req.body;
        
        const user = await Credentials.findOne({ farmerName });
        if (!user) {
            return res.status(404).json({ message: "Farmer Name not found" });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid password" });
        }

        res.status(200).json({ message: "Login successful", user: { farmerName: user.farmerName } });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Error during login" });
    }
})

app.get("/api/verify-user", async (req, res) => {
    try {
        const { farmerName } = req.query;
        if (!farmerName) {
            return res.status(400).json({ message: "Farmer Name query parameter is required" });
        }

        const user = await Credentials.findOne({ farmerName });
        if (user) {
            return res.status(200).json({ isAvailable: false, message: "Farmer Name already exists" });
        }

        return res.status(200).json({ isAvailable: true, message: "Farmer Name is available" });
    } catch (error) {
        console.error("Verification error:", error);
        res.status(500).json({ message: "Error verifying user" });
    }
})

app.get("/api/mandi-prices", async (req, res) => {
    try {
        const { state, district, commodity, sortPrice } = req.query;

        // Escape regex special characters to prevent API crashes when searching items like "Paddy(Common)"
        const escapeRegex = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        // Build dynamic query object
        const query = {};
        if (state) query.state = new RegExp(escapeRegex(state), 'i');
        if (district) query.district = new RegExp(escapeRegex(district), 'i');
        if (commodity) query.commodity = new RegExp(escapeRegex(commodity), 'i');

        // Sorting
        let mongooseSort = { arrivalDate: -1 }; // newest by default
        if (sortPrice === 'asc') mongooseSort = { modalPrice: 1 };
        if (sortPrice === 'desc') mongooseSort = { modalPrice: -1 };

        // Fetch prices from DB natively
        const prices = await MandiPrice.find(query)
            .sort(mongooseSort)
            .limit(100); // UI performance limit to 100 rows per load

        res.status(200).json({
            success: true,
            count: prices.length,
            data: prices
        });
    } catch (error) {
        console.error("Mandi Prices endpoint error:", error);
        res.status(500).json({ success: false, message: "Server Error fetching prices" });
    }
});

// Explicit trigger to manual fetch via admin (Optional utility for demo purposes)
app.get("/api/mandi-prices/sync", async (req, res) => {
    const { fetchAndSyncMandiPrices } = require('./services/mandiService');
    // run it async in background to avoid blocking
    fetchAndSyncMandiPrices();
    res.status(200).json({ message: "Background sync triggered successfully." });
});

module.exports=app;