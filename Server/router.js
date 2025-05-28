const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');


// Middleware
const protectedRoute = require("./Middleware/protectedRoute");

// Controllers
const parentController = require("./Controller/parentController");
const educatorController = require("./Controller/educatorController");
const theraphistController = require("./Controller/theraphistController");
const adminController = require("./Controller/adminController");
const childController = require("./Controller/childController");
const requestController = require("./Controller/requestController");
const learningPlanController = require("./Controller/learningController");
const meetingController = require("./Controller/meetingController");
const chatController = require("./Controller/chatController");
const activityController = require('./Controller/activityController');

// File Upload Config
const upload = multer({ dest: "uploads/" });

/* ===================== ADMIN ===================== */
router.post("/admin/login", adminController.adminLogin);
router.post("/admin/educator/accept/:id", protectedRoute.protectedRoute, educatorController.educatorRequestAccept);
router.delete("/admin/educator/reject/:id", protectedRoute.protectedRoute, educatorController.adminDeleteEducator);
router.post("/admin/theraphist/accept/:id", protectedRoute.protectedRoute, theraphistController.theraphistRequestAccept);
router.delete("/admin/theraphist/reject/:id", protectedRoute.protectedRoute, theraphistController.adminDeleteTheraphist);
router.put(
  '/admin/activities/:id',
  activityController.upload.single('activityPhoto'),
  activityController.editActivity
);
router.get('/admin/activity/:id',  activityController.getActivityById);

const parentController = require("./Controller/parentController");

const protectedRoute = require("./Middleware/protectedRoute");

const educatorController = require("./Controller/educatorController");

const theraphistController = require("./Controller/theraphistController");

const adminController = require("./Controller/adminController");

const childController = require("./Controller/childController");

//Default route
router.get("/", (req, res) => {
  res.send("Welcome to the Disability Support System API");
});

/* ===================== PARENT ===================== */
router.post("/parent/registration", parentController.uploadProfilePic, parentController.parentRegister);
router.post("/parent/login", parentController.parentLogin);
router.post("/parent/forgotpassword", parentController.parentForgotPassword);
router.post("/parent/resetpassword/:email", parentController.parentResetPassword);
router.get("/parent/getparent/:id", protectedRoute.protectedRoute, parentController.getParentById);
router.get("/parent/getallparents", protectedRoute.protectedRoute, parentController.getAllParents);
router.post("/parent/updateparent/:id", protectedRoute.protectedRoute, parentController.uploadProfilePic, parentController.editParentById);
router.post("/parent/addchild/:id", protectedRoute.protectedRoute, childController.addChildByParent);
router.post("/parent/updatechild/:id/:childId", protectedRoute.protectedRoute, childController.editChildByParent);
router.get("/parent/getchild/:id/:childId", protectedRoute.protectedRoute, childController.getOneChildDetail);
router.get("/parent/getallchild", protectedRoute.protectedRoute, childController.getallChildDetails);
router.get("/parent/getallchildofparent/:id", protectedRoute.protectedRoute, childController.getAllChildOfParent);
router.delete("/parent/deletechild/:id/:childId", protectedRoute.protectedRoute, childController.deleteChildByParent);
router.get("/parent/getacceptededucator/:id", protectedRoute.protectedRoute, parentController.getAcceptedEducator);
router.put("/parent/updatelearningplan/:childId/:educatorId", protectedRoute.protectedRoute, learningPlanController.updateLearningPlanByParent);
router.put("/parent/complete-activity/:childId/:weekIndex/:activityIndex", protectedRoute.protectedRoute, learningPlanController.markActivityCompleted);
router.get("/parent/getallmeeting/:id", protectedRoute.protectedRoute, meetingController.viewAllMeetingsOfParent);

