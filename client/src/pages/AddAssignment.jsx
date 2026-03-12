
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  Plus, 
  ChevronLeft, 
  FileText, 
  Calendar, 
  AlignLeft, 
  Upload, 
  CheckCircle, 
  AlertCircle,
  Clock,
  Layout
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function AddAssignment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [pdf, setPdf] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("dueDate", dueDate);
      formData.append("course", id);

      if (pdf) {
        formData.append("pdf", pdf);
      }

      const res = await fetch("http://localhost:5000/api/assignments", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      let data;
      const text = await res.text();
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Server returned an unexpected response");
      }

      if (!res.ok) {
        throw new Error(data.message || "Failed to create assignment");
      }

      setMessage("✅ Assignment published successfully");

      setTimeout(() => {
        navigate(`/course/${id}`);
      }, 1200);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] p-6 md:p-10 lg:p-16 flex items-center justify-center">
      
      <div className="w-full max-w-2xl animate-in zoom-in-95 duration-500">
        
        {/* Navigation */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-emerald-600 hover:text-emerald-500 mb-8 transition-all font-black uppercase tracking-tighter text-sm"
        >
          <ChevronLeft size={18} />
          Cancel and Return
        </button>

        <div className="glass-card overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-10 text-white relative">
             <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/20 mb-6 font-bold shadow-lg">
                  <Plus size={32}/>
                </div>
                <h1 className="text-4xl font-black tracking-tight mb-2 uppercase">Publish Task</h1>
                <p className="text-white/70 font-medium">Create a new assignment and notify all enrolled students.</p>
             </div>
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          </div>

          <div className="p-10 space-y-8">
            {message && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 p-5 rounded-2xl flex items-center gap-4 animate-in slide-in-from-left-4">
                <CheckCircle size={20} />
                <p className="font-bold">{message}</p>
              </div>
            )}

            {error && (
              <div className="bg-rose-500/10 border border-rose-500/20 text-rose-600 p-5 rounded-2xl flex items-center gap-4 animate-in slide-in-from-left-4">
                <AlertCircle size={20} />
                <p className="font-bold">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Title Section */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">
                  <FileText size={14}/> 
                  Assignment Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Introduction to Cloud Systems"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[var(--background)] p-5 rounded-2xl border-2 border-[var(--border)] focus:border-emerald-500 outline-none transition-all font-bold text-lg"
                />
              </div>

              {/* Description Section */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">
                  <AlignLeft size={14}/> 
                  Task Description
                </label>
                <textarea
                  required
                  rows="4"
                  placeholder="Detailed instructions for students..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[var(--background)] p-5 rounded-2xl border-2 border-[var(--border)] focus:border-emerald-500 outline-none transition-all font-medium leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Due Date Section */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">
                    <Calendar size={14}/> 
                    Submission Deadline
                  </label>
                  <input
                    type="date"
                    required
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full bg-[var(--background)] p-5 rounded-2xl border-2 border-[var(--border)] focus:border-emerald-500 outline-none transition-all font-bold"
                  />
                </div>

                {/* File Upload Section */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">
                    <Upload size={14}/> 
                    Task Resource (PDF)
                  </label>
                  <div className="relative group">
                    <input
                      type="file"
                      accept="application/pdf"
                      required
                      onChange={(e) => setPdf(e.target.files[0])}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                    <div className="w-full bg-[var(--background)] p-5 rounded-2xl border-2 border-dashed border-[var(--border)] group-hover:border-emerald-500 transition-all flex items-center gap-4 min-h-[72px]">
                       <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-emerald-600">
                          <FileText size={18}/>
                       </div>
                       <p className="text-xs font-bold text-gray-500 truncate italic">
                         {pdf ? pdf.name : "Choose PDF file..."}
                       </p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-16 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-2xl transition-all font-black tracking-[0.2em] shadow-xl shadow-emerald-500/20 active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    PUBLISHING...
                  </div>
                ) : (
                  <>
                    <Layout size={20}/>
                    PUBLISH ASSIGNMENT
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <p className="text-center text-gray-500 text-[10px] mt-8 font-bold uppercase tracking-widest">
          Secure Educational Portal • Virtual Academic Intelligence Hub
        </p>
      </div>

    </div>
  );
}