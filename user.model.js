import mongoose from "mongoose";

const schema = new mongoose.Schema({
    username: {
        type: String,
        required:true,
        unique: true
    },
    email: {
        type: String,
        required:true,
        unique:false
    },
    password: {
        type : String,
        required :true,
        unique : false
    }
})
export default mongoose.model.Users || mongoose.model("User",schema)