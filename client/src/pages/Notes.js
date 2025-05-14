import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/notes');
        setNotes(res.data);
        setFilteredNotes(res.data);
      } catch (err) {
        console.error('Failed to fetch notes', err);
      }
    };
    fetchNotes();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const filtered = notes.filter(note =>
      note.subject.toLowerCase().includes(e.target.value.toLowerCase()) ||
      note.semester.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredNotes(filtered);
  };

  return (
    <div>
      <h2>All Notes</h2>
      <input
        type="text"
        placeholder="Search by Subject or Semester"
        value={search}
        onChange={handleSearch}
      />
      {filteredNotes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        <ul>
          {filteredNotes.map(note => (
            <li key={note._id}>
              <h3>{note.title}</h3>
              <p>{note.subject}</p>
              <p>{note.semester}</p>
              <p>{note.courseCode}</p>
              <a href={`http://localhost:5000/uploads/${note.filename}`} download>
                Download Note
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notes;
