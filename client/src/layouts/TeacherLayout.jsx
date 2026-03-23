import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import TeacherSidebar from "../components/TeacherSidebar";
import { Search, Bell, TrendingUp, User, LogOut } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";

const TeacherLayout = () => {
  const navigate = useNavigate();
  const [openProfile, setOpenProfile] = useState(false);
  const storedName = localStorage.getItem("name") || "Teacher";
  const initial = storedName.charAt(0).toUpperCase();

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <TeacherSidebar />

      {/* MAIN */}
      <main className="flex-1 flex flex-col min-h-screen h-screen overflow-hidden">
        
        {/* TOPBAR */}
        <header className="h-20 flex items-center justify-between px-8 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">Teacher Workspace</h1>
            <div className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 border border-emerald-500/20">
              <TrendingUp size={12}/> Live Status
            </div>
          </div>
  
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition">
              <Bell size={20}/>
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>

            <ThemeToggle />

            <div className="relative">
              <div 
                onClick={() => setOpenProfile(!openProfile)}
                className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white shadow-xl shadow-cyan-500/20 ring-2 ring-white dark:ring-slate-900 cursor-pointer hover:scale-105 transition-all active:scale-95"
              >
                {initial}
              </div>

              {/* DROPDOWN MENU */}
              {openProfile && (
                <div className="absolute right-0 mt-4 w-56 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 py-3 z-50 animate-in fade-in zoom-in duration-200">
                  <div className="px-5 py-3 border-b border-slate-50 dark:border-slate-800 mb-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Logged in as</p>
                    <p className="text-sm font-bold truncate text-slate-800 dark:text-slate-100">{storedName}</p>
                  </div>
                  
                  <button 
                    onClick={() => {
                      setOpenProfile(false);
                      // Navigate to unified profile
                      navigate("/profile"); 
                    }}
                    className="w-full px-5 py-3 text-left text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-cyan-500 transition-colors flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      <User size={14}/>
                    </div>
                    My Profile
                  </button>

                  <button 
                    onClick={() => {
                      localStorage.clear();
                      navigate("/");
                    }}
                    className="w-full px-5 py-3 text-left text-sm font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center">
                      <LogOut size={14}/>
                    </div>
                    Logout
                  </button>
                </div>
              )}
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

export default TeacherLayout;
