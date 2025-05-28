const requestModel=require("../Models/requestModel");

const sendRequest=async(req,res)=>{
   try {
    const { parentId, recipientId, recipientRole, message } = req.body;
    const existingrequest=await requestModel.findOne({
        parentId,
        recipientId,
        recipientRole,
    });
    if(existingrequest){
        return res.json({
            message:"Request already sent"
        })
    }
    const newRequest = new requestModel({
        parentId,
        recipientId,
        recipientRole,
        message
    });
    await newRequest.save();
     return res.json({
        message: "Request sent successfully.",
        request: newRequest
    });

    
   } catch (error) {
    console.log(error.message);
    res.json({
        message:error.message
    })
   }
};
module.exports={sendRequest}