import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [entries, setEntries] = useState([]);
  const [totalNotes, setTotalNotes] = useState(0);

  const load = async () => {
    try {
      const res = await api.get('/diary');
      setEntries(res.data);
      setTotalNotes(res.data.length);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this entry?')) return;
    try {
      await api.delete(`/diary/${id}`);
      load();
    } catch (err) { alert('Delete failed'); }
  };

  // Get recent entries (limit to 10)
  const recentEntries = entries.slice(0, 10);

  return (
    <>
      <div className="p-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-500 text-white rounded-lg p-6 shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-semibold mb-1">Total Notes</p>
                <p className="text-4xl font-bold">{totalNotes}</p>
              </div>
              <svg className="w-8 h-8 opacity-80" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.3A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
              </svg>
            </div>
            <Link to="/view-notes" className="text-blue-100 hover:text-white text-sm font-semibold mt-4 inline-block">
              View Details →
            </Link>
          </div>

          <div className="bg-green-500 text-white rounded-lg p-6 shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-semibold mb-1">Total Entries</p>
                <p className="text-4xl font-bold">{entries.length}</p>
              </div>
              <svg className="w-8 h-8 opacity-80" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000-2H6a4 4 0 100 8h8a1 1 0 100-2H4a2 2 0 01-2-2V5z" clipRule="evenodd" />
              </svg>
            </div>
            <Link to="/view-notes" className="text-green-100 hover:text-white text-sm font-semibold mt-4 inline-block">
              View Details →
            </Link>
          </div>
        </div>

        {/* Recently Added Entries Table */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Recent Notes
          </h2>

          {entries.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No entries yet</p>
              <Link to="/add-note" className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Create First Entry
              </Link>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-600">#</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-600">Title</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-600">Mood</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-600">Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-600">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentEntries.map((entry, index) => (
                      <tr key={entry._id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-500">{index + 1}</td>
                        <td className="py-3 px-4 text-gray-700 font-medium">{entry.title}</td>
                        <td className="py-3 px-4">
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                            {entry.mood || '-'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-500">
                          {new Date(entry.date).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <Link to={`/view/${entry._id}`} className="inline-block bg-blue-500 text-white px-3 py-1 rounded text-xs font-medium hover:bg-blue-600 mr-2">
                            View
                          </Link>
                          <button onClick={() => handleDelete(entry._id)} className="inline-block bg-red-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-red-700">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-gray-500 text-sm">
                Showing {recentEntries.length} of {entries.length} entries
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
