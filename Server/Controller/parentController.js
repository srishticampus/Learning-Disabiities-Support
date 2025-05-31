const parentModel=require("../Models/parentModel");
const requestModel=require("../Models/requestModel")
const bcrypt=require("bcryptjs");
const multer=require("multer");
const jwt = require("jsonwebtoken");

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploads")
    },
    filename:(req,file,cb)=>{
        const prefix="profile-";
        const fullName=file.originalname;
        const extension=file.originalname.split(".").pop();
        const fileName=prefix + fullName.substring(0,fullName.lastIndexOf("."))+Date.now()+ "."+extension;
        cb(null,fileName);
    } 
})
const uploadProfilePic=multer(
    {storage:storage}
    ).single("profilePic")

const parentRegister= async (req,res)=>{
    try {
        const { name, email, password,confirmpassword, address, phone ,agreed} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const profilePic=req.file;
        const newParent= await new parentModel({
            name,
            email,
            password:hashedPassword,
            confirmpassword:hashedPassword,
            address,
            phone,
            agreed,
            profilePic
        });
        
        let existingParent=await parentModel.findOne({email});
        if(existingParent){
             return res.json({
                message:"Parent already registered with this email"
            })
        };
        existingParent=await parentModel.findOne({phone});
        if(existingParent){
             return res.json({
                message:"Parent already registered with this phone number"
            })
        }
        if(password!==confirmpassword){
            return res.json({message:"Password and Confirm Password should be same."})
        }
       
       await newParent.save()  ;
       res.status(201).json({
        message:"Parent created successfully",
        data:newParent
       })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
};

const parentLogin=async (req,res)=>{
    try {
        const {email,password}=req.body;
        const parent=await parentModel.findOne({email});
        if(!parent){
            return res.json({message:"Parent not found with this email."})
        }
        const isMatch=await bcrypt.compare(password,parent.password);
        if(!isMatch){
            return res.json({message:"Invalid Password."})
        }
        const token=await jwt.sign({id:parent._id},process.env.SECRET_KEY,{expiresIn:"4hr"});
        res.status(200).json({message:"Parent logged in successfully",token:token});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
}

const parentForgotPassword= async(req,res)=>{
    try {
        const {email}=req.body;
        const parent= await parentModel.findOne({email});
        if(!parent){
            return res.json({message:" No Parent found with this email."})
        }
        res.json({
            message:"navigate to password reset page",
        })

        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
};
const parentResetPassword= async(req,res)=>{
    try {
        const {password,confirmpassword}=req.body;
        // const {email}=req.params;
        const parent= await parentModel.findOne({email:req.params.email});
        if(!parent){
            return res.json({message:"No Parent found with this email."})
        };
        if(password!==confirmpassword){
            return res.json({message:"Passwords do not match."})
        }
        const hashedPassword=await bcrypt.hash(password,10);
        parent.password=hashedPassword;
        parent.confirmpassword=hashedPassword;
        await parent.save(); 
        res.json({message:"Password reset successfully."});

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
}
const getParentById=async(req,res)=>{
    try {
        const parentId=req.params.id;
        const parent=await parentModel.findById(parentId);
        if(!parent){
            return res.json({message:"No Parent found with this id."})
        }
        return res.json({
            message:"parent found with the provided id",
            parent:parent
        })
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
};
const getAllParents=async(req,res)=>{
    try {
        const allparents=await parentModel.find();
        if(!allparents){
             return res.json({
                message:'no parents where found'
            })
        };
        return res.json({
            message:"all parents found",
            allparents
        })
        
    } catch (error) {
        console.log(error.message);
        res.json({
            message:error.message
        })
    }
}
const editParentById = async (req, res) => {
    try {
        const parentId = req.params.id;
        const profilePic=req.file;
        const { name, email, phone, address } = req.body;

        const updatedParent = await parentModel.findByIdAndUpdate(
            parentId,
            { name, email, phone, address,profilePic },
            { new: true }
        );

        if (!updatedParent) {
            return res.status(404).json({ message: "Parent not found." });
        }

        res.json({ message: "Parent updated successfully.", parent: updatedParent });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

const getAcceptedEducator=async(req,res)=>{
    try {
        const parentId=req.params.id;
        const acceptedEducators= await requestModel.find({
            parentId:parentId,
            recipientRole:"educator",
            status:"accepted"
        }).populate("recipientId");
        if(acceptedEducators.length===0){
            return res.json({
                message:'Educator not accpted you'
            })
        };
        return res.json({
            message:"Accepted educators fetched",
            acceptedEducators
        });
        
    } catch (error) {
        console.log(error.message);
        res.json({
            message:error.message
        })
    }
}

const getAcceptedTherapists = async (req, res) => {
  try {
    const parentId = req.params.id;
    const acceptedTherapists = await requestModel.find({
      parentId: parentId,
      recipientRole: "theraphist",
      status: "accepted",
    }).populate("recipientId");

    if (acceptedTherapists.length === 0) {
      return res.json({ message: "Therapist not accepted you" });
    }

    return res.json({
      message: "Accepted therapists fetched",
      acceptedTherapists,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ message: error.message });
  }
};

module.exports={getAcceptedTherapists,parentRegister,uploadProfilePic,parentLogin,parentForgotPassword,parentResetPassword,getParentById,getAllParents,editParentById,getAcceptedEducator};