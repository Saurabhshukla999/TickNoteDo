import React, { useState } from "react";

const Notes = () => {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!title && !content) return;
    const newNote = { title, content};
    setNotes([...notes, newNote]);
    setTitle("");
    setContent("");
  };

  const deleteNote = (indexToRemove) => {
    setNotes(notes.filter((_, index) => index !== indexToRemove));
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

      <ol className="p-5">
         {notes.map((note, index) => (
          <li key={index} className="my-2 p-2 border rounded"> 
           <div>
            <h3 className="font-bold">{note.title}</h3>
            <p>{note.content}</p>
           </div>
            <button
              className="ml-4 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              onClick={() => deleteNote(index)}
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
