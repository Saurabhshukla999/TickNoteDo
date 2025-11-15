# MongoDB Setup Guide

This project is now connected to MongoDB! Follow these steps to get started:

## Prerequisites

1. **Install MongoDB** (if using local MongoDB):
   - Download from [MongoDB Community Server](https://www.mongodb.com/try/download/community)
   - Or use MongoDB Atlas (cloud) - recommended for easier setup

2. **MongoDB Atlas Setup** (Recommended):
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free account
   - Create a new cluster
   - Create a database user
   - Get your connection string

## Configuration

1. **Create a `.env` file** in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/productivity-app
   PORT=5000
   ```

   For MongoDB Atlas, use:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/productivity-app
   PORT=5000
   ```

2. **Make sure `.env` is in `.gitignore`** (already configured)

## Running the Application

### Option 1: Run Both Server and Frontend Separately

1. **Start the backend server** (in one terminal):
   ```bash
   npm run server
   ```

2. **Start the frontend** (in another terminal):
   ```bash
   npm run dev
   ```

### Option 2: Run Both Together (requires concurrently)

Install concurrently first:
```bash
npm install --save-dev concurrently
```

Then run:
```bash
npm run dev:all
```

## API Endpoints

### Notes
- `GET /api/notes` - Get all notes
- `POST /api/notes` - Create a new note
- `GET /api/notes/:id` - Get a single note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get a single task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Project Structure

```
project NoteTOTimer/
├── server.js          # Express server
├── models/            # MongoDB models
│   ├── Note.js
│   └── Task.js
├── routes/            # API routes
│   ├── notes.js
│   └── tasks.js
├── src/               # React frontend
│   ├── pages/
│   │   ├── Notes.jsx
│   │   └── Tasks.jsx
│   └── App.jsx
└── .env               # Environment variables (create this)
```

## Troubleshooting

1. **Connection Error**: Make sure MongoDB is running (if using local) or your Atlas connection string is correct
2. **Port Already in Use**: Change the PORT in `.env` file
3. **CORS Errors**: The server is configured with CORS, but make sure the frontend is running on the correct port

## Next Steps

- Your Notes and Tasks are now persisted in MongoDB!
- Data will persist across browser refreshes
- You can add more features like user authentication, timestamps, etc.

