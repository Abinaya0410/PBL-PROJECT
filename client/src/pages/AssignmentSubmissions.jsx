
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  FileText, 
  User, 
  Mail, 
  Download, 
  CheckCircle, 
  AlertCircle, 
  ChevronLeft, 
  Star, 
  MessageSquare,
  Trophy,
  History,
  Send,
  ExternalLink
} from "lucide-react";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";

export default function AssignmentSubmissions() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gradingId, setGradingId] = useState(null);
  const [score, setScore] = useState("");
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchSubmissions();
  }, [id]);

  const fetchSubmissions = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/assignments/submissions/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSubmissions(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch submissions");
    } finally {
      setLoading(false);
    }
  };

  const handleGrade = async (submissionId) => {
    if (!score || isNaN(score) || score < 0 || score > 100) {
      setError("Please enter a valid numeric score (0-100)");
      return;
    }

    setGradingId(submissionId);
    setError("");
    setMessage("");

    try {
      await axios.put(`http://localhost:5000/api/assignments/grade/${submissionId}`, {
        score: Number(score),
        feedback
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage("✅ Submission graded successfully!");
      setScore("");
      setFeedback("");
      setGradingId(null);
      fetchSubmissions();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Grading failed");
      setGradingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] p-6 md:p-10 lg:p-16">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-12">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-indigo-500 hover:text-indigo-400 mb-8 transition-all font-black uppercase tracking-tighter text-sm"
          >
            <ChevronLeft size={18} />
            Back
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
               <h1 className="text-4xl md:text-5xl font-black tracking-tight flex items-center gap-4">
                Task Reviews
              </h1>
              <p className="text-gray-500 max-w-lg leading-relaxed font-medium">
                Evaluate student project submissions, provide tailored feedback, and assign scientific scores.
              </p>
            </div>
            <div className="bg-amber-500/5 border border-amber-500/20 px-6 py-4 rounded-2xl flex items-center gap-4 shadow-sm">
               <div className="p-3 bg-amber-500 text-white rounded-xl shadow-lg shadow-amber-500/20">
                 <History size={20}/>
               </div>
               <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-amber-600">Total Review Queue</p>
                  <p className="text-sm font-bold">{submissions.length} Students</p>
               </div>
            </div>
          </div>
        </header>

        {/* MESSAGES */}
        {message && (
          <div className="mb-10 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 p-5 rounded-2xl flex items-center gap-4 animate-in fade-in slide-in-from-top-4">
             <CheckCircle size={20} />
             <p className="font-bold">{message}</p>
          </div>
        )}
        {error && (
          <div className="mb-10 bg-rose-500/10 border border-rose-500/20 text-rose-600 p-5 rounded-2xl flex items-center gap-4 animate-in fade-in slide-in-from-top-4">
             <AlertCircle size={20} />
             <p className="font-bold">{error}</p>
          </div>
        )}

        {submissions.length === 0 ? (
          <div className="glass-card p-20 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-[var(--background)] border border-[var(--border)] rounded-3xl flex items-center justify-center mb-6 text-gray-300">
              <User size={40} />
            </div>
            <h3 className="text-xl font-bold mb-2">No attempts yet</h3>
            <p className="text-gray-500">Students have not submitted any work for this task.</p>
          </div>
        ) : (
          <div className="grid gap-8">
            {submissions.map((sub) => (
              <div 
                key={sub._id}
                className="glass-card group overflow-hidden"
              >
                <div className="flex flex-col xl:flex-row divide-y xl:divide-y-0 xl:divide-x divide-[var(--border)]">
                  
                  {/* Student Info Card */}
                  <div className="xl:w-1/3 p-8 lg:p-10 space-y-8 bg-slate-500/5 transition-colors group-hover:bg-slate-500/10">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-3xl flex items-center justify-center font-black text-2xl shadow-xl shadow-indigo-500/20">
                        {sub.student?.name?.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <h2 className="font-black text-[var(--foreground)] text-xl truncate uppercase tracking-tight">{sub.student?.name}</h2>
                        <div className="flex items-center gap-2 text-gray-500 text-xs mt-1 font-bold">
                          <Mail size={12}/>
                          {sub.student?.email}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4">
                      <MetricRow label="Review Status" value={sub.status} high={sub.status === 'graded'} />
                      <MetricRow label="Submitted At" value={new Date(sub.createdAt).toLocaleDateString()} />
                      
                      <div className="pt-6">
                        <a
                          href={`http://localhost:5000/uploads/${sub.submissionUrl.includes('assignments/') ? sub.submissionUrl : 'assignments/' + sub.submissionUrl}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-center gap-3 w-full p-4 primary-btn group/dl"
                        >
                          <Download size={20} className="group-hover/dl:translate-y-0.5 transition-transform" />
                          View Document
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Grading Interface */}
                  <div className="flex-1 p-8 lg:p-10 flex flex-col justify-center">
                    {sub.status === 'graded' && gradingId !== 'EDIT_' + sub._id ? (
                       <div className="space-y-8 animate-in fade-in duration-500">
                         <div className="flex items-center justify-between">
                            <h4 className="font-black text-indigo-500 flex items-center gap-2 uppercase tracking-[0.2em] text-[10px]">
                              Final Assessment Score
                            </h4>
                            {/* Score Chip */}
                            <div className="relative">
                               <div className="absolute inset-0 bg-emerald-500 blur-xl opacity-20"></div>
                               <div className="relative bg-emerald-500/10 text-emerald-600 border-2 border-emerald-500/20 px-6 py-3 rounded-2xl text-4xl font-black italic">
                                {sub.score}<span className="text-sm text-gray-400 not-italic ml-2">/100</span>
                              </div>
                            </div>
                         </div>
                         
                         <div className="p-8 rounded-3xl border border-[var(--border)] bg-[var(--background)] flex gap-5">
                            <MessageSquare className="text-gray-300 shrink-0" size={24}/>
                            <div>
                               <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Professor Remarks</p>
                               <p className="text-[var(--foreground)] font-medium leading-relaxed italic text-lg">
                                 "{sub.feedback || "No remarks provided."}"
                               </p>
                            </div>
                         </div>

                         <button 
                            onClick={() => {
                              setScore(sub.score);
                              setFeedback(sub.feedback || "");
                              setGradingId('EDIT_' + sub._id);
                            }}
                            className="bg-indigo-50 px-6 py-2.5 rounded-xl text-indigo-600 font-black text-[10px] uppercase tracking-widest border border-indigo-200 hover:bg-indigo-100 transition-all self-start"
                         >
                           Recalibrate Grade
                         </button>
                       </div>
                    ) : (
                      <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                        <div className="flex items-center justify-between">
                           <h3 className="text-2xl font-black uppercase tracking-tight">Grade Submission</h3>
                           {gradingId === 'EDIT_' + sub._id && (
                             <button onClick={() => setGradingId(null)} className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:underline px-4">Exit Edit Mode</button>
                           )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                          <div className="space-y-3">
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Score (0-100)</label>
                            <div className="relative group">
                               <input 
                                type="number"
                                min="0"
                                max="100"
                                placeholder="00"
                                value={score}
                                onChange={(e) => setScore(e.target.value)}
                                className="w-full bg-[var(--background)] border-2 border-[var(--border)] rounded-2xl p-5 text-3xl font-black outline-none focus:border-indigo-500 transition-all text-center italic"
                              />
                               <Star className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-200 group-focus-within:text-amber-500 transition-colors" size={24}/>
                            </div>
                          </div>
                   
                          <div className="md:col-span-3 space-y-3">
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Expert Feedback</label>
                            <textarea 
                              rows="3"
                              placeholder="Write constructive, high-quality feedback..."
                              value={feedback}
                              onChange={(e) => setFeedback(e.target.value)}
                              className="w-full bg-[var(--background)] border-2 border-[var(--border)] rounded-2xl p-5 outline-none focus:border-indigo-500 transition-all font-medium leading-relaxed"
                            ></textarea>
                          </div>
                        </div>

                        <button
                          onClick={() => handleGrade(sub._id)}
                          disabled={gradingId === sub._id}
                          className="w-full h-16 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-2xl transition-all font-black tracking-[0.2em] shadow-xl shadow-indigo-500/20 active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                          <Send size={20}/>
                          {gradingId === sub._id ? "PUBLISHING..." : "PUBLISH FINAL GRADE"}
                        </button>
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

function MetricRow({ label, value, high }) {
  return (
    <div className="flex items-center justify-between p-4 bg-[var(--background)] rounded-2xl border border-[var(--border)] shadow-sm">
      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest shrink-0">{label}</span>
      <span className={`text-sm font-black uppercase tracking-tight text-right truncate pl-4 ${
        high ? 'text-emerald-600' : 'text-[var(--foreground)]'
      }`}>
        {value}
      </span>
    </div>
  );
}