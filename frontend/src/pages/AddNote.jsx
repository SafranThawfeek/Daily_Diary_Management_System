import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AddNote() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mood, setMood] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Please enter a note title");
      return;
    }

    try {
      setLoading(true);
      await api.post("/diary", {
        title,
        description,
        mood: mood || "happy",
        date: new Date()
      });
      nav("/view-notes");
    } catch (err) {
        console.error("Add note error:", err.response || err);
        const msg = err.response?.data?.message || err.message || 'Failed to add note';
        alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Add Note</h1>
          <nav className="text-sm text-gray-600">
            <a href="/dashboard" className="text-blue-600 hover:underline">
              Dashboard
            </a>
            <span className="mx-2">/</span>
            <span>Add Note</span>
          </nav>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category Name Field */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Mood
              </label>
              <select
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Mood</option>
                <option value="happy">Happy</option>
                <option value="sad">Sad</option>
                <option value="excited">Excited</option>
                <option value="stressed">Stressed</option>
                <option value="calm">Calm</option>
                <option value="neutral">Neutral</option>
              </select>
            </div>

            {/* Note Title Field */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Note Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter the note title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Note Description Field */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Note Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="8"
                placeholder="Enter Note Description"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-8 py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
              <button
                type="button"
                onClick={() => nav("/view-notes")}
                className="bg-gray-300 text-gray-800 px-8 py-2 rounded-lg font-semibold hover:bg-gray-400 transition"
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
