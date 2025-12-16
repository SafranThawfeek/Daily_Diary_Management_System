import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const nav = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    nav('/login');
  };

  return (
    <aside className="w-64 bg-[#1f2933] text-gray-200">
      <div className="p-4 text-xl font-bold border-b border-gray-700">
        DAILY DIARY 
      </div>

      <nav className="p-4 space-y-2 text-base">
        <Link to="/dashboard" className="block p-2 rounded hover:bg-gray-700">
          Dashboard
        </Link>
        <Link to="/today" className="block p-2 rounded hover:bg-gray-700">
          Today's Details
        </Link>
        <Link to="/add-diary" className="block p-2 rounded hover:bg-gray-700">
          Add Diary
        </Link>
        <Link to="/view-notes" className="block p-2 rounded hover:bg-gray-700">
          View Notes
        </Link>

        <p className="text-gray-400 mt-6">PROFILE SETTING</p>

        <Link to="/profile" className="block p-2 rounded hover:bg-gray-700">
          My Profile
        </Link>
        <Link to="/change-password" className="block p-2 rounded hover:bg-gray-700">
          Change Password
        </Link>
        <button onClick={handleLogout} className="block w-full text-left p-2 rounded hover:bg-red-600">
          Logout
        </button>
      </nav>
    </aside>
  );
}
