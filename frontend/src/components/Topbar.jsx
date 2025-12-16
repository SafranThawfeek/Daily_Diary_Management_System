import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Topbar() {
  const [user, setUser] = useState({ name: 'User' });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    if (userData.name) {
      setUser(userData);
    }
  }, []);

  const handleSearch = async (query) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    try {
      setLoading(true);
      const response = await api.get('/diary', {
        params: { search: query }
      });

      // Filter entries that match the search query (by title or content)
      const filtered = response.data.filter((entry) =>
        entry.title?.toLowerCase().includes(query.toLowerCase()) ||
        entry.content?.toLowerCase().includes(query.toLowerCase())
      );

      setSearchResults(filtered);
      setShowResults(true);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectResult = (entryId) => {
    nav(`/edit-note/${entryId}`);
    setSearchQuery('');
    setShowResults(false);
  };

  return (
    <header className="bg-white shadow px-6 py-3 flex justify-between items-center relative">
      <div className="relative w-64">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35M16.65 10.35a6.3 6.3 0 11-12.6 0 6.3 6.3 0 0112.6 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search for note..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="border px-3 py-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
        />
        {showResults && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded mt-1 shadow-lg z-50 max-h-64 overflow-y-auto">
            {loading ? (
              <div className="px-3 py-2 text-gray-500 text-sm">Searching...</div>
            ) : searchResults.length > 0 ? (
              searchResults.map((result) => (
                <div
                  key={result._id}
                  onClick={() => handleSelectResult(result._id)}
                  className="px-3 py-2 hover:bg-blue-100 cursor-pointer border-b last:border-b-0"
                >
                  <p className="font-medium text-sm text-gray-800">{result.title || 'Untitled'}</p>
                  <p className="text-xs text-gray-600 truncate">
                    {result.content?.substring(0, 50)}...
                  </p>
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-gray-500 text-sm">No notes found</div>
            )}
          </div>
        )}
      </div>

      <div
        className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
        onClick={() => nav('/profile')}
      >
        <span className="text-base">{user.name}</span>
      </div>
    </header>
  );
}
