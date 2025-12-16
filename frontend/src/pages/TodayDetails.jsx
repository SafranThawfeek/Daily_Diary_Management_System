import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

export default function TodayDetails() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadToday = async () => {
    try {
      setLoading(true);
      const res = await api.get('/diary/today');
      setEntries(res.data);
    } catch (err) {
      console.error('Error loading today entries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadToday();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this entry?')) return;
    try {
      await api.delete(`/diary/${id}`);
      loadToday();
    } catch (err) {
      alert('Delete failed');
    }
  };

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Today's Details</h1>
            <p className="text-gray-600 mt-1">{today}</p>
          </div>
        </div>

        {/* Action Button */}
        <div className="mb-6">
          <Link
            to="/add-note"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            + Add Entry
          </Link>
        </div>

        {/* Entries Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <p className="text-gray-500">Loading today's entries...</p>
            </div>
          ) : entries.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-600 text-lg mb-4">No entries for today yet</p>
              <Link
                to="/add-note"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Create Your First Entry
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">#</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Title</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Description</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Mood</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Time</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry, index) => (
                    <tr key={entry._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                      <td className="py-3 px-4 text-gray-600">{index + 1}</td>
                      <td className="py-3 px-4 text-gray-800 font-medium max-w-xs">{entry.title}</td>
                      <td className="py-3 px-4 text-gray-600 max-w-md line-clamp-2">{entry.description || '-'}</td>
                      <td className="py-3 px-4">
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                          {entry.mood || '-'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {new Date(entry.date).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="py-3 px-4">
                        <Link
                          to={`/view/${entry._id}`}
                          className="inline-block bg-gray-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-gray-700 transition mr-2"
                        >
                          View
                        </Link>
                        <Link
                          to={`/edit-note/${entry._id}`}
                          className="inline-block bg-blue-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-blue-700 transition mr-2"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(entry._id)}
                          className="inline-block bg-red-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-red-700 transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-4 bg-gray-50 border-t border-gray-200 text-gray-600 text-sm">
                Showing {entries.length} {entries.length === 1 ? 'entry' : 'entries'} for today
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}
