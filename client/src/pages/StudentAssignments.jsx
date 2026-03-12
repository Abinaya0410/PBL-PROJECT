import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  FileText, 
  Download, 
  Upload, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  ChevronLeft,
  CloudUpload,
  MessageSquare,
  Trophy,
  ExternalLink,
  Target
} from "lucide-react";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";

export default function StudentAssignments() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [submittingId, setSubmittingId] = useState(null);
  const [file, setFile] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchAssignments();
  }, [courseId]);

  const fetchAssignments = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/assignments/course/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAssignments(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch assignments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (assignmentId) => {
    if (!file) {
      setError("Please select a valid document (PDF)");
      return;
    }

    setSubmittingId(assignmentId);
    setError("");
    setMessage("");

    const formData = new FormData();
    formData.append("assignmentId", assignmentId);
    formData.append("pdf", file);

    try {
      await axios.post("http://localhost:5000/api/assignments/submit", formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      setMessage("Assignment successfully submitted.");
      setFile(null);
      fetchAssignments();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error submitting assignment.");
    } finally {
      setSubmittingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
           <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
           <p className="text-[10px] font-black uppercase tracking-widest text-[var(--secondary)] animate-pulse">Loading Assignments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] p-6 md:p-10 lg:p-16">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Header Section */}
        <header className="space-y-10">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-primary hover:translate-x-1 transition-all font-black uppercase tracking-widest text-[10px]"
          >
            <ChevronLeft size={16} />
            Back to Course
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="space-y-4">
               <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none uppercase">
                Assignments
              </h1>
              <p className="text-lg text-[var(--secondary)] font-bold italic opacity-80 max-w-xl leading-relaxed">
                Assignments for this course
              </p>
            </div>
          </div>
        </header>

        {/* Global Messages */}
        <div className="space-y-4">
          {message && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 p-6 rounded-3xl flex items-center gap-4 animate-in fade-in slide-in-from-top-4 shadow-lg shadow-emerald-500/5">
              <div className="w-10 h-10 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
                 <CheckCircle size={20} />
              </div>
              <p className="font-black uppercase tracking-tight text-sm">{message}</p>
            </div>
          )}
          {error && (
            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-600 p-6 rounded-3xl flex items-center gap-4 animate-in fade-in slide-in-from-top-4 shadow-lg shadow-rose-500/5">
              <div className="w-10 h-10 bg-rose-500 text-white rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3">
                 <AlertCircle size={20} />
              </div>
              <p className="font-black uppercase tracking-tight text-sm">{error}</p>
            </div>
          )}
        </div>

        {assignments.length === 0 ? (
          <div className="glass-card p-24 text-center border-dashed border-2 flex flex-col items-center gap-6">
            <div className="w-20 h-20 bg-[var(--background)] border border-[var(--border)] rounded-[2rem] flex items-center justify-center text-gray-300 shadow-inner">
              <FileText size={40} />
            </div>
            <div>
               <h3 className="text-xl font-black uppercase tracking-tight mb-2">No Assignments</h3>
               <p className="text-xs text-[var(--secondary)] font-bold">No assignments available for this course yet.</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-12 pt-4">
            {assignments.map((assignment) => (
              <div 
                key={assignment._id}
                className="glass-card group overflow-hidden hover:border-indigo-500/40 transition-all duration-700"
              >
                <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-[var(--border)]">
                  
                  {/* Info Section */}
                  <div className="flex-1 p-8 md:p-12 space-y-8 relative">
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-4">
                         <h2 className="text-2xl md:text-3xl font-black group-hover:text-indigo-500 transition-colors uppercase tracking-tight leading-none">{assignment.title}</h2>
                         <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm border ${
                           assignment.submissionStatus === 'graded' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                           assignment.submissionStatus === 'submitted' ? 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20' :
                           'bg-slate-500/10 text-slate-500 border-slate-500/20'
                         }`}>
                           {assignment.submissionStatus.toUpperCase().replace('-', ' ')}
                         </span>
                      </div>
                      
                      <p className="text-[var(--secondary)] leading-relaxed font-bold opacity-80">
                        {assignment.description}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-6 pt-2">
                      <div className="flex items-center gap-2 px-5 py-2.5 bg-[var(--background)] border border-rose-500/20 rounded-2xl text-[10px] font-black text-rose-500 uppercase tracking-widest shadow-sm">
                        <Clock size={14}/>
                        Due Date: {new Date(assignment.dueDate).toLocaleDateString()}
                      </div>
                      {assignment.submissionStatus === 'graded' && (
                        <div className="flex items-center gap-2 text-emerald-500 font-black text-2xl uppercase tracking-tighter">
                           <Trophy size={20} className="text-amber-500 shadow-amber-500/20"/>
                           Score: {assignment.submission?.score}%
                        </div>
                      )}
                    </div>

                    {assignment.submission?.feedback && (
                      <div className="p-8 bg-indigo-500/5 rounded-[2rem] border border-indigo-500/10 text-[var(--foreground)] mt-8 flex gap-5 shadow-inner">
                        <MessageSquare className="text-indigo-500 mt-1 shrink-0" size={24}/>
                        <div>
                           <span className="block font-black text-[10px] uppercase tracking-[0.2em] text-indigo-500 mb-3">Feedback</span>
                           <p className="font-bold leading-relaxed opacity-90 text-sm">"{assignment.submission.feedback}"</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions Section */}
                  <div className="w-full lg:w-96 p-8 md:p-12 bg-indigo-500/5 flex flex-col justify-center gap-8 relative overflow-hidden group/actions">
                    <div className="space-y-4 relative z-10">
                      <a
                        href={`http://localhost:5000/uploads/${assignment.pdfUrl.includes('assignments/') ? assignment.pdfUrl : 'assignments/' + assignment.pdfUrl}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-3 w-full p-5 glass-card hover:bg-white dark:hover:bg-slate-800 transition-all font-black text-[12px] uppercase tracking-widest group/btn shadow-xl hover:-translate-y-1"
                      >
                        <Download size={18} className="group-hover/btn:translate-y-1 transition-transform" />
                        Download Assignment
                      </a>
                    </div>

                    <div className="h-px bg-indigo-500/10 w-full relative z-10"></div>

                    {assignment.submissionStatus === 'not-submitted' ? (
                      <div className="space-y-6 relative z-10">
                        <div className="relative group/file">
                           <input
                            type="file"
                            accept="application/pdf"
                            onChange={handleFileChange}
                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                          />
                          <div className="border-2 border-dashed border-indigo-500/20 rounded-[2rem] p-8 text-center group-hover/file:border-indigo-500 group-hover/file:bg-indigo-500/5 transition-all duration-500 bg-[var(--background)]/50 backdrop-blur-sm">
                             <CloudUpload className="mx-auto mb-3 text-indigo-500/40 group-hover/file:text-indigo-500 group-hover/file:scale-110 transition-all" size={32}/>
                             <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500/60 leading-none mb-1">{file ? "File Selected" : "Select PDF"}</p>
                             <p className="text-[9px] font-bold text-gray-400 line-clamp-1 italic px-4 mt-2">{file ? file.name : "Max 10MB • PDF"}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleSubmit(assignment._id)}
                          disabled={submittingId === assignment._id}
                          className="primary-btn w-full flex items-center justify-center gap-3 py-5 shadow-indigo-500/40 text-[12px] uppercase tracking-[0.2em]"
                        >
                          <Upload size={18} />
                          {submittingId === assignment._id ? "Submitting..." : "Submit Assignment"}
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-6 relative z-10">
                         <div className="space-y-3">
                            <a
                              href={`http://localhost:5000/uploads/${assignment.submission?.submissionUrl.includes('assignments/') ? assignment.submission.submissionUrl : 'assignments/' + assignment.submission.submissionUrl}`}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center justify-center gap-3 w-full p-5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-2xl transition-all font-black text-[12px] uppercase tracking-widest group/view hover:bg-emerald-500 hover:text-white shadow-lg shadow-emerald-500/5"
                            >
                              <FileText size={18} />
                              View Submission
                              <ExternalLink size={14} className="opacity-0 group-hover/view:opacity-100 transition-all ml-1 -translate-y-1 translate-x-1"/>
                            </a>
                            <p className="text-[9px] text-center font-bold text-gray-500 italic opacity-60">Submitted on {new Date(assignment.submission?.createdAt).toLocaleString()}</p>
                         </div>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
