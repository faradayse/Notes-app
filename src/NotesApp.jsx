import React from 'react'
import './index.css';
import { useState, useEffect } from 'react';

function NotesApp() {
    const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(savedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.title.trim() || !newNote.content.trim()) return;
    setNotes([...notes, { id: Date.now(), ...newNote, tags: [] }]);
    setNewNote({ title: '', content: '' });
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const startEditing = (note) => {
    setEditingNote({ ...note });
  };

  const handleSaveEdit = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, ...editingNote } : note
      )
    );
    setEditingNote(null);
  };

  const handleTagAdd = (id, tag) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, tags: [...note.tags, tag] } : note
      )
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Notes App</h1>

      {/* Add Note Form */}
      <form onSubmit={handleAddNote} className="mb-8 bg-white p-4 rounded-lg shadow">
        <input
          type="text"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          placeholder="Note Title"
          className="w-full p-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
          placeholder="Note Content"
          className="w-full p-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Add Note
        </button>
      </form>

      {/* Notes List */}
      <div className="grid gap-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
          >
            {editingNote?.id === note.id ? (
              <>
                <input
                  type="text"
                  value={editingNote.title}
                  onChange={(e) =>
                    setEditingNote({ ...editingNote, title: e.target.value })
                  }
                  className="w-full p-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  value={editingNote.content}
                  onChange={(e) =>
                    setEditingNote({ ...editingNote, content: e.target.value })
                  }
                  className="w-full p-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
                <button
                  onClick={() => handleSaveEdit(note.id)}
                  className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 mr-2"
                >
                 Save
                </button>
                <button
                  onClick={() => setEditingNote(null)}
                  className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-gray-800">{note.title}</h2>
                <p className="text-gray-600 mt-1">{note.content}</p>
                <div className="mt-2">
                  {note.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded mr-1"
                    >
                        {tag}
                    
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => startEditing(note)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                  <input
                    type="text"
                    placeholder="Add tag"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.target.value.trim()) {
                            handleTagAdd(note.id, e.target.value.trim());
                            e.target.value = '';
                          }
                        }}
                        className="p-1 border rounded text-sm"
                      />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }
export default NotesApp
