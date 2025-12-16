import { useEffect, useState } from "react";
import api from "../services/api";

export default function ViewNotes() {
  const [notes, setNotes] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    api.get("/diary").then(res => setNotes(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">View Diary</h1>

        <table className="w-full bg-white border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Title</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {notes.map(note => (
            <tr key={note._id}>
              <td className="border p-2">{note.title}</td>
              <td className="border p-2">{note.category}</td>
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
            <p className="text-sm text-gray-500 mb-2">{selected.category}</p>
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
