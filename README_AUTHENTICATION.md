# Authentication Setup Guide

Your application now has full user authentication! Users can register, login, and their notes/tasks are stored separately in MongoDB.

## Features

✅ User Registration & Login  
✅ JWT-based Authentication  
✅ Protected Routes  
✅ User-specific Data (Notes & Tasks)  
✅ Secure Password Hashing (bcrypt)  
✅ Persistent Sessions (Token stored in localStorage)

## Environment Variables

Update your `.env` file to include:

```env
MONGODB_URI=mongodb://localhost:27017/productivity-app
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

**Important**: Change `JWT_SECRET` to a strong random string in production!

## How It Works

### Backend

1. **User Model** (`models/User.js`)
   - Stores username, email, and hashed password
   - Automatically hashes passwords before saving

2. **Authentication Routes** (`routes/auth.js`)
   - `POST /api/auth/register` - Create new user account
   - `POST /api/auth/login` - Login and get JWT token
   - `GET /api/auth/me` - Get current user info

3. **Protected Routes**
   - All `/api/notes` and `/api/tasks` routes require authentication
   - Users can only access their own notes and tasks

### Frontend

1. **AuthContext** (`src/context/AuthContext.jsx`)
   - Manages authentication state
   - Provides login, register, logout functions
   - Stores JWT token in localStorage

2. **Protected Routes**
   - `/notes`, `/tasks`, `/timer` require authentication
   - Unauthenticated users are redirected to login

3. **Login/Register Pages**
   - Beautiful, responsive forms
   - Error handling and validation

## API Endpoints

### Authentication

- `POST /api/auth/register`
  ```json
  {
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- `POST /api/auth/login`
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- `GET /api/auth/me` (requires Authorization header)
  ```
  Authorization: Bearer <token>
  ```

### Protected Endpoints (require authentication)

All notes and tasks endpoints now require the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## User Flow

1. **New User**:
   - Visit app → See welcome page
   - Click "Register" → Create account
   - Automatically logged in → Access all features

2. **Existing User**:
   - Visit app → See welcome page
   - Click "Login" → Enter credentials
   - Access personal notes and tasks

3. **Authenticated User**:
   - See welcome message with username
   - Access Notes, Tasks, Timer
   - All data is user-specific
   - Click "Logout" to sign out

## Data Isolation

- Each user's notes and tasks are stored separately
- Users can only see and modify their own data
- Data is linked to user via MongoDB ObjectId reference

## Security Features

- ✅ Passwords are hashed using bcrypt (salt rounds: 10)
- ✅ JWT tokens expire after 7 days (configurable)
- ✅ Protected routes verify token on every request
- ✅ User data is isolated per account

## Testing

1. **Register a new user**:
   ```bash
   curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"username":"testuser","email":"test@example.com","password":"test123"}'
   ```

2. **Login**:
   ```bash
   curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"test123"}'
   ```

3. **Access protected route** (use token from login):
   ```bash
   curl http://localhost:5000/api/notes \
     -H "Authorization: Bearer <your-token>"
   ```

## Project Structure

```
project NoteTOTimer/
├── server.js              # Express server with auth routes
├── models/
│   ├── User.js           # User model with password hashing
│   ├── Note.js           # Note model (linked to User)
│   └── Task.js           # Task model (linked to User)
├── routes/
│   ├── auth.js           # Authentication routes
│   ├── notes.js          # Protected note routes
│   └── tasks.js          # Protected task routes
├── middleware/
│   └── auth.js           # JWT authentication middleware
├── utils/
│   └── jwt.js            # JWT token utilities
└── src/
    ├── context/
    │   └── AuthContext.jsx    # Auth state management
    ├── components/
    │   └── ProtectedRoute.jsx # Route protection component
    ├── pages/
    │   ├── Login.jsx          # Login page
    │   ├── Register.jsx       # Registration page
    │   ├── Notes.jsx          # Notes (requires auth)
    │   └── Tasks.jsx          # Tasks (requires auth)
    └── App.jsx            # Main app with routing
```

## Next Steps

- Add email verification
- Add password reset functionality
- Add user profile page
- Add social login (Google, GitHub, etc.)
- Add role-based access control