/* ===================== EDUCATOR ===================== */
router.post("/educator/registration", educatorController.uploadProfilePic, educatorController.educatorRegister);
router.post("/educator/login", educatorController.educatorLogin);
router.post("/educator/forgotpassword", educatorController.educatorForgotPassword);
router.post("/educator/resetpassword/:email", educatorController.educatorResetPassword);
router.get("/educator/geteducator/:id", protectedRoute.protectedRoute, educatorController.getEducatorById);
router.post("/educator/updateeducator/:id", protectedRoute.protectedRoute, educatorController.uploadProfilePic, educatorController.editEducatorById);
router.post("/educator/addpersonal/:id", protectedRoute.protectedRoute, educatorController.uploadCertification, educatorController.addEducatorPersonal);
router.get("/educator/getalleducators", protectedRoute.protectedRoute, educatorController.getAllEducators);
router.get("/educator/parentsrequest/:id", protectedRoute.protectedRoute, educatorController.getEducatorRequest);
router.put("/educator/acceptsrequest/:id", protectedRoute.protectedRoute, educatorController.educatorAcceptsParentRequest);
router.delete("/educator/rejectparent/:id", protectedRoute.protectedRoute, educatorController.educatorRejectParentRequest);
router.get("/educator/viewrequestedparent/:id", protectedRoute.protectedRoute, educatorController.educatorViewRequestById);
router.get("/educator/getapprovedparents/:id", protectedRoute.protectedRoute, educatorController.viewAllApprovedParentsByEducator);
router.get("/educator/getchildrenofallapprovedparents/:id", protectedRoute.protectedRoute, educatorController.viewAllChildsOfAllApprovedParents);
router.post("/educator/addlearning", protectedRoute.protectedRoute, learningPlanController.addLearningPlan);
router.get("/educator/getstudentplan/:educatorId/:childId", protectedRoute.protectedRoute, learningPlanController.getLearningPlanOfSingleStudent);
router.delete("/educator/deleteplan/:id", protectedRoute.protectedRoute, learningPlanController.deleteLearningPlanByeducator);
router.put("/educator/updateplan/:educatorId/:childId", protectedRoute.protectedRoute, learningPlanController.editLearningPlanByEducator);
router.post("/educator/addmeeting/:id/:childId", protectedRoute.protectedRoute, meetingController.createMeeting);
router.get("/educator/viewmeeting/:id/:childId", protectedRoute.protectedRoute, meetingController.viewChildsMeeting);
router.get("/educator/viewmeeting/:id", protectedRoute.protectedRoute, meetingController.viewAllmeetingsOfEducator);

router.post("/admin/login", adminController.adminLogin);

/* ===================== THERAPHIST ===================== */
router.post("/theraphist/registration", theraphistController.uploadProfilePic, theraphistController.theraphistRegister);
router.post("/theraphist/login", theraphistController.theraphistLogin);
router.post("/theraphist/forgotpassword", theraphistController.theraphistForgotPassword);
router.post("/theraphist/resetpassword/:email", theraphistController.theraphistResetPassword);
router.get("/theraphist/gettheraphist/:id", protectedRoute.protectedRoute, theraphistController.getTheraphistById);
router.post("/theraphist/updatetheraphist/:id", protectedRoute.protectedRoute, theraphistController.uploadProfilePic, theraphistController.editTheraphistById);
router.get("/theraphist/getalltheraphist", protectedRoute.protectedRoute, theraphistController.getAllTheraphists);
router.post("/theraphist/addpersonal/:id", protectedRoute.protectedRoute, theraphistController.uploadCertification, theraphistController.addTheraphistPersonal);


/* ===================== REQUEST ===================== */
router.post("/request/sendrequest", protectedRoute.protectedRoute, requestController.sendRequest);

