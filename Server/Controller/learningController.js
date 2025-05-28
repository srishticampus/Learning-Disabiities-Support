const learningModel = require("../Models/learningModel");

const addLearningPlan = async (req, res) => {
    try {
        const { goal, planDuration, weeks, educatorId, therapistId,childId } = req.body;
        if (!goal || !planDuration || weeks.length === 0 || !Array.isArray(weeks)) {
            return res.json({
                message: "Goal, planDuration, and at least one week with activities are required."
            })
        };

        const existingPlan = await learningModel.findOne({ childId });
        if (existingPlan) {
            return res.json({
                message: "Learning plan already added for this student."
            });
        }
        const newplan = new learningModel({
            goal,
            planDuration,
            weeks,
            educatorId,
            therapistId,
            childId
        });
        
        const savedPlan = await newplan.save();

        return res.status(201).json({
            // success: true,
            message: "Learning plan created successfully.",
            data: savedPlan
        })

    } catch (error) {
        console.log(error.message);
        res.json({
            message: error.message
        })
    }
};

const getLearningPlanOfSingleStudent=async(req,res)=>{
    try {
        const {educatorId,childId}=req.params;
    
        const childPlan=await learningModel.find({
            educatorId:educatorId,
            childId:childId
        }).populate("childId");

        if(!childPlan){
            return res.json({
                message:"no learning plan found for the child"
            })
        };
        return res.json({
            message:"Learning plan displayed",
            childPlan
        })

        
    } catch (error) {
        console.log(error.message);
        res.json({
            message:error.message
        })
    }
};
const deleteLearningPlanByeducator=async(req,res)=>{
    try {
        
        const planId=req.params.id;
        const deletedPlan=await learningModel.findByIdAndDelete(planId);
        if(!deletedPlan){
             return res.json({
                message:"cant able to find plan to delete."
            })
        };
        return res.json({
            message:"Learning plan deleted",
            deletedPlan
        })

        
    } catch (error) {
        console.log(error.message);
        res.json({
            message:error.message
        })
    }
};

const editLearningPlanByEducator = async (req, res) => {
    try {
        const { educatorId, childId } = req.params;
        const { goal, planDuration, weeks } = req.body;

        // Find the existing learning plan
        const existingPlan = await learningModel.findOne({ educatorId, childId });

        if (!existingPlan) {
            return res.status(404).json({ message: "Learning plan not found" });
        }

        // Update the fields
        existingPlan.goal = goal;
        existingPlan.planDuration = planDuration;
        existingPlan.weeks = weeks;

        const updatedPlan = await existingPlan.save();

        res.status(200).json({
            message: "Learning plan updated successfully",
            updatedPlan,
        });
    } catch (error) {
        console.error("Error updating learning plan:", error.message);
        res.status(500).json({ message: error.message });
    }
};
const updateLearningPlanByParent = async (req, res) => {
    try {
        const { childId } = req.params;
        const {educatorId}=req.params;

        // Mark the learning plan as completed
        const updatedPlan = await learningModel.findOneAndUpdate(
            { childId,educatorId },  // find by childId
            { status: 'completed', updatedStatus: Date.now() },
            { new: true } // return updated document
        );

        if (!updatedPlan) {
            return res.status(404).json({ message: "Learning plan not found for the given child." });
        }

        res.status(200).json({
            message: "Learning plan marked as completed.",
            updatedPlan
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message
        });
    }
};
const markActivityCompleted = async (req, res) => {
    try {
      const { childId, weekIndex, activityIndex } = req.params;
  
      const learningPlan = await learningModel.findOne({ childId });
  
      if (!learningPlan) return res.status(404).json({ message: "Learning plan not found" });
  
      learningPlan.weeks[weekIndex].activities[activityIndex].completed = true;
      learningPlan.updatedStatus = Date.now();
  
      await learningPlan.save();
  
      res.status(200).json({ message: "Activity marked as completed", learningPlan });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: error.message });
    }
  };
module.exports = { addLearningPlan ,getLearningPlanOfSingleStudent,deleteLearningPlanByeducator,editLearningPlanByEducator,updateLearningPlanByParent,markActivityCompleted}