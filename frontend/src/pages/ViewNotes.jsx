import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function ViewNotes() {
  const [notes, setNotes] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api.get("/diary").then(res => setNotes(res.data));
  };

  const handleDelete = id => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      api.delete(`/diary/${id}`).then(() => getNotes());
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">View Diary</h1>

        <table className="w-full bg-white border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Title</th>
            <th className="border p-2">Mood</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {notes.map(note => (
            <tr key={note._id}>
              <td className="border p-2">{note.title}</td>
              <td className="border p-2">{note.mood}</td>
              <td className="border p-2">
                {new Date(note.createdAt).toLocaleDateString()}
              </td>
              <td className="border p-2">
                <button
                  onClick={() => setSelected(note)}
                  className="bg-blue-600 text-white px-2 py-1 rounded"
                >
                  View
                </button>
                <Link to={`/edit-note/${note._id}`}>
                  <button
                    className="bg-yellow-600 text-white px-2 py-1 rounded ml-2"
                  >
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="bg-red-600 text-white px-2 py-1 rounded ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-full max-w-lg p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">{selected.title}</h2>
            <p className="text-sm text-gray-500 mb-2">{selected.mood}</p>
            <p className="mb-4">{selected.description}</p>

            <button
              onClick={() => setSelected(null)}
              className="bg-gray-700 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
