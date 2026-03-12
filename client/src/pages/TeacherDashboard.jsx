
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  FileText,
  BarChart3,
  LogOut,
  GraduationCap,
  Search,
  Bell,
  ArrowUpRight,
  TrendingUp,
  Clock
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalLessons: 0,
    totalAttempts: 0,
    recentSubmissions: [],
  });

  const [courses, setCourses] = useState([]);
  const storedName = localStorage.getItem("name") || "Teacher";
  const initial = storedName.charAt(0).toUpperCase();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    fetchAnalytics();
    fetchCourses();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/analytics/teacher", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setStats({
        totalCourses: data.totalCourses || 0,
        totalStudents: data.totalStudents || 0,
        totalLessons: data.totalLessons || 0,
        totalAttempts: data.totalAttempts || 0,
        recentSubmissions: data.recentSubmissions || [],
      });
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/courses/teacher", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setCourses(data.slice(0, 3));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      
      {/* SIDEBAR */}
      <aside className="w-72 border-r bg-[var(--card)] border-[var(--border)] p-6 hidden lg:block transition-all">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg text-white shadow-lg shadow-cyan-500/20">
            <GraduationCap size={24}/>
          </div>
          <h2 className="text-xl font-black tracking-tight">Intelli Hub</h2>
        </div>

        <nav className="space-y-1">
          <NavItem icon={<LayoutDashboard size={18}/>} label="Dashboard" active />
          <NavItem icon={<BookOpen size={18}/>} label="Create Course" onClick={() => navigate("/create-course")} />
          <NavItem icon={<FileText size={18}/>} label="My Courses" onClick={() => navigate("/my-courses")} />
          <NavItem icon={<BarChart3 size={18}/>} label="Analytics" onClick={() => navigate("/analytics")} />
          
          <div className="pt-8 border-t border-[var(--border)] mt-8">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all font-semibold"
            >
              <LogOut size={18}/>
              Logout
            </button>
          </div>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col min-h-screen h-screen overflow-hidden">
        
        {/* TOPBAR */}
        <header className="h-20 flex items-center justify-between px-8 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">Teacher Workspace</h1>
            <div className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 border border-emerald-500/20">
              <TrendingUp size={12}/> Live Status
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:block group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-500 transition-colors" size={16}/>
              <input
                placeholder="Search resources..."
                className="bg-[var(--card)] border border-[var(--border)] rounded-xl pl-10 pr-4 py-2 text-sm w-72 focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
              />
            </div>
            
            <button className="relative p-2 text-gray-400 hover:text-[var(--foreground)] transition">
              <Bell size={20}/>
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-[var(--background)]"></span>
            </button>

            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white shadow-xl shadow-cyan-500/20 ring-2 ring-[var(--background)]">
              {initial}
            </div>
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto p-8 lg:p-12 space-y-10 custom-scrollbar">
          
          {/* HERO */}
          <section className="relative overflow-hidden bg-gradient-to-br from-cyan-600 to-blue-700 rounded-3xl p-10 text-white shadow-2xl shadow-cyan-500/20">
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-4xl font-black mb-4 tracking-tight leading-tight uppercase">Dashboard Overview</h2>
              <p className="text-white/80 text-lg leading-relaxed mb-8 italic">
                {stats.totalStudents > 0 
                  ? `Empowering ${stats.totalStudents} students across ${stats.totalCourses} professional courses.`
                  : "Start your teaching journey today by creating your first course."}
              </p>
              <div className="flex gap-4">
                <button onClick={() => navigate("/create-course")} className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold shadow-xl hover:scale-105 transition-transform active:scale-95">
                  Initialize Course
                </button>
                <button className="bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-xl font-bold border border-white/20 hover:bg-white/20 transition-all">
                  Generate Analytical Report
                </button>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          </section>

          {/* STATS */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={<BookOpen className="text-cyan-500"/>} label="Live Courses" value={stats.totalCourses} trend="Active" color="cyan" />
            <StatCard icon={<FileText className="text-blue-500"/>} label="Total Lessons" value={stats.totalLessons} trend="Ongoing" color="blue" />
            <StatCard icon={<Users className="text-emerald-500"/>} label="Enrolled Talent" value={stats.totalStudents} trend="Growing" color="emerald" />
            <StatCard icon={<BarChart3 className="text-violet-500"/>} label="Quiz Engagement" value={stats.totalAttempts} trend="Monitored" color="violet" />
          </section>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
            {/* RECENT COURSES */}
            <div className="xl:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black uppercase tracking-tight leading-none">Management Studio</h3>
                <button onClick={() => navigate("/my-courses")} className="text-cyan-500 font-bold flex items-center gap-1 hover:underline text-xs tracking-widest uppercase">
                  My Repository <ArrowUpRight size={14}/>
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {courses.length === 0 ? (
                  <div className="glass-card p-12 text-center col-span-2">
                    <p className="text-gray-500 italic">No courses found in your repository.</p>
                  </div>
                ) : (
                  courses.map((course) => (
                    <div
                      key={course._id}
                      onClick={() => navigate(`/course/${course._id}`)}
                      className="glass-card hover:border-cyan-500 group cursor-pointer p-8 relative overflow-hidden h-full flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-10 h-10 bg-cyan-500/10 text-cyan-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                          <BookOpen size={20}/>
                        </div>
                        <h4 className="text-xl font-black group-hover:text-cyan-500 transition-colors mb-3 line-clamp-1 uppercase tracking-tight">{course.title}</h4>
                        <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed mb-6 italic h-10">
                          {course.description || "Instructional design pending."}
                        </p>
                      </div>
                      <div className="flex items-center justify-between text-[10px] pt-4 border-t border-[var(--border)] font-black uppercase tracking-widest">
                        <span className="flex items-center gap-1 text-gray-500"><Clock size={12}/> Updated Phase</span>
                        <span className="text-cyan-500">Configure Route →</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* STUDENT ACTIVITY FEED */}
            <div className="space-y-6">
              <h3 className="text-2xl font-black uppercase tracking-tight leading-none">Task Stream</h3>
              <div className="glass-card overflow-hidden h-full flex flex-col">
                {stats.recentSubmissions.length === 0 ? (
                  <div className="p-16 text-center flex-1 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-[var(--background)] border border-[var(--border)] rounded-3xl flex items-center justify-center mx-auto mb-4 text-gray-300">
                      <FileText size={24}/>
                    </div>
                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest italic">No pending submissions</p>
                  </div>
                ) : (
                  <div className="divide-y divide-[var(--border)] flex-1 overflow-y-auto max-h-[500px]">
                    {stats.recentSubmissions.map((sub) => (
                      <div 
                        key={sub._id} 
                        className="p-6 hover:bg-[var(--card)]/50 transition cursor-pointer flex gap-4 group"
                        onClick={() => navigate(`/assignment-submissions/${sub.assignment?._id}`)}
                      >
                        <div className="w-12 h-12 bg-indigo-500/10 text-indigo-500 rounded-2xl flex-shrink-0 flex items-center justify-center font-black text-lg group-hover:scale-110 transition-transform shadow-lg shadow-indigo-500/10 border border-indigo-500/20">
                          {sub.student?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-black text-sm uppercase tracking-tight truncate">
                            {sub.student?.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-1 italic font-medium">
                            {sub.assignment?.title}
                          </p>
                          <div className="flex items-center justify-between gap-3 mt-3">
                            <span className={`text-[9px] font-black px-2 py-0.5 rounded-lg uppercase tracking-widest border border-indigo-500/30 shadow-sm ${
                              sub.status === 'graded' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                            }`}>
                              {sub.status}
                            </span>
                            <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest">
                              {new Date(sub.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full p-4 rounded-2xl transition-all duration-500 font-bold text-sm uppercase tracking-wider ${
        active 
          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-xl shadow-cyan-500/30 -translate-y-0.5' 
          : 'text-gray-500 hover:text-[var(--foreground)] hover:bg-[var(--background)] hover:translate-x-1'
      }`}
    >
      <div className={`${active ? 'text-white' : 'text-cyan-500 group-hover:text-cyan-400'}`}>
        {icon}
      </div>
      {label}
    </button>
  );
}

function StatCard({ icon, label, value, trend, color }) {
  return (
    <div className="glass-card p-6 flex flex-col gap-4 group hover:-translate-y-2 transition-all">
       <div className={`p-4 bg-${color}-500/10 rounded-2xl w-fit group-hover:scale-110 transition-transform shadow-sm`}>
          {icon}
       </div>
       <div>
          <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{label}</h4>
          <div className="flex items-baseline gap-2">
             <span className="text-3xl font-black">{value}</span>
             <span className={`text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-md bg-${color}-500/10 text-${color}-500 border border-${color}-500/20`}>
                {trend}
             </span>
          </div>
       </div>
    </div>
  );
}