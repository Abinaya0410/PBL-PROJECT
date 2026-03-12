
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Search, Bell } from "lucide-react";

const StudentLayout = () => {
  const navigate = useNavigate();
  const [openProfile, setOpenProfile] = useState(false);
  const storedName = localStorage.getItem("name") || "Student";
  const initial = storedName.charAt(0).toUpperCase();

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      {/* MAIN */}
      <main className="flex-1 flex flex-col min-h-screen h-screen overflow-hidden">
        
        {/* TOPBAR */}
        <header className="h-20 flex items-center justify-between px-8 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">Virtual Academic Portal</h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:block group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-500 transition-colors" size={16}/>
              <input
                placeholder="Search resources..."
                className="bg-[var(--card)] border border-[var(--border)] rounded-xl pl-10 pr-4 py-2.5 text-sm w-72 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
            
            <button className="relative p-2 text-gray-400 hover:text-[var(--foreground)] transition">
              <Bell size={20}/>
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-[var(--background)]"></span>
            </button>

            <div 
              onClick={() => setOpenProfile(!openProfile)}
              className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-xl shadow-indigo-500/20 ring-2 ring-[var(--background)] cursor-pointer hover:scale-105 transition-transform"
            >
              {initial}
            </div>
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default StudentLayout;
