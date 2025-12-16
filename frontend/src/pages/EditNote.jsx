import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

export default function EditNote() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mood, setMood] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    api.get(`/diary/${id}`).then((res) => {
      const e = res.data || {};
      setTitle(e.title || "");
      setDescription(e.description || "");
      setMood(e.mood || "");
    }).catch(() => navigate('/dashboard'));
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert('Please enter a note title');
    try {
      setLoading(true);
      await api.put(`/diary/${id}`, { title, description, mood });
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save note');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Edit Note</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Category</label>
              <select value={mood} onChange={(e) => setMood(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option value="">Select Category</option>
                <option value="happy">Happy</option>
                <option value="sad">Sad</option>
                <option value="excited">Excited</option>
                <option value="stressed">Stressed</option>
                <option value="calm">Calm</option>
                <option value="neutral">Neutral</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Note Title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter the note title" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Note Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="8" placeholder="Enter Note Description" className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none"></textarea>
            </div>

            <div className="flex gap-3">
              <button type="submit" disabled={loading} className="bg-blue-600 text-white px-8 py-2 rounded-lg font-semibold disabled:opacity-50">{loading ? 'Saving...' : 'Save'}</button>
              <button type="button" onClick={() => navigate('/dashboard')} className="bg-gray-300 text-gray-800 px-8 py-2 rounded-lg">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
