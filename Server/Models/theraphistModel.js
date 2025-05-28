const mongoose = require("mongoose");
const theraphistSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    confirmpassword: {
        type: String,
        require: true
    },
    dateOfBirth: {
        type: Date,
    },
    phone: {
        type: Number,
        require: true
    },
    profilePic: {
        type: Object,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    agreed: {
        type: Boolean,
        require: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isAdminApproved: {
        type: Boolean,
        default: false
    },
    educationalQualification:{
        type: String,
        require:true
    },
    yearsOfExperience:{
        type: Number,
        require:true
    },
    languages:{
        type: String,
        require:true
    },
    availability:{
        type: String,
        require:true
    },
    certification:{
        type: Object,
        require:true
    },
    specialities:{
        type: String,
        require:true
    }
}, { timeStamps: true }
);
module.exports = mongoose.model("theraphist", theraphistSchema);