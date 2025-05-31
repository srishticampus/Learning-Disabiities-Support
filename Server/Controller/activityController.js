const Activity = require('../Models/activityModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { act } = require('react');

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error('Only .jpeg, .jpg, .png formats allowed!'), false);
};

const upload = multer({ storage, fileFilter });

const activityController = {
  upload, // Export multer middleware

  // Add a new activity
  async addActivity(req, res) {
    try {
      const { activityName, description, category } = req.body;
      const activityPhoto = req.file ? req.file.filename : null;

      if (!activityName || !description || !category) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const newActivity = new Activity({
        activityName,
        description,
        category,
        activityPhoto, // Image filename
      });

      await newActivity.save();
      res.status(201).json(newActivity);
    } catch (error) {
      console.error('Error in addActivity:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Get all activities
  async getAllActivities(req, res) {
    try {
      const activities = await Activity.find();
            console.log(activities);

      res.status(200).json({ activities });
    } catch (error) {
      console.error('Error fetching activities:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Get activities for a specific parent
  async getActivitiesByParent(req, res) {
    try {
      const { parentId } = req.params;
      const activities = await Activity.find({ parentId });
      
      res.status(200).json({ activities });
    } catch (error) {
      console.error('Error in getActivitiesByParent:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  async getActivityById(req, res) {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id);
    
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.status(200).json({ activity });
  } catch (error) {
    console.error('Error fetching activity by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
},
  // Edit an existing activity
async editActivity(req, res) {
  try {
    const { id } = req.params;
    const { activityName, description, category } = req.body;
    const activityPhoto = req.file ? req.file.filename : null;

    const existingActivity = await Activity.findById(id);
    if (!existingActivity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    // Update fields if present
    if (activityName) existingActivity.activityName = activityName;
    if (description) existingActivity.description = description;
    if (category) existingActivity.category = category;
    if (activityPhoto) existingActivity.activityPhoto = activityPhoto;

    await existingActivity.save();
    res.status(200).json({ message: 'Activity updated successfully', activity: existingActivity });
  } catch (error) {
    console.error('Error updating activity:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
},

  // Mark activity as completed
  async markActivityComplete(req, res) {
    try {
      const { activityId } = req.params;
      const activity = await Activity.findById(activityId);
      if (!activity) {
        return res.status(404).json({ message: 'Activity not found' });
      }
      activity.status = 'completed';
      await activity.save();
      res.status(200).json({ message: 'Marked as completed', activity });
    } catch (error) {
      console.error('Error marking activity complete:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  // Delete an activity
  async deleteActivity(req, res) {
    try {
      const { id } = req.params;
      const activity = await Activity.findById(id);

      if (!activity) {
        return res.status(404).json({ message: 'Activity not found' });
      }

      // Optional: Remove the uploaded image file if exists
      if (activity.activityPhoto) {
        const filePath = path.join('uploads', activity.activityPhoto);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.warn('Image not deleted:', err.message);
          }
        });
      }

      await Activity.findByIdAndDelete(id);
      res.status(200).json({ message: 'Activity deleted successfully' });
    } catch (error) {
      console.error('Error deleting activity:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = activityController;