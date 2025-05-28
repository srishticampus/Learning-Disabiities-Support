const meetingModel = require("../Models/meetingmodel");

const childModel=require("../Models/childModel")

const createMeeting = async (req, res) => {
    try {
        const { meetingTitle, date, startTime, endTime, creatorType } = req.body;
        const creatorId = req.params.id;
        const childId = req.params.childId;
        const child = await childModel.findById(childId);
        if (!child) {
            return res.status(404).json({ message: "Child not found" });
        }

        const parentId = child.parentId;
        const newMeeting = await new meetingModel({
            meetingTitle,
            date,
            startTime,
            endTime,
            creatorId,
            creatorType,
            childId,
            parentId
        });
        const createdMeeting = await newMeeting.save();

        return res.json({
            message: "meeting added successfully",
            createdMeeting: createdMeeting
        })


    } catch (error) {
        console.log(error.message);
        res.json({
            message: error.message
        })
    }
};
const viewChildsMeeting = async (req, res) => {
    try {
        const creatorId = req.params.id;
        const childId = req.params.childId;
        const meeting = await meetingModel.find({
            creatorId,
            childId
        });
        console.log(meeting);
        if (meeting) {
            return res.json({
                message: "meeting found for the child",
                meeting
            })
        }


    } catch (error) {
        console.log(error.message);
        res.json({
            message: error.message
        })
    }
};

const viewAllmeetingsOfEducator = async (req, res) => {
    try {
        const educatorId = req.params.id;
        const meetings = await meetingModel.find({
            creatorId: educatorId,
            creatorType: "educator"
        }).populate({
            path: 'childId',
            populate: {
                path: 'parentId',
                model: 'parent'
            }
        });
        if (!meetings) {
            return res.json({
                message: "No meetings for educator"
            })
        };
        return res.json({
            message: "meetings fetched for the educator",
            meetings
        })

    } catch (error) {
        console.log(error.message);
        res.json({
            message: error.message
        })
    }
};
const viewAllMeetingsOfParent = async (req, res) => {
    try {
        const parentId=req.params.id;
        const meeting=await meetingModel.find({
            parentId
        }).populate({
            path: 'childId',
            populate: {
                path: 'parentId',
                model: 'parent'
            }
        });;
        if(!meeting){
            res.json({
                message:"no meeting yet"
            })
        };
        return res.json({
            message:"Fetch parents meeting",
            meeting
        })

    } catch (error) {
        console.log(error.message);
        res.json({
            message: error.message
        })
    }
}

module.exports = { createMeeting, viewChildsMeeting, viewAllmeetingsOfEducator,viewAllMeetingsOfParent }