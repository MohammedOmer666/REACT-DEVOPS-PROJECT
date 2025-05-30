import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


import React, { useEffect } from 'react';

export default function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [editingId, setEditingId] = useState(null);

  // Fetch existing users
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users?_limit=5')
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or update user
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      // Update user
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const updatedUser = await res.json();
      setUsers(users.map(u => (u.id === editingId ? updatedUser : u)));
      setEditingId(null);
    } else {
      // Add user
      const res = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const newUser = await res.json();
      newUser.id = Date.now(); // since JSONPlaceholder doesn’t return unique IDs
      setUsers([...users, newUser]);
    }
    setFormData({ name: '', email: '' });
  };

  // Delete user
  const handleDelete = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: 'DELETE',
    });
    setUsers(users.filter((u) => u.id !== id));
  };

  // Edit user
  const handleEdit = (user) => {
    setFormData({ name: user.name, email: user.email });
    setEditingId(user.id);
  };

  return (
    <div className="container">
      <h1>umer app</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <button type="submit">{editingId ? 'Update' : 'Add'}</button>
      </form>

      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> ({user.email})
            <button onClick={() => handleEdit(user)}>✏️</button>
            <button onClick={() => handleDelete(user.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
