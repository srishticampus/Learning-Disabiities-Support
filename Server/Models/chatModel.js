const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, required: true, refPath: 'senderModel' },
  senderModel: { type: String, required: true, enum: ['Parent', 'Educator', 'Therapist'] },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  read: { type: Boolean, default: false }
}, { _id: false });

const conversationSchema = new Schema({
  participants: [{ type: Schema.Types.ObjectId, required: true, refPath: 'participantModels' }],
  participantModels: [{ type: String, required: true, enum: ['Parent', 'Educator', 'Therapist'] }],
  messages: [messageSchema],
  lastMessage: messageSchema,
  student: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: function () {
      return this.participantModels.includes('Parent');
    }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

conversationSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

conversationSchema.methods.addMessage = async function (message) {
  this.messages.push(message);
  this.lastMessage = message;
  await this.save();
};

conversationSchema.index({ participants: 1 });
conversationSchema.index({ updatedAt: -1 });

module.exports = mongoose.model('Conversation', conversationSchema);
