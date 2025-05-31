const learningModel = require("../Models/learningModel");

const addLearningPlan = async (req, res) => {
    try {
        const { goal, planDuration, weeks, educatorId, childId } = req.body;

        // Validate required fields
        if (!goal || !planDuration || !weeks || !Array.isArray(weeks) || weeks.length === 0 || !educatorId || !childId) {
            return res.status(400).json({
                success: false,
                message: "Goal, planDuration, weeks, educatorId, and childId are required."
            });
        }

        // Validate each week has activities
        for (const week of weeks) {
            if (!week.activities || !Array.isArray(week.activities) || week.activities.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "Each week must contain at least one activity."
                });
            }
        }

        // Check for existing educator plan
        const existingPlan = await learningModel.findOne({ childId, educatorId });
        if (existingPlan) {
            return res.status(409).json({
                success: false,
                message: "Educator learning plan already exists for this student."
            });
        }

        // Create new plan
        const newPlan = new learningModel({
            goal,
            planDuration,
            weeks,
            educatorId,
            childId,
            planType: 'educator',
            status: 'pending',
            createdAt: Date.now(),
            updatedAt: Date.now()
        });

        const savedPlan = await newPlan.save();

        return res.status(201).json({
            success: true,
            message: "Educator learning plan created successfully.",
            data: savedPlan
        });

    } catch (error) {
        console.error("Error in addLearningPlan:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
const addLearningPlanTherapist = async (req, res) => {
    try {
        const { goal, planDuration, weeks, therapistId, childId } = req.body;

        // Validate required fields
        if (!goal || !planDuration || !weeks || !Array.isArray(weeks) || weeks.length === 0 || !therapistId || !childId) {
            return res.status(400).json({
                success: false,
                message: "Goal, planDuration, weeks, therapistId, and childId are required."
            });
        }

        // Validate each week has activities
        for (const week of weeks) {
            if (!week.activities || !Array.isArray(week.activities) || week.activities.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "Each week must contain at least one activity."
                });
            }
        }

        // Check for existing therapist plan
        const existingPlan = await learningModel.findOne({ childId, therapistId });
        if (existingPlan) {
            return res.status(409).json({
                success: false,
                message: "Therapist learning plan already exists for this student."
            });
        }

        // Create new plan
        const newPlan = new learningModel({
            goal,
            planDuration,
            weeks,
            therapistId,
            childId,
            planType: 'therapist',
            status: 'pending',
            createdAt: Date.now(),
            updatedAt: Date.now()
        });

        const savedPlan = await newPlan.save();

        return res.status(201).json({
            success: true,
            message: "Therapist learning plan created successfully.",
            data: savedPlan
        });

    } catch (error) {
        console.error("Error in addLearningPlanTherapist:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const getLearningPlanOfSingleStudent = async (req, res) => {
    try {
        const { educatorId, childId } = req.params;

        // Validate parameters
        if (!educatorId || !childId) {
            return res.status(400).json({
                success: false,
                message: "Educator ID and Child ID are required."
            });
        }

        const childPlan = await learningModel.find({ educatorId, childId });

        if (!childPlan || childPlan.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No learning plan found for these IDs"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Learning plan retrieved successfully",
            data: childPlan
        });

    } catch (error) {
        console.error("Error in getLearningPlanOfSingleStudent:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
const getLearningPlanOfSingleTherapist = async (req, res) => {
    try {
        const { therapistId, childId } = req.params;

        // Validate parameters
        if (!therapistId || !childId) {
            return res.status(400).json({
                success: false,
                message: "Therapist ID and Child ID are required."
            });
        }

        const childPlan = await learningModel.find({ therapistId, childId });

        if (!childPlan || childPlan.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No learning plan found for these IDs"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Learning plan retrieved successfully",
            data: childPlan
        });

    } catch (error) {
        console.error("Error in getLearningPlanOfSingleStudent:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const deleteLearningPlanByEducator = async (req, res) => {
    try {
        const planId = req.params.id;

        if (!planId) {
            return res.status(400).json({
                success: false,
                message: "Plan ID is required."
            });
        }

        const deletedPlan = await learningModel.findByIdAndDelete(planId);

        if (!deletedPlan) {
            return res.status(404).json({
                success: false,
                message: "Learning plan not found or already deleted."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Learning plan deleted successfully",
            data: deletedPlan
        });

    } catch (error) {
        console.error("Error in deleteLearningPlanByEducator:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
const deleteLearningTherapist = async (req, res) => {
    try {
        const planId = req.params.id;

        if (!planId) {
            return res.status(400).json({
                success: false,
                message: "Plan ID is required."
            });
        }

        const deletedPlan = await learningModel.findByIdAndDelete(planId);

        if (!deletedPlan) {
            return res.status(404).json({
                success: false,
                message: "Learning plan not found or already deleted."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Learning plan deleted successfully",
            data: deletedPlan
        });

    } catch (error) {
        console.error("Error in deleteLearningPlanByTherapist:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const editLearningPlanByEducator = async (req, res) => {
    try {
        const { educatorId, childId } = req.params;
        const { goal, planDuration, weeks } = req.body;

        // Validate parameters
        if (!educatorId || !childId) {
            return res.status(400).json({
                success: false,
                message: "Educator ID and Child ID are required."
            });
        }

        // Validate request body
        if (!goal || !planDuration || !weeks || !Array.isArray(weeks)) {
            return res.status(400).json({
                success: false,
                message: "Goal, planDuration, and weeks array are required."
            });
        }

        // Find and update the plan
        const updatedPlan = await learningModel.findOneAndUpdate(
            { educatorId, childId },
            {
                goal,
                planDuration,
                weeks,
                updatedAt: Date.now()
            },
            { new: true, runValidators: true }
        );

        if (!updatedPlan) {
            return res.status(404).json({
                success: false,
                message: "Learning plan not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Learning plan updated successfully",
            data: updatedPlan
        });

    } catch (error) {
        console.error("Error in editLearningPlanByEducator:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
const editLearningPlanByTherapist = async (req, res) => {
    try {
        const { therapistId, childId } = req.params;
        const { goal, planDuration, weeks } = req.body;

        // Validate parameters
        if (!therapistId || !childId) {
            return res.status(400).json({
                success: false,
                message: "Therapist ID and Child ID are required."
            });
        }

        // Validate request body
        if (!goal || !planDuration || !weeks || !Array.isArray(weeks)) {
            return res.status(400).json({
                success: false,
                message: "Goal, planDuration, and weeks array are required."
            });
        }

        // Find and update the plan
        const updatedPlan = await learningModel.findOneAndUpdate(
            { therapistId, childId },
            {
                goal,
                planDuration,
                weeks,
                updatedAt: Date.now()
            },
            { new: true, runValidators: true }
        );

        if (!updatedPlan) {
            return res.status(404).json({
                success: false,
                message: "Learning plan not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Learning plan updated successfully",
            data: updatedPlan
        });

    } catch (error) {
        console.error("Error in editLearningPlanByTherapist:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const updateLearningPlanByParent = async (req, res) => {
    try {
        const { childId, educatorId } = req.params;

        // Validate parameters
        if (!childId || !educatorId) {
            return res.status(400).json({
                success: false,
                message: "Child ID and Educator ID are required."
            });
        }

        // Mark as completed
        const updatedPlan = await learningModel.findOneAndUpdate(
            { childId, educatorId },
            { 
                status: 'completed',
                updatedAt: Date.now() 
            },
            { new: true }
        );

        if (!updatedPlan) {
            return res.status(404).json({
                success: false,
                message: "Learning plan not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Learning plan marked as completed.",
            data: updatedPlan
        });

    } catch (error) {
        console.error("Error in updateLearningPlanByParent:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
const updateLearningPlanByParentTherapist = async (req, res) => {
    try {
        const { childId, therapistId } = req.params;

        // Validate parameters
        if (!childId || !therapistId) {
            return res.status(400).json({
                success: false,
                message: "Child ID and Therapist ID are required."
            });
        }

        // Mark as completed
        const updatedPlan = await learningModel.findOneAndUpdate(
            { childId, therapistId },
            { 
                status: 'completed',
                updatedAt: Date.now() 
            },
            { new: true }
        );

        if (!updatedPlan) {
            return res.status(404).json({
                success: false,
                message: "Learning plan not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Learning plan marked as completed.",
            data: updatedPlan
        });

    } catch (error) {
        console.error("Error in updateLearningPlanByParent:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const markActivityCompleted = async (req, res) => {
    try {
        const { childId, weekIndex, activityIndex } = req.params;
        const { userId, role } = req.user; // From authentication middleware

        // Validate parameters
        if (!childId || isNaN(weekIndex) || isNaN(activityIndex)) {
            return res.status(400).json({
                success: false,
                message: "Child ID, week index, and activity index are required."
            });
        }

        const weekIdx = parseInt(weekIndex);
        const activityIdx = parseInt(activityIndex);

        // Find the learning plan
        const learningPlan = await learningModel.findOne({ childId });
        if (!learningPlan) {
            return res.status(404).json({
                success: false,
                message: "Learning plan not found."
            });
        }

        // Validate week and activity indexes
        if (weekIdx < 0 || weekIdx >= learningPlan.weeks.length) {
            return res.status(400).json({
                success: false,
                message: "Invalid week index."
            });
        }

        const week = learningPlan.weeks[weekIdx];
        if (activityIdx < 0 || activityIdx >= week.activities.length) {
            return res.status(400).json({
                success: false,
                message: "Invalid activity index."
            });
        }

        // Get the activity
        const activity = week.activities[activityIdx];

        // Mark activity as completed
        activity.completed = true;
        activity.completedDate = new Date();
        
        // Set completedBy information based on role
        if (role === 'therapist') {
            activity.completedBy = 'Therapist';
        } else if (role === 'educator') {
            activity.completedBy = 'Educator';
        } else if (role === 'parent') {
            activity.completedBy = 'Parent';
        }

        learningPlan.updatedAt = new Date();
        await learningPlan.save();

        return res.status(200).json({
            success: true,
            message: "Activity marked as completed.",
            data: {
                weekIndex: weekIdx,
                activityIndex: activityIdx,
                completed: true,
                completedDate: activity.completedDate,
                completedBy: activity.completedBy
            }
        });

    } catch (error) {
        console.error("Error in markActivityCompleted:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const updateRating = async (req, res) => {
    try {
        const { childId } = req.params;
        const { rating } = req.body;

        // Validate parameters
        if (!childId || rating === undefined) {
            return res.status(400).json({
                success: false,
                message: "Child ID and rating are required."
            });
        }

        // Validate rating value
        if (isNaN(rating) || rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: "Rating must be a number between 1 and 5."
            });
        }

        const updatedPlan = await learningModel.findOneAndUpdate(
            { childId },
            { 
                rating: parseFloat(rating),
                updatedAt: Date.now() 
            },
            { new: true }
        );

        if (!updatedPlan) {
            return res.status(404).json({
                success: false,
                message: "Learning plan not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Rating updated successfully.",
            data: updatedPlan
        });

    } catch (error) {
        console.error("Error in updateRating:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = {
    addLearningPlan,
    getLearningPlanOfSingleStudent,
    deleteLearningPlanByEducator,
    editLearningPlanByEducator,
    updateLearningPlanByParent,
    markActivityCompleted,
    updateRating,
    getLearningPlanOfSingleTherapist,
    addLearningPlanTherapist,
    editLearningPlanByTherapist,
    deleteLearningTherapist,
    updateLearningPlanByParentTherapist
};