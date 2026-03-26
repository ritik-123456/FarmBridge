const mongoose=require("mongoose");

const connectDB=async()=>{
    try{
        await mongoose.connect("mongodb+srv://ritik23bce10979_db_user:m82txc7CfcbN5uCW@fb.l5vc3jk.mongodb.net/farmbridge");
        console.log("MongoDB connected");
    }catch(error){
        console.log(error);
    }
}

module.exports=connectDB;