
const bcrypt=require("bcryptjs");
const multer=require("multer");
const jwt = require("jsonwebtoken");
const educatorModel = require("../Models/educatorModel");

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
    ).single("profilePic");

    const uploadCertification=multer(
        {storage:storage}
    ).single("certification")

const educatorRegister= async (req,res)=>{
    try {
        const { name, email, password,confirmpassword, address, phone ,agreed} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const profilePic=req.file;
        const newEducator= await new educatorModel({
            name,
            email,
            password:hashedPassword,
            confirmpassword:hashedPassword,
            address,
            phone,
            agreed,
            profilePic,
            
        });
        
        let existingEducator=await educatorModel.findOne({email});
        if(existingEducator){
             return res.json({
                message:"educator already registered with this email"
            })
        };
        existingEducator=await educatorModel.findOne({phone});
        if(existingEducator){
             return res.json({
                message:"educator already registered with this phone number"
            })
        }
        if(password!==confirmpassword){
            return res.json({message:"Password and Confirm Password should be same."})
        }
       
       await newEducator.save()  ;
       res.status(201).json({
        message:"educator created successfully",
        data:newEducator
       })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
};

const educatorLogin=async (req,res)=>{
    try {
        const {email,password}=req.body;
        const educator=await educatorModel.findOne({email});
        if(!educator){
            return res.json({message:"educator not found with this email."})
        }
        const isMatch=await bcrypt.compare(password,educator.password);
        if(!isMatch){
            return res.json({message:"Invalid Password."})
        }
        const token=await jwt.sign({id:educator._id},process.env.SECRET_KEY,{expiresIn:"1hr"});
        res.status(200).json({message:"educator logged in successfully",token:token});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
}

const educatorForgotPassword= async(req,res)=>{
    try {
        const {email}=req.body;
        const educator= await educatorModel.findOne({email});
        if(!educator){
            return res.json({message:" No educator found with this email."})
        }
        res.json({
            message:"navigate to password reset page",
        })

        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
};
const educatorResetPassword= async(req,res)=>{
    try {
        const {password,confirmpassword}=req.body;
        // const {email}=req.params;
        const educator= await educatorModel.findOne({email:req.params.email});
        if(!educator){
            return res.json({message:"No educator found with this email."})
        };
        if(password!==confirmpassword){
            return res.json({message:"Passwords do not match."})
        }
        const hashedPassword=await bcrypt.hash(password,10);
        educator.password=hashedPassword;
        educator.confirmpassword=hashedPassword;
        await educator.save(); 
        res.json({message:"Password reset successfully."});

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
}
const getEducatorById=async(req,res)=>{
    try {
        const educatorId=req.params.id;
        const educator=await educatorModel.findById(educatorId);
        if(!educator){
            return res.json({message:"No educator found with this id."})
        }
        return res.json({
            message:"educator found with the provided id",
            educator:educator
        })
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
}
const editEducatorById = async (req, res) => {
    try {
        const educatorId = req.params.id;
        const profilePic=req.file;
        const { name, email, phone, address } = req.body;

        const updatedEducator = await educatorModel.findByIdAndUpdate(
            educatorId,
            { name, email, phone, address,profilePic },
            { new: true }
        );

        if (!updatedEducator) {
            return res.status(404).json({ message: "educator not found." });
        }

        res.json({ message: "educator updated successfully.", educator: updatedEducator });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

        
 const addEducatorPersonal=async(req,res)=>{
    try {
        const{educationalQualification,yearsOfExperience,languages,availability}=req.body;
        const certification=req.file;
        const educatorId=req.params.id;
        const educator=await educatorModel.findById(educatorId);
        if(!educator){
            return res.json({message:"No educator found with this id."})
        };
        educator.educationalQualification=educationalQualification;
        educator.yearsOfExperience=yearsOfExperience;
        educator.languages=languages;
        educator.availability=availability;
        educator.certification=certification;
        await educator.save();
        res.json({
            message:"educator personal details added successfully.",
            educator:educator
        })
        
    } catch (error) {
        console.log(error.message);
        res.json({
            message:error.message
        })
    }
 }
 const getAllEducators=async(req,res)=>{
    try {

        const educators=await educatorModel.find();
        if(!educators){
            return res.json({message:"No educators found."})
        }
        res.json({
            message:"educators found successfully.",
            educators:educators
        })

    } catch (error) {
        console.log(error.message);
        res.json({
            message:error.message
        })
    }

 }

module.exports={uploadProfilePic,uploadCertification, educatorRegister,educatorLogin,educatorForgotPassword,educatorResetPassword,getEducatorById,editEducatorById,addEducatorPersonal,getAllEducators};

