
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  CheckCircle, 
  ChevronLeft, 
  BookOpen, 
  Play, 
  FileText, 
  Trash2, 
  Edit3,
  HelpCircle,
  HelpCircle as QuestionIcon,
  Video
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function LessonDetails() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const [lesson, setLesson] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const role = localStorage.getItem("role");

  useEffect(() => {
    if (lessonId) {
      fetchLesson();
      fetchQuestions();
      if (role === "student") checkProgress();
    }
  }, [lessonId]);

  const fetchLesson = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/lessons/${lessonId}`, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      const data = await res.json();
      setLesson(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchQuestions = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/lessons/${lessonId}/question-bank`, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      const data = await res.json();
      setQuestions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const checkProgress = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/lessons/${lessonId}/progress`, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      const data = await res.json();
      if (data?.completed) setCompleted(true);
    } catch (err) {
      console.error(err);
    }
  };

  const markCompleted = async () => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:5000/api/lessons/${lessonId}/complete`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      setCompleted(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAnswerClick = (qId, option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [qId]: option,
    });
  };

  const deleteQuestion = async (questionId) => {
    if (!window.confirm("Are you sure you want to delete this question?")) return;
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:5000/api/question-bank/${questionId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuestions(questions.filter((q) => q._id !== questionId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] p-6 md:p-10 lg:p-16">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Navigation */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-primary hover:translate-x-1 transition-all font-black uppercase tracking-widest text-[10px]"
        >
          <ChevronLeft size={16} />
          Back to Module
        </button>

        {/* LESSON CONTENT */}
        <div className="glass-card overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-primary to-accent"></div>
          <div className="p-8 md:p-12 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20">Learning Unit</span>
                 {completed && (
                   <span className="flex items-center gap-1.5 text-emerald-500 font-black text-[10px] uppercase tracking-widest px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                     <CheckCircle size={12} /> Mastery Achieved
                   </span>
                 )}
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none uppercase">
                {lesson?.title}
              </h2>
              <p className="text-xl text-[var(--secondary)] font-medium leading-relaxed italic opacity-80">
                {lesson?.description}
              </p>
            </div>

            {lesson?.textContent && (
              <div className="space-y-4 p-8 bg-[var(--background)] border border-[var(--border)] rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                   <FileText size={80} />
                </div>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Transcript & Notes</h3>
                <p className="text-[var(--foreground)] leading-loose font-medium relative z-10">{lesson.textContent}</p>
              </div>
            )}

            {lesson?.videoUrl && (
              <div className="space-y-4 pt-4 border-t border-[var(--border)]">
                 <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                   <Video size={16}/> Cinematic Resource
                 </h3>
                 <a
                  href={lesson.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-4 bg-[var(--background)] border border-primary/30 rounded-2xl group hover:border-primary transition-all shadow-lg shadow-primary/5 font-black text-sm text-[var(--foreground)]"
                >
                  <div className="p-2 bg-primary text-white rounded-lg shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                     <Play size={18} fill="white"/>
                  </div>
                  Watch Masterclass Session
                </a>
              </div>
            )}

            {/* STUDENT COMPLETE BUTTON */}
            {role === "student" && !completed && (
              <div className="pt-8 flex justify-center border-t border-[var(--border)]">
                <button
                  onClick={markCompleted}
                  className="primary-btn flex items-center gap-3 px-10 py-5 text-lg"
                >
                  <CheckCircle size={24} />
                  Validate Completion
                </button>
              </div>
            )}
          </div>
        </div>

        {/* PRACTICE QUESTIONS */}
        <div className="space-y-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black flex items-center gap-4 uppercase tracking-tight">
              <div className="w-12 h-12 bg-accent text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-accent/30">
                <HelpCircle size={24}/>
              </div>
              Knowledge Assessment
            </h2>
            <span className="text-[10px] font-black uppercase tracking-widest text-[var(--secondary)] bg-[var(--card)] px-3 py-1 rounded-full border border-[var(--border)]">{questions.length} Concepts</span>
          </div>

          {questions.length === 0 ? (
            <div className="glass-card p-16 text-center border-dashed border-2">
               <QuestionIcon className="mx-auto text-gray-300 mb-4" size={48}/>
               <p className="text-sm font-black text-[var(--secondary)] uppercase tracking-widest italic leading-none mb-1">Assessment Pending</p>
               <p className="text-xs text-gray-400 font-medium">Practice queries will appear here once published.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {questions.map((q, index) => (
                <div
                  key={q._id}
                  className="glass-card p-8 md:p-10 space-y-8 group transition-all duration-500 overflow-hidden relative"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                     <QuestionIcon size={120} className="text-accent" />
                  </div>
                  
                  <div className="space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Query 0{index + 1}</span>
                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight leading-tight">
                      {q.question}
                    </h3>
                  </div>

                  <div className="grid gap-3 relative z-10">
                    {q.options.map((opt, i) => {
                      const selected = selectedAnswers[q._id];
                      const isCorrect = q.correctAnswer === opt;
                      const isChosen = selected === opt;

                      let buttonClasses = "border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:border-accent hover:bg-accent/5";
                      let indicator = null;

                      if (role === "student" && isChosen) {
                        buttonClasses = isCorrect 
                          ? "border-emerald-500 bg-emerald-500/10 text-emerald-600" 
                          : "border-rose-500 bg-rose-500/10 text-rose-600";
                        indicator = isCorrect ? "✔ Correct" : "✖ Incorrect";
                      }

                      return (
                        <button
                          key={i}
                          disabled={role !== "student" || !!selected}
                          onClick={() => handleAnswerClick(q._id, opt)}
                          className={`group/opt flex items-center justify-between w-full text-left px-6 py-4 rounded-2xl border transition-all font-bold ${buttonClasses}`}
                        >
                          <div className="flex items-center gap-4">
                            <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-[var(--background)] border border-[var(--border)] text-xs font-black group-hover/opt:bg-accent group-hover/opt:text-white group-hover/opt:border-accent transition-all">
                               {String.fromCharCode(65 + i)}
                            </span>
                            {opt}
                          </div>
                          {indicator && <span className="text-[10px] font-black uppercase tracking-widest">{indicator}</span>}
                        </button>
                      );
                    })}
                  </div>

                  {/* TEACHER: SHOW CORRECT ANSWER */}
                  {role === "teacher" && (
                    <div className="pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-6">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                            <CheckCircle size={14}/>
                         </div>
                         <p className="text-sm font-black uppercase tracking-widest text-emerald-600">
                           Key: <span className="ml-1 opacity-80">{q.correctAnswer}</span>
                         </p>
                      </div>

                      <div className="flex gap-4">
                        <button
                          onClick={() => navigate(`/edit-question/${q._id}`)}
                          className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 text-amber-600 border border-amber-500/20 rounded-xl font-black text-[10px] tracking-widest uppercase hover:bg-amber-500 hover:text-white transition-all shadow-lg shadow-amber-500/10"
                        >
                          <Edit3 size={14}/> Refactor
                        </button>

                        <button
                          onClick={() => deleteQuestion(q._id)}
                          className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 text-rose-600 border border-rose-500/20 rounded-xl font-black text-[10px] tracking-widest uppercase hover:bg-rose-500 hover:text-white transition-all shadow-lg shadow-rose-500/10"
                        >
                          <Trash2 size={14}/> Eradicate
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
