const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30,
    },
    email: {
        type:String,
        required:true,
        trim:true,
        lowercase: true,
        unique: true
    },
    password:
    {
        type:String,
        required:true
    },

    role: {
        type:String,
        enum:["admin", "employee"],
        default:"employee"
    },
    employee:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employee"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
