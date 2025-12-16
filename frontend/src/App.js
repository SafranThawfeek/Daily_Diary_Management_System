import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddNote from "./pages/AddNote";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import AddDiary from "./pages/AddDiary";
import ViewNotes from "./pages/ViewNotes";
import TodayDetails from "./pages/TodayDetails";
import ViewDiary from "./pages/ViewDiary";
import EditNote from "./pages/EditNote";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/today" element={<TodayDetails />} />
          <Route path="/add-diary" element={<AddDiary />} />
          <Route path="/add-note" element={<AddNote />} />
          <Route path="/edit-note/:id" element={<EditNote />} />
          <Route path="/view-notes" element={<ViewNotes />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Route>

        <Route
          path="/view/:id"
          element={
            <ProtectedRoute>
              <ViewDiary />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
