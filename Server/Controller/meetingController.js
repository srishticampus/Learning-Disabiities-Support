const meetingModel = require("../Models/meetingmodel");
const childModel = require("../Models/childModel");

const createMeeting = async (req, res) => {
    try {
        const { meetingTitle, date, startTime, endTime, creatorType, meetLink } = req.body;
        const creatorId = req.params.id;
        const childId = req.params.childId;
        
        const child = await childModel.findById(childId);
        if (!child) {
            return res.status(404).json({ message: "Child not found" });
        }

        const parentId = child.parentId;
        const newMeeting = new meetingModel({
            meetingTitle,
            date,
            startTime,
            endTime,
            creatorId,
            creatorType,
            childId,
            parentId,
            meetLink,
        });
        
        const createdMeeting = await newMeeting.save();
        return res.status(201).json({
            message: "Meeting added successfully",
            createdMeeting
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error creating meeting",
            error: error.message
        });
    }
};

const viewChildsMeeting = async (req, res) => {
    try {
        const creatorId = req.params.id;
        const childId = req.params.childId;
        
        const meetings = await meetingModel.find({
            creatorId,
            childId
        }).sort({ date: 1, startTime: 1 });
        
        if (!meetings || meetings.length === 0) {
            return res.status(404).json({
                message: "No meetings found for this child",
                meetings: []
            });
        }

        return res.json({
            message: "Meetings retrieved successfully",
            meetings
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error fetching meetings",
            error: error.message
        });
    }
};

const viewAllmeetingsOfEducator = async (req, res) => {
    try {
        const educatorId = req.params.id;
        const meetings = await meetingModel.find({
            creatorId: educatorId,
            creatorType: "educator"
        })
        .populate('childId')
        .populate('parentId')
        .sort({ date: 1, startTime: 1 });

        if (!meetings || meetings.length === 0) {
            return res.json({
                message: "No meetings scheduled yet",
                meetings: []
            });
        }

        return res.json({
            message: "Meetings retrieved successfully",
            meetings
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error fetching meetings",
            error: error.message
        });
    }
};
const viewAllmeetingsOfTherapist = async (req, res) => {
    try {
        const therapistId = req.params.id;
        const meetings = await meetingModel.find({
            creatorId: therapistId,
            creatorType: "theraphist"
        })
        .populate('childId')
        .populate('parentId')
        .sort({ date: 1, startTime: 1 });

        if (!meetings || meetings.length === 0) {
            return res.json({
                message: "No meetings scheduled yet",
                meetings: []
            });
        }

        return res.json({
            message: "Meetings retrieved successfully",
            meetings
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error fetching meetings",
            error: error.message
        });
    }
};

const viewAllMeetingsOfParent = async (req, res) => {
    try {
        const parentId = req.params.id;
        const meetings = await meetingModel.find({ parentId })
            .populate('childId')
            .populate('creatorId')
            .sort({ date: 1, startTime: 1 });

        if (!meetings || meetings.length === 0) {
            return res.json({
                message: "No meetings scheduled yet",
                meetings: []
            });
        }

        return res.json({
            message: "Meetings retrieved successfully",
            meetings
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error fetching meetings",
            error: error.message
        });
    }
}

module.exports = { 
    createMeeting, 
    viewChildsMeeting, 
    viewAllmeetingsOfEducator,
    viewAllMeetingsOfParent,
    viewAllmeetingsOfTherapist
};