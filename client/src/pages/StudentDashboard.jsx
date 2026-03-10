
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [openProfile, setOpenProfile] = useState(false);

  const storedName = localStorage.getItem("name") || "Student";
  const initial = storedName.charAt(0).toUpperCase();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900">

      {/* SIDEBAR */}
      <div className="w-72 bg-slate-950 text-gray-300 p-6 border-r border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-10">
          Learning Portal
        </h2>

        <ul className="space-y-2 text-sm">
          
          {/* Dashboard */}
          <li className="p-3 rounded-lg bg-indigo-600 text-white font-semibold">
            Dashboard
          </li>

          {/* Available Courses */}
          <li
            onClick={() => navigate("/available-courses")}
            className="p-3 hover:bg-slate-800 cursor-pointer"
          >
            Available Courses
          </li>

          {/* My Courses */}
          <li
            onClick={() => navigate("/my-courses-student")}
            className="p-3 hover:bg-slate-800 cursor-pointer"
          >
            My Courses
          </li>

          {/* Completed Courses */}
          <li
            onClick={() => navigate("/completed-courses")}
            className="p-3 hover:bg-slate-800 cursor-pointer"
          >
            Completed Courses
          </li>

          {/* Quiz Attempts */}
          <li
            onClick={() => navigate("/quiz-attempts")}
            className="p-3 hover:bg-slate-800 cursor-pointer"
          >
            Quiz Attempts
          </li>

          {/* 🔥 NEW: Analytics */}
          <li
            onClick={() => navigate("/student-analytics")}
            className="p-3 hover:bg-slate-800 cursor-pointer"
          >
            Analytics
          </li>

          {/* Logout */}
          <li
            onClick={handleLogout}
            className="p-3 mt-8 text-red-400 hover:bg-red-900/20 cursor-pointer"
          >
            Logout
          </li>

        </ul>
      </div>

      {/* MAIN */}
      <div className="flex-1">

        {/* TOP BAR */}
        <div className="bg-slate-900/60 px-10 py-4 flex justify-between items-center relative">
          <h1 className="text-xl font-semibold text-white">
            Student Dashboard
          </h1>

          <div className="relative">
            <div
              onClick={() => setOpenProfile(!openProfile)}
              className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold cursor-pointer"
            >
              {initial}
            </div>

            {openProfile && (
              <div className="absolute right-0 mt-2 bg-slate-800 border border-slate-700 rounded-lg w-48 shadow-lg text-white">
                <div className="px-4 py-3 border-b border-slate-700 font-semibold">
                  👤 {storedName}
                </div>

                <button
                  onClick={() => navigate("/student-profile")}
                  className="block w-full text-left px-4 py-2 hover:bg-slate-700"
                >
                  My Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-400 hover:bg-slate-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-10 text-white">

          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-10 rounded-xl mb-10">
            <h2 className="text-3xl font-bold mb-2">
              Welcome back, {storedName} 👋
            </h2>
            <p>Start learning and unlock quizzes.</p>
          </div>

          {/* Activity Card */}
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h3 className="mb-3 font-semibold">Your Activity</h3>
            <p className="text-gray-400">
              Activity will appear here soon.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}