router.post(
  "/parent/registration",
  parentController.uploadProfilePic,
  parentController.parentRegister
);
router.post("/parent/login", parentController.parentLogin);
router.post("/parent/forgotpassword", parentController.parentForgotPassword);
router.post(
  "/parent/resetpassword/:email",
  parentController.parentResetPassword
);
router.get(
  "/parent/getparent/:id",
  protectedRoute.protectedRoute,
  parentController.getParentById
);
router.post(
  "/parent/updateparent/:id",
  protectedRoute.protectedRoute,
  parentController.uploadProfilePic,
  parentController.editParentById
);
router.post(
  "/parent/addchild/:id",
  protectedRoute.protectedRoute,
  childController.addChildByParent
);
router.post(
  "/parent/updatechild/:id/:childId",
  protectedRoute.protectedRoute,
  childController.editChildByParent
);
router.get(
  "/parent/getchild/:id/:childId",
  protectedRoute.protectedRoute,
  childController.getOneChildDetail
);
router.get(
  "/parent/getallchild",
  protectedRoute.protectedRoute,
  childController.getallChildDetails
);
router.get(
  "/parent/getallchildofparent/:id",
  protectedRoute.protectedRoute,
  childController.getAllChildOfParent
);
router.delete(
  "/parent/deletechild/:id/:childId",
  protectedRoute.protectedRoute,
  childController.deleteChildByParent
);

/* ===================== CHAT ===================== */
router.post("/conversations", protectedRoute.protectedRoute, chatController.createConversation);
router.get("/conversations/user/:userId", protectedRoute.protectedRoute, chatController.getUserConversations);
router.get("/conversations/:id", protectedRoute.protectedRoute, chatController.getConversation);
router.post("/conversations/:id/messages", protectedRoute.protectedRoute, chatController.addMessage);
router.patch("/conversations/:id/read", protectedRoute.protectedRoute, chatController.markAsRead);
router.get("/parent/conversations/:parentId", protectedRoute.protectedRoute, chatController.getUserConversations);


/* ===================== ACTIVITY ===================== */
router.post(
  '/addactivity',
  protectedRoute.protectedRoute,
  activityController.upload.single('activityPhoto'), 
  activityController.addActivity
);
router.get('/activity/getallactivities', protectedRoute.protectedRoute, activityController.getAllActivities);
router.get('/activity/parent/:parentId', protectedRoute.protectedRoute, activityController.getActivitiesByParent);
router.patch('/activity/complete/:activityId', protectedRoute.protectedRoute, activityController.markActivityComplete);

router.post(
  "/educator/registration",
  educatorController.uploadProfilePic,
  educatorController.educatorRegister
);
router.post("/educator/login", educatorController.educatorLogin);
router.post(
  "/educator/forgotpassword",
  educatorController.educatorForgotPassword
);
router.post(
  "/educator/resetpassword/:email",
  educatorController.educatorResetPassword
);
router.get(
  "/educator/geteducator/:id",
  protectedRoute.protectedRoute,
  educatorController.getEducatorById
);
router.post(
  "/educator/updateeducator/:id",
  protectedRoute.protectedRoute,
  educatorController.uploadProfilePic,
  educatorController.editEducatorById
);
router.post(
  "/educator/addpersonal/:id",
  protectedRoute.protectedRoute,
  educatorController.uploadCertification,
  educatorController.addEducatorPersonal
);
router.get(
  "/educator/getalleducators",
  protectedRoute.protectedRoute,
  educatorController.getAllEducators
);



router.post(
  "/theraphist/registration",
  theraphistController.uploadProfilePic,
  theraphistController.theraphistRegister
);
router.post("/theraphist/login", theraphistController.theraphistLogin);
router.post(
  "/theraphist/forgotpassword",
  theraphistController.theraphistForgotPassword
);
router.post(
  "/theraphist/resetpassword/:email",
  theraphistController.theraphistResetPassword
);
router.get(
  "/theraphist/gettheraphist/:id",
  protectedRoute.protectedRoute,
  theraphistController.getTheraphistById
);
router.post(
  "/theraphist/updatetheraphist/:id",
  protectedRoute.protectedRoute,
  theraphistController.uploadProfilePic,
  theraphistController.editTheraphistById
);

module.exports = router;
