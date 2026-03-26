const mongoose=require("mongoose");

const credentialsSchema=new mongoose.Schema({
    farmerName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const Credentials=mongoose.model("Credentials",credentialsSchema);

module.exports=Credentials;