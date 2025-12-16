import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

export default function ViewDiary() {
  const nav = useNavigate();
  const { id } = useParams();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await api.get(`/diary/${id}`);
        setEntry(res.data);
        setLoading(false);
      } catch (err) {
        alert('Failed to load entry');
        nav('/dashboard');
      }
    })();
  }, [id, nav]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!entry) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <p className="text-gray-600">Entry not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => nav('/dashboard')}
          className="mb-6 text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to Dashboard
        </button>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{entry.title}</h1>

          <div className="space-y-6">
            <div>
              <label className="text-sm font-semibold text-gray-600">Date</label>
              <p className="text-gray-800 mt-1">
                {new Date(entry.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-600">Mood</label>
              <p className="text-gray-800 mt-1">
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                  {entry.mood || '-'}
                </span>
              </p>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-600">Description</label>
              <p className="text-gray-700 mt-2 whitespace-pre-wrap leading-relaxed">
                {entry.description}
              </p>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <button
                onClick={() => nav('/dashboard')}
                className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 font-medium"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
