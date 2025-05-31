const Conversation = require('../models/chatModel');

const ChatController = {
  async createConversation(req, res) {
    const { participants, participantModels, student } = req.body;
    if (participants.length !== 2 || participantModels.length !== 2) {
      throw new console.log('Exactly two participants required');
    }

    const existing = await Conversation.findOne({
      participants: { $all: participants },
      participantModels: { $all: participantModels }
    });

    if (existing) throw new console.log('Conversation already exists');

    if (participantModels.includes('Parent') && !student) {
      // throw new console.log('Student reference required for parent conversations');
      throw new console.log("Student reference required for parent conversations");
      
    }

    const conversation = await Conversation.create({
      participants,
      participantModels,
      student,
      messages: []
    });

    res.status(201).json(conversation);
  },

  async getUserConversations(req, res) {
    const { userId } = req.params;
    const convs = await Conversation.find({ participants: userId })
      .populate('participants')
      .populate('student')
      .sort({ updatedAt: -1 });

    res.json(convs);
  },

  async getConversation(req, res) {
    const { id } = req.params;
    const conv = await Conversation.findById(id)
      .populate('participants')
      .populate('student');

    if (!conv) throw new NotFoundError('Conversation not found');
    res.json(conv);
  },

async  addMessage(req, res, next) {
  try {
    const { id } = req.params;
    const { sender, senderModel, content } = req.body;

    // Validate senderModel against allowed values
    const allowedModels = ['parent', 'educator', 'therapist'];
    const normalizedSenderModel = senderModel.toLowerCase();
    
    if (!allowedModels.includes(normalizedSenderModel)) {
      return res.status(400).json({ 
        message: `Invalid sender model. Allowed values are: ${allowedModels.join(', ')}` 
      });
    }

    const conv = await Conversation.findById(id);
    if (!conv) {
      return res.status(404).json({ message: 'Conversation not found' });
    }

    if (!conv.participants.includes(sender)) {
      return res.status(403).json({ message: 'Sender not part of this conversation' });
    }

    const newMessage = {
      sender,
      senderModel: normalizedSenderModel, // Use normalized lowercase value
      content,
      timestamp: new Date(),
      read: false
    };

    // Add message to conversation and save
    const updatedConv = await conv.addMessage(newMessage);

    res.status(201).json({
      message: 'Message added successfully',
      conversation: updatedConv,
      newMessage
    });

  } catch (error) {
    console.error('Error adding message:', error);
    
    // Handle mongoose validation errors specifically
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    
    res.status(500).json({ message: 'Internal server error' });
  }
},
  async markAsRead(req, res) {
    const { id } = req.params;
    const { userId } = req.body;
    const conv = await Conversation.findById(id);
    if (!conv) throw new NotFoundError('Conversation not found');

    let changed = false;
    conv.messages.forEach(msg => {
      if (!msg.sender.equals(userId) && !msg.read) {
        msg.read = true;
        changed = true;
      }
    });

    if (changed) {
      conv.markModified('messages');
      await conv.save();
    }

    res.json({ message: 'Messages marked as read' });
  }
};

module.exports = ChatController;
