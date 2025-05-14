import React, { useState } from 'react';
import axios from 'axios';

const UploadNote = () => {
  const [form, setForm] = useState({
    title: '',
    subject: '',
    semester: '',
    courseCode: '',
    file: null,
  });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = e => {
    setForm({ ...form, file: e.target.files[0] });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('subject', form.subject);
    formData.append('semester', form.semester);
    formData.append('courseCode', form.courseCode);
    formData.append('file', form.file);

    try {
      const res = await axios.post('http://localhost:5000/api/notes/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('Note uploaded successfully!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Upload failed');
    }
  };

  return (
    <div>
      <h2>Upload Note</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Note Title"
          onChange={handleChange}
        />
        <input
          name="subject"
          placeholder="Subject"
          onChange={handleChange}
        />
        <input
          name="semester"
          placeholder="Semester"
          onChange={handleChange}
        />
        <input
          name="courseCode"
          placeholder="Course Code"
          onChange={handleChange}
        />
        <input
          type="file"
          name="file"
          onChange={handleFileChange}
        />
        <button type="submit">Upload</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default UploadNote;
