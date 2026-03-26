require('dotenv').config();
const app = require("./src/app.js");
const connectDB = require("./src/db/db.js");
const initCronJobs = require('./src/cron/mandiCron');

connectDB();
initCronJobs();

app.listen(5000,()=>{
    console.log("server is running on port 5000");
})