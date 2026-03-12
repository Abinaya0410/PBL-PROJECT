
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  BookOpen, 
  Plus, 
  FileText, 
  BarChart3, 
  Settings, 
  ChevronLeft, 
  Trash2, 
  Edit3, 
  Eye, 
  Users,
  GraduationCap,
  Layout,
  CheckCircle,
  Clock,
  ArrowRight
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function CourseBuilder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCourse();
    fetchLessons();
    fetchAssignments();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/courses/teacher", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      const current = data.find((c) => c._id === id);
      setCourse(current);
    } catch (err) {
      console.log("Course error:", err);
    }
  };

  const fetchLessons = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/courses/${id}/lessons`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setLessons(data);
    } catch (err) {
      console.log("Lesson fetch error:", err);
    }
  };

  const fetchAssignments = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/assignments/course/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setAssignments(data);
      } else {
        setAssignments([]);
      }
    } catch (err) {
      console.log("Assignment fetch error:", err);
    }
  };

  const viewAssignment = (pdfUrl) => {
    if (!pdfUrl) {
      alert("No file found");
      return;
    }
    const cleanPath = pdfUrl.includes("assignments/") ? pdfUrl : `assignments/${pdfUrl}`;
    const fileUrl = `http://localhost:5000/uploads/${cleanPath}`;
    window.open(fileUrl, "_blank");
  };

  const deleteAssignment = async (assignmentId) => {
    if (!window.confirm("Are you sure you want to delete this assignment?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/assignments/${assignmentId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Delete failed");
      setAssignments(assignments.filter(a => a._id !== assignmentId));
      setMessage("Assignment removed from curriculum");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.log("Delete assignment error:", err);
    }
  };

  const deleteLesson = async (lessonId) => {
    if (!window.confirm("Are you sure you want to delete this lesson?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/lessons/${lessonId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Delete lesson failed");
      setLessons(lessons.filter(l => l._id !== lessonId));
      setMessage("Lesson deleted successfully");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.log("Delete lesson error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] p-6 md:p-10 lg:p-16">
      
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="space-y-6">
            <button 
              onClick={() => navigate('/teacher')}
              className="group flex items-center gap-2 text-indigo-500 hover:text-indigo-400 transition-all font-black uppercase tracking-widest text-[10px]"
            >
              <div className="p-1.5 bg-indigo-500/10 rounded-lg group-hover:-translate-x-1 transition-transform">
                <ChevronLeft size={16} />
              </div>
              Studio Root
            </button>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <span className="px-3 py-1 bg-indigo-500/10 text-indigo-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-500/20">Course Architect</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none uppercase">
                {course ? course.title : "Building..."}
              </h1>
              <p className="text-[var(--secondary)] max-w-2xl font-bold leading-relaxed italic opacity-80">{course?.description}</p>
            </div>
          </div>
          
          <div className="glass-card p-8 flex items-center gap-8 shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-500/10 transition-colors"></div>
             <div className="text-center px-4 border-r border-[var(--border)] relative z-10">
                <p className="text-[10px] font-black uppercase tracking-widest text-[var(--secondary)] mb-1">Architecture</p>
                <p className="text-3xl font-black">{lessons.length} Modules</p>
             </div>
             <div className="text-center px-4 relative z-10">
                <p className="text-[10px] font-black uppercase tracking-widest text-[var(--secondary)] mb-1">Objectives</p>
                <p className="text-3xl font-black">{assignments.length} Tasks</p>
             </div>
          </div>
        </header>

        {message && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 p-6 rounded-3xl flex items-center gap-4 animate-in fade-in slide-in-from-top-4 shadow-lg shadow-emerald-500/5">
            <div className="p-2 bg-emerald-500 text-white rounded-xl">
               <CheckCircle size={18} />
            </div>
            <p className="font-black uppercase tracking-tight text-sm">{message}</p>
          </div>
        )}

        {/* QUICK ACTIONS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ActionButton onClick={() => navigate(`/add-lesson/${id}`)} icon={<Plus size={20}/>} label="Construct Module" color="indigo" />
          <ActionButton onClick={() => navigate(`/add-assignment/${id}`)} icon={<FileText size={20}/>} label="Deploy Task" color="emerald" />
          <ActionButton onClick={() => navigate(`/create-quiz/${id}`)} icon={<Layout size={20}/>} label="Configure Quiz" color="violet" />
          <ActionButton onClick={() => navigate(`/course-analytics/${id}`)} icon={<BarChart3 size={20}/>} label="Deep Insights" color="amber" />
        </section>

        {/* CURRICULUM GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16">
          
          {/* ASSIGNMENTS */}
          <section className="space-y-10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black flex items-center gap-4 uppercase tracking-tight">
                <div className="w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/30">
                  <FileText size={24}/>
                </div>
                Operational Tasks
              </h2>
              <span className="text-[10px] font-black uppercase tracking-widest text-[var(--secondary)] bg-[var(--card)] px-3 py-1 rounded-full border border-[var(--border)]">{assignments.length} Total</span>
            </div>

            {assignments.length === 0 ? (
              <EmptyState message="Deployment Queue Empty" sub="Add your first student task to initiate engagement." />
            ) : (
              <div className="space-y-4">
                {assignments.map((assignment) => (
                  <div key={assignment._id} className="glass-card p-6 flex flex-col sm:flex-row items-center justify-between gap-8 group hover:-translate-y-1 hover:border-emerald-500/40 transition-all duration-500">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-black group-hover:text-emerald-500 transition-colors uppercase tracking-tight truncate leading-none mb-1">{assignment.title}</h3>
                      <p className="text-[10px] text-[var(--secondary)] font-bold uppercase tracking-widest opacity-60">Status: Active Deploy</p>
                    </div>
                    <div className="flex gap-3 shrink-0">
                       <IconButton icon={<Eye size={18}/>} onClick={() => viewAssignment(assignment.pdfUrl)} tooltip="Inspect Architecture" />
                       <IconButton icon={<Edit3 size={18}/>} onClick={() => navigate(`/edit-assignment/${assignment._id}`)} tooltip="Refactor" />
                       <IconButton icon={<Users size={18}/>} onClick={() => navigate(`/assignment-submissions/${assignment._id}`)} color="purple" tooltip="Monitor Submissions" />
                       <IconButton icon={<Trash2 size={18}/>} onClick={() => deleteAssignment(assignment._id)} color="rose" tooltip="Decommission" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* LESSONS */}
          <section className="space-y-10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black flex items-center gap-4 uppercase tracking-tight">
                <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/30">
                  <BookOpen size={24}/>
                </div>
                Syllabus Architecture
              </h2>
              <span className="text-[10px] font-black uppercase tracking-widest text-[var(--secondary)] bg-[var(--card)] px-3 py-1 rounded-full border border-[var(--border)]">{lessons.length} Modules</span>
            </div>

            {lessons.length === 0 ? (
              <EmptyState message="Learning Tree Unbranched" sub="Seed your course with instructional modules." />
            ) : (
              <div className="space-y-4">
                {lessons.map((lesson) => (
                  <div key={lesson._id} className="glass-card p-6 flex flex-col sm:flex-row items-center justify-between gap-8 group hover:-translate-y-1 hover:border-indigo-500/40 transition-all duration-500">
                    <div className="flex-1 min-w-0 flex items-center gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-indigo-500/20 group-hover:rotate-6 transition-transform">
                        {lesson.order}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg font-black group-hover:text-indigo-500 transition-colors uppercase tracking-tight truncate leading-none mb-1">{lesson.title}</h3>
                        <p className="text-[10px] text-[var(--secondary)] font-bold uppercase tracking-widest opacity-60">Module Type: {lesson.type || 'Standard'}</p>
                      </div>
                    </div>
                    <div className="flex gap-3 shrink-0">
                       <IconButton icon={<Eye size={18}/>} onClick={() => navigate(`/lesson-details/${lesson._id}`)} tooltip="Simulate View" />
                       <IconButton icon={<Edit3 size={18}/>} onClick={() => navigate(`/edit-lesson/${lesson._id}`)} tooltip="Refine Content" />
                       <IconButton icon={<Plus size={18}/>} onClick={() => navigate(`/upload-questions/${lesson._id}`)} color="purple" tooltip="Inject Knowledge Base" />
                       <IconButton icon={<Trash2 size={18}/>} onClick={() => deleteLesson(lesson._id)} color="rose" tooltip="Eradicate" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

        </div>
      </div>
    </div>
  );
}

function ActionButton({ onClick, icon, label, color }) {
  const colors = {
    indigo: 'from-indigo-600 to-purple-700 shadow-indigo-500/20',
    emerald: 'from-emerald-500 to-teal-600 shadow-emerald-500/20',
    violet: 'from-violet-600 to-fuchsia-700 shadow-violet-500/20',
    amber: 'from-amber-500 to-orange-600 shadow-amber-500/20'
  };

  return (
    <button
      onClick={onClick}
      className={`relative overflow-hidden p-8 rounded-[2rem] bg-gradient-to-br ${colors[color]} text-white shadow-2xl hover:scale-[1.03] active:scale-95 transition-all text-left group`}
    >
      <div className="relative z-10 flex flex-col gap-6">
         <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 group-hover:rotate-12 transition-transform shadow-inner">
           {icon}
         </div>
         <span className="font-black text-xs uppercase tracking-[0.2em]">{label}</span>
      </div>
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-white/20 transition-colors"></div>
    </button>
  );
}

function IconButton({ icon, onClick, color = 'indigo', tooltip }) {
  const themes = {
    indigo: 'text-indigo-600 hover:bg-indigo-500/10 border-indigo-500/20',
    purple: 'text-purple-600 hover:bg-purple-500/10 border-purple-500/20',
    rose: 'text-rose-600 hover:bg-rose-500/10 border-rose-500/20'
  };

  return (
    <button
      onClick={onClick}
      title={tooltip}
      className={`w-11 h-11 rounded-2xl border flex items-center justify-center transition-all active:scale-90 hover:shadow-lg shadow-indigo-500/5 ${themes[color]}`}
    >
      {icon}
    </button>
  );
}

function EmptyState({ message, sub }) {
  return (
    <div className="glass-card p-16 text-center flex flex-col items-center gap-6 border-dashed border-2">
       <div className="p-6 bg-[var(--background)] rounded-[2.5rem] border border-[var(--border)] shadow-inner">
          <GraduationCap className="text-gray-300 dark:text-gray-700" size={48}/>
       </div>
       <div>
          <p className="text-sm font-black text-[var(--foreground)] uppercase tracking-widest mb-2">{message}</p>
          <p className="text-xs text-[var(--secondary)] font-medium italic">{sub}</p>
       </div>
    </div>
  );
}