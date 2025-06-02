
# AI Family Backend

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update the `.env` file with your MongoDB connection string and other secrets:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secure random string for JWT tokens
- `OPENAI_API_KEY`: Your OpenAI API key (optional, for enhanced AI responses)

4. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### User Management
- `POST /api/user/setup` - Complete user setup (requires auth)

### Diary
- `GET /api/diary` - Get user's diary entries (requires auth)
- `POST /api/diary` - Create new diary entry (requires auth)

### Chat
- `GET /api/chat/:familyMember` - Get chat history (requires auth)
- `POST /api/chat/:familyMember` - Send message (requires auth)

### Habits
- `GET /api/habits` - Get habit data for date (requires auth)
- `POST /api/habits` - Update habit data (requires auth)

## Database Schema

### User
- name, email, password
- Family member names and preferences
- Setup completion status
- Goals, interests, timezone

### DiaryEntry
- title, content, mood, tags
- Date and user association

### ChatSession
- Family member type
- Message history with timestamps
- User association

### HabitEntry
- Daily tracking: water, meals, exercise, sleep
- Mood and notes
- Date and user association

## Features

- JWT Authentication
- Password hashing with bcrypt
- CORS enabled for frontend integration
- Scheduled daily check-ins with node-cron
- MongoDB integration with Mongoose
- RESTful API design
