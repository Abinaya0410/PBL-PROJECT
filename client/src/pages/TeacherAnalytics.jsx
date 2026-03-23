import React, { useState, useEffect } from "react";
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  FileText, 
  TrendingUp, 
  ArrowUpRight,
  Clock,
  Layout,
  Award,
  ChevronRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TeacherAnalytics() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeacherAnalytics();
  }, []);

  const fetchTeacherAnalytics = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/analytics/teacher", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      } else {
        throw new Error("Failed to fetch analytics");
      }
    } catch (err) {
      console.error("Failed to fetch teacher analytics", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
           <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
           <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Loading Analytics...</p>
        </div>
      </div>
    );
  }

  if (!stats) return <div className="p-8 text-center text-rose-500 font-black">FAILED TO INITIALIZE ANALYTICS STREAM</div>;

  return (
    <div className="p-8 lg:p-12 space-y-12 animate-in fade-in duration-700">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-cyan-500">
            <BarChart3 size={20}/>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Analytics Dashboard</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-900 dark:text-white">Teacher Analytics</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium italic">Overview of student performance and course metrics.</p>
        </div>
        
        <div className="flex gap-4">
           <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-6 py-4 rounded-2xl flex items-center gap-4 shadow-xl">
              <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg">
                <TrendingUp size={18}/>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400">Total Engagement</p>
                <p className="font-black text-xl">{stats.totalAttempts}</p>
              </div>
           </div>
        </div>
      </header>

      {/* Global Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <MetricCard 
          icon={<BookOpen size={24}/>} 
          label="Total Courses" 
          value={stats.totalCourses} 
          subtext="Active Courses"
          color="cyan"
        />
        <MetricCard 
          icon={<Users size={24}/>} 
          label="Students Enrolled" 
          value={stats.totalStudents} 
          subtext="Total Enrollment"
          color="indigo"
        />
        <MetricCard 
          icon={<FileText size={24}/>} 
          label="Total Lessons" 
          value={stats.totalLessons} 
          subtext="Lesson Modules"
          color="blue"
        />
        <MetricCard 
          icon={<Award size={24}/>} 
          label="Quiz Attempts" 
          value={stats.totalAttempts} 
          subtext="Total Engagement"
          color="emerald"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        {/* Course Performance breakdown */}
        <div className="xl:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
              <Layout className="text-cyan-500" size={24}/>
              Course Performance
            </h3>
          </div>
          
          <div className="grid gap-6">
            {stats.recentCourses.map((course) => (
              <div 
                key={course._id}
                onClick={() => navigate(`/teacher/course/${course._id}/analytics`)}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-[2rem] hover:border-cyan-500/50 transition-all cursor-pointer group shadow-xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-cyan-500/10 transition-colors"></div>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                  <div className="space-y-2">
                    <h4 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors">
                      {course.title}
                    </h4>
                    <div className="flex items-center gap-4">
                       <span className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                         <Users size={12}/> {course.enrolledStudents.length} Students
                       </span>
                       <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
                       <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest italic">
                         Course Stats →
                       </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                       <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">Growth</p>
                       <p className="text-xl font-black text-emerald-500">+12%</p>
                    </div>
                    <ChevronRight size={24} className="text-slate-500 dark:text-slate-400 dark:text-slate-300 group-hover:text-cyan-500 transition-all group-hover:translate-x-1"/>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Temporal Activity */}
        <div className="space-y-8">
           <h3 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
              <Clock className="text-indigo-500" size={24}/>
              Student Activity
           </h3>
           <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl -mr-24 -mt-24"></div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400 mb-8">Performance Distribution</p>
              
              <div className="space-y-8">
                 <ProgressTrack label="Quiz Success" percentage={78} color="emerald" />
                 <ProgressTrack label="Assignment Rate" percentage={64} color="cyan" />
                 <ProgressTrack label="Lesson Retention" percentage={92} color="indigo" />
              </div>
              
              <div className="mt-12 pt-8 border-t border-white/10">
                 <button 
                  onClick={() => navigate("/assignment-submissions")}
                  className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2"
                 >
                   View Submissions <ArrowUpRight size={14}/>
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value, subtext, color }) {
  const colors = {
    cyan: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
    indigo: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
    blue: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    emerald: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-xl hover:-translate-y-2 transition-all group relative overflow-hidden">
      <div className={`p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform ${colors[color]}`}>
        {icon}
      </div>
      <div className="relative z-10">
        <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-4xl font-black text-slate-900 dark:text-white mb-2">{value}</p>
        <p className="text-[9px] font-bold italic text-slate-500 dark:text-slate-400 opacity-60 uppercase tracking-wider">{subtext}</p>
      </div>
    </div>
  );
}

function ProgressTrack({ label, percentage, color }) {
  const colorMap = {
    emerald: "bg-emerald-500",
    cyan: "bg-cyan-500",
    indigo: "bg-indigo-500",
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-end">
        <p className="text-[10px] font-black uppercase tracking-widest text-white/60">{label}</p>
        <p className="text-lg font-black italic">{percentage}%</p>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <div 
          className={`h-full ${colorMap[color]} shadow-[0_0_20px_rgba(255,255,255,0.1)] rounded-full transition-all duration-1000`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
