const mongoose=require("mongoose");
const requestSchema=mongoose.Schema({
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "parent",
        required: true
      },
      recipientId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'recipientRole' 
      },
      recipientRole: {
        type: String,
        enum: ["educator", "theraphist"],
        required: true
      },
      message: {
        type: String,
        required: true
      },
      status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending"
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    });
module.exports=mongoose.model("request",requestSchema);