import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [entries, setEntries] = useState([]);
  const [totalNotes, setTotalNotes] = useState(0);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get('/diary');
      setEntries(res.data);
      setTotalNotes(res.data.length);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return;
    try {
      await api.delete(`/diary/${id}`);
      load();
    } catch (err) {
      alert('Failed to delete entry. Please try again.');
    }
  };

  const recentEntries = entries.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's a summary of your recent activity.
          </p>
        </header>

        {/* Get Started Section */}
        {entries.length === 0 && !loading && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Get Started with Your Diary</h2>
            <p className="text-gray-600 mb-6">
              You haven't created any entries yet. Start by adding your first note to keep track of your thoughts and experiences.
            </p>
            <Link
              to="/add-note"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Create Your First Entry
            </Link>
          </div>
        )}

        {/* Stats Cards */}
        {entries.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Notes</h3>
              <p className="text-5xl font-bold text-blue-600">{totalNotes}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Recent Entries</h3>
              <p className="text-5xl font-bold text-green-600">{recentEntries.length}</p>
            </div>
          </div>
        )}

        {/* Recent Entries Table */}
        {entries.length > 0 && (
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">Recent Entries</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-6 font-semibold text-gray-700">#</th>
                    <th className="py-3 px-6 font-semibold text-gray-700">Title</th>
                    <th className="py-3 px-6 font-semibold text-gray-700">Mood</th>
                    <th className="py-3 px-6 font-semibold text-gray-700">Date</th>
                    <th className="py-3 px-6 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentEntries.map((entry, index) => (
                    <tr key={entry._id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-4 px-6 text-gray-600">{index + 1}</td>
                      <td className="py-4 px-6 text-gray-800 font-medium">{entry.title}</td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium capitalize">
                          {entry.mood || 'N/A'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        {new Date(entry.date).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6">
                        <Link
                          to={`/view-notes`}
                          className="text-blue-600 hover:underline font-medium mr-4"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleDelete(entry._id)}
                          className="text-red-600 hover:underline font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-200 text-right">
              <Link to="/view-notes" className="text-blue-600 hover:underline font-medium">
                View All Entries &rarr;
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
