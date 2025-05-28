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

  async addMessage(req, res) {
    const { id } = req.params;
    const { sender, senderModel, content } = req.body;
    const conv = await Conversation.findById(id);
    if (!conv) throw new NotFoundError('Conversation not found');
    if (!conv.participants.includes(sender)) throw new console.log('Sender not part of this conversation');

    const newMessage = { sender, senderModel, content, timestamp: new Date(), read: false };
    await conv.addMessage(newMessage);
    res.status(201).json(newMessage);
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
