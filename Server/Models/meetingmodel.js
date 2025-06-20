const mongoose = require("mongoose");
const meetingSchema = mongoose.Schema({
    meetingTitle: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        require: true
    },
    startTime: {
        type: String,
        require: true
    },
    endTime: {
        type: String,
        require: true
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'creatorType'
    },
    creatorType: {
        type: String,
        required: true,
        enum: ['educator', 'theraphist']
    },
    childId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "child"
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "parent"
    },
    meetLink: {
        type: String,
        require: true
    },
});

module.exports = mongoose.model("meeting", meetingSchema);