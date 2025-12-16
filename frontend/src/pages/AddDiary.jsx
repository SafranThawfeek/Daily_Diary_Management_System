import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function AddDiary() {
  const nav = useNavigate();
  const [form, setForm] = useState({ date: '', title: '', description: '', mood: '' });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      alert('Please enter a title');
      return;
    }
    try {
      setLoading(true);
      await api.post('/diary', {
        ...form,
        date: form.date || new Date()
      });
      nav('/dashboard');
    } catch (err) {
      console.error('Save failed:', err);
      alert('Save failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <nav className="text-sm text-gray-600">
            <span 
              onClick={() => nav('/dashboard')} 
              className="cursor-pointer hover:text-blue-600 transition"
            >
              Dashboard
            </span>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Add Diary Entry</span>
          </nav>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add Diary</h1>
            <p className="text-gray-600 mt-1">Create a new diary entry to capture your thoughts</p>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={submit} className="space-y-6">
            {/* Date Field */}
            <div>
              <label htmlFor="date" className="block text-gray-700 font-semibold mb-2">
                Date
              </label>
              <input 
                id="date"
                type="date" 
                value={form.date}
                onChange={e => setForm({...form, date: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Title Field */}
            <div>
              <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
                Title
              </label>
              <input 
                id="title"
                type="text"
                placeholder="Enter diary title"
                value={form.title}
                onChange={e => setForm({...form, title: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Mood Field */}
            <div>
              <label htmlFor="mood" className="block text-gray-700 font-semibold mb-2">
                Mood
              </label>
              <select 
                id="mood"
                value={form.mood}
                onChange={e => setForm({...form, mood: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select your mood</option>
                <option value="Happy">Happy</option>
                <option value="Sad">Sad</option>
                <option value="Neutral">Neutral</option>
                <option value="Excited">Excited</option>
              </select>
            </div>

            {/* Description Field */}
            <div>
              <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
                Description
              </label>
              <textarea 
                id="description"
                placeholder="Write your diary entry here..."
                rows="6"
                value={form.description}
                onChange={e => setForm({...form, description: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button 
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : 'Save Diary Entry'}
              </button>
              <button 
                type="button"
                onClick={() => nav('/dashboard')}
                className="flex-1 border border-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
