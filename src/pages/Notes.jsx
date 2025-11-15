import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Notes = () => {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const { getAuthHeaders } = useAuth();

  // Fetch notes from API
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/notes', {
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        const data = await response.json();
        setNotes(data);
      } else if (response.status === 401) {
        console.error('Unauthorized - please login again');
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!title && !content) return;
    
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ title, content }),
      });
      
      if (response.ok) {
        const newNote = await response.json();
        setNotes([newNote, ...notes]);
        setTitle("");
        setContent("");
      } else if (response.status === 401) {
        console.error('Unauthorized - please login again');
      }
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      const response = await fetch(`/api/notes/${noteId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      
      if (response.ok) {
        setNotes(notes.filter((note) => note._id !== noteId));
      } else if (response.status === 401) {
        console.error('Unauthorized - please login again');
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div className="border space-y-6">
      <h1 className="text-4xl ml-25 font-bold text-gray-800">Notes App</h1>
      <div className="flex items-center justify-between m-4 p-5 rounded-xl card">
      <input
        type="text"
        placeholder="Title"
        name="titleInput"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded-md p-2"
      />
      <textarea 
        placeholder="Write your note here..."
        className="border rounded-md ml-2 p-2 input min-h-[200px]"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      </div>
      <button className="ml-9 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleSubmit}>
        Add Note
      </button>

      {loading && <p className="ml-9">Loading notes...</p>}
      <ol className="p-5">
         {notes.map((note) => (
          <li key={note._id} className="my-2 p-2 border rounded"> 
           <div>
            <h3 className="font-bold">{note.title || 'Untitled'}</h3>
            <p>{note.content}</p>
           </div>
            <button
              className="ml-4 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              onClick={() => deleteNote(note._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ol>
      </div>
  );
};

export default Notes;
