
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cron = require('node-cron');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://gangalasaidineshreddy:gangalasaidineshreddy@cluster0.q9ohv.mongodb.net/', {
});

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isSetupComplete: { type: Boolean, default: false },
  motherName: String,
  fatherName: String,
  siblingName: String,
  siblingType: { type: String, enum: ['sister', 'brother'], default: 'sister' },
  goals: String,
  interests: String,
  preferredTime: { type: String, enum: ['morning', 'afternoon', 'evening'], default: 'morning' },
  timezone: String,
  lastLogin: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

// Diary Entry Schema
const diarySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: String,
  content: { type: String, required: true },
  mood: { type: String, enum: ['happy', 'sad', 'angry', 'excited', 'anxious', 'peaceful'], required: true },
  date: { type: Date, default: Date.now },
  tags: [String]
});

// Chat Message Schema
const chatSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  familyMember: { type: String, enum: ['mother', 'father', 'sibling'], required: true },
  messages: [{
    sender: { type: String, enum: ['user', 'ai'], required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
  }],
  lastActivity: { type: Date, default: Date.now }
});

// Habit Tracking Schema
const habitSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  water: { type: Number, default: 0 },
  meals: { type: Number, default: 0 },
  exercise: { type: Boolean, default: false },
  sleep: { type: Number, default: 0 },
  mood: { type: String, enum: ['great', 'good', 'okay', 'bad', 'terrible'] },
  notes: String
});

const User = mongoose.model('User', userSchema);
const DiaryEntry = mongoose.model('DiaryEntry', diarySchema);
const ChatSession = mongoose.model('ChatSession', chatSchema);
const HabitEntry = mongoose.model('HabitEntry', habitSchema);

// JWT Secret
const JWT_SECRET = "sai8978564460";

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isSetupComplete: user.isSetupComplete
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    user.lastLogin = new Date();
    await user.save();

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isSetupComplete: user.isSetupComplete,
        motherName: user.motherName,
        fatherName: user.fatherName,
        siblingName: user.siblingName,
        siblingType: user.siblingType
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User Setup Route
app.post('/api/user/setup', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const setupData = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        ...setupData,
        isSetupComplete: true
      },
      { new: true }
    );

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isSetupComplete: user.isSetupComplete,
      motherName: user.motherName,
      fatherName: user.fatherName,
      siblingName: user.siblingName,
      siblingType: user.siblingType
    });
  } catch (error) {
    console.error('Setup error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Diary Routes
app.get('/api/diary', authenticateToken, async (req, res) => {
  try {
    const entries = await DiaryEntry.find({ userId: req.user.userId })
      .sort({ date: -1 })
      .limit(20);
    res.json(entries);
  } catch (error) {
    console.error('Get diary error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/diary', authenticateToken, async (req, res) => {
  try {
    const entry = new DiaryEntry({
      userId: req.user.userId,
      ...req.body
    });
    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    console.error('Create diary error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Chat Routes
app.get('/api/chat/:familyMember', authenticateToken, async (req, res) => {
  try {
    const { familyMember } = req.params;
    const chat = await ChatSession.findOne({
      userId: req.user.userId,
      familyMember
    });
    
    res.json(chat ? chat.messages : []);
  } catch (error) {
    console.error('Get chat error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/chat/:familyMember', authenticateToken, async (req, res) => {
  try {
    const { familyMember } = req.params;
    const { message } = req.body;

    // Get user data for personalized responses
    const user = await User.findById(req.user.userId);
    
    // Find or create chat session
    let chat = await ChatSession.findOne({
      userId: req.user.userId,
      familyMember
    });

    if (!chat) {
      chat = new ChatSession({
        userId: req.user.userId,
        familyMember,
        messages: []
      });
    }

    // Add user message
    chat.messages.push({
      sender: 'user',
      content: message,
      timestamp: new Date()
    });

    // Generate AI response (placeholder - integrate with OpenAI API)
    const aiResponse = generateAIResponse(familyMember, message, user);
    
    chat.messages.push({
      sender: 'ai',
      content: aiResponse,
      timestamp: new Date()
    });

    chat.lastActivity = new Date();
    await chat.save();

    res.json(chat.messages[chat.messages.length - 1]);
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Habits Routes
app.get('/api/habits', authenticateToken, async (req, res) => {
  try {
    const { date } = req.query;
    const targetDate = date ? new Date(date) : new Date();
    
    const habit = await HabitEntry.findOne({
      userId: req.user.userId,
      date: {
        $gte: new Date(targetDate.setHours(0, 0, 0, 0)),
        $lt: new Date(targetDate.setHours(23, 59, 59, 999))
      }
    });

    res.json(habit || {
      water: 0,
      meals: 0,
      exercise: false,
      sleep: 0,
      mood: 'okay'
    });
  } catch (error) {
    console.error('Get habits error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/habits', authenticateToken, async (req, res) => {
  try {
    const { date, ...habitData } = req.body;
    const targetDate = new Date(date || new Date());

    const habit = await HabitEntry.findOneAndUpdate(
      {
        userId: req.user.userId,
        date: {
          $gte: new Date(targetDate.setHours(0, 0, 0, 0)),
          $lt: new Date(targetDate.setHours(23, 59, 59, 999))
        }
      },
      {
        userId: req.user.userId,
        date: targetDate,
        ...habitData
      },
      { upsert: true, new: true }
    );

    res.json(habit);
  } catch (error) {
    console.error('Save habits error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// AI Response Generator (placeholder - replace with OpenAI integration)
function generateAIResponse(familyMember, message, user) {
  const responses = {
    mother: [
      "I love you so much, sweetheart. Remember to take care of yourself today! 💕",
      "You're doing amazing, my dear. I'm so proud of you! 🌟",
      "Have you eaten something healthy today? Don't forget to drink water! 💧",
      "No matter what happens, you're strong and capable. I believe in you! 💪"
    ],
    father: [
      "You've got this, champ! Every challenge is an opportunity to grow stronger. 💪",
      "Success isn't about being perfect, it's about not giving up. Keep pushing forward! 🚀",
      "I'm proud of the person you're becoming. Stay focused on your goals! 🎯",
      "Remember, every expert was once a beginner. Keep learning and growing! 📚"
    ],
    sibling: [
      "Yo! How's life treating you? Got any cool stories to share? 😄",
      "You're awesome, and don't let anyone tell you otherwise! ✨",
      "Let's make today epic! What adventure are we going on? 🎉",
      "Hey, remember when we used to dream big? Let's make those dreams happen! 🌟"
    ]
  };

  const familyResponses = responses[familyMember] || responses.sibling;
  return familyResponses[Math.floor(Math.random() * familyResponses.length)];
}

// Daily check-in scheduler
cron.schedule('0 9 * * *', async () => {
  console.log('Running morning check-ins...');
  // Implementation for sending daily notifications
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
