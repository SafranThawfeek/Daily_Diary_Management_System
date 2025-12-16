import { useState } from "react";
import api from "../services/api";

export default function ChangePassword() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (form.newPassword !== form.confirmPassword) {
      setMessage("New passwords do not match");
      return;
    }
    
    if (form.newPassword.length < 6) {
      setMessage("New password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const res = await api.put("/auth/change-password", {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword
      });
      setMessage(res.data.message || "Password changed successfully");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Change Password</h1>

        <div className="bg-white p-6 rounded shadow space-y-4">
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              value={form.currentPassword}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded mb-3"
              required
            />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={form.newPassword}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded mb-3"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded mb-4"
              required
            />
            <button 
              type="submit" 
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
            >
              {loading ? "Changing..." : "Change Password"}
            </button>
          </form>
          
          {message && (
            <div className={`mt-4 p-3 rounded ${message.includes("success") || message.includes("successfully") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
