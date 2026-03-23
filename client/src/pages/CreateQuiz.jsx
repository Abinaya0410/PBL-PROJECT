
// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// export default function CreateQuiz() {
//   const { courseId } = useParams();

//   const [title, setTitle] = useState("");
//   const [course, setCourse] = useState(null);
//   const [success, setSuccess] = useState(false);

//   const [questions, setQuestions] = useState([
//     {
//       question: "",
//       options: ["", "", "", ""],
//       correctAnswer: ""
//     }
//   ]);

//   useEffect(() => {
//     fetchCourse();
//   }, []);

//   const fetchCourse = async () => {
//     const token = localStorage.getItem("token");

//     const res = await fetch("http://localhost:5000/api/courses/teacher", {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });

//     const data = await res.json();
//     const current = data.find(c => c._id === courseId);
//     setCourse(current);

//     if (current) {
//       setTitle(`${current.title} Final Quiz`);
//     }
//   };

//   const addQuestion = () => {
//     setQuestions([
//       ...questions,
//       { question: "", options: ["", "", "", ""], correctAnswer: "" }
//     ]);
//   };

//   const handleQuestionChange = (index, value) => {
//     const updated = [...questions];
//     updated[index].question = value;
//     setQuestions(updated);
//   };

//   const handleOptionChange = (qIndex, optIndex, value) => {
//     const updated = [...questions];
//     updated[qIndex].options[optIndex] = value;
//     setQuestions(updated);
//   };

//   const handleCorrectAnswer = (index, value) => {
//     const updated = [...questions];
//     updated[index].correctAnswer = value;
//     setQuestions(updated);
//   };

//   const saveQuiz = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       await axios.post(
//         "http://localhost:5000/api/course-quiz",
//         {
//           title,
//           courseId,
//           questions
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       setSuccess(true);
//     } catch (err) {
//       console.log(err.response?.data || err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-10">
      
//       {/* HEADER */}
//       <div className="bg-slate-900/60 backdrop-blur-md p-6 rounded-xl border border-purple-500/20 mb-8 shadow-lg">
//         <h1 className="text-3xl font-bold text-purple-400">
//           Create Quiz for {course?.title || "Course"}
//         </h1>
//         <p className="text-gray-600 dark:text-gray-500 dark:text-gray-400 mt-2">
//           Add questions to build the final assessment for this course.
//         </p>
//       </div>

//       {/* SUCCESS MESSAGE */}
//       {success && (
//         <div className="bg-emerald-600/20 border border-emerald-500 p-4 rounded-lg mb-6">
//           Quiz saved successfully ✔
//         </div>
//       )}

//       {/* QUIZ TITLE */}
//       <input
//         type="text"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         className="w-full mb-8 p-4 rounded-lg bg-slate-800 border border-purple-500/30"
//         placeholder="Quiz Title"
//       />

//       {/* QUESTIONS */}
//       {questions.map((q, index) => (
//         <div key={index} className="mb-8 p-6 bg-slate-900 border border-slate-700 rounded-xl">
          
//           <input
//             type="text"
//             placeholder="Enter Question"
//             value={q.question}
//             onChange={(e) => handleQuestionChange(index, e.target.value)}
//             className="w-full mb-4 p-3 rounded bg-slate-800"
//           />

//           {q.options.map((opt, optIndex) => (
//             <input
//               key={optIndex}
//               type="text"
//               placeholder={`Option ${optIndex + 1}`}
//               value={opt}
//               onChange={(e) =>
//                 handleOptionChange(index, optIndex, e.target.value)
//               }
//               className="w-full mb-2 p-3 rounded bg-slate-800"
//             />
//           ))}

//           <input
//             type="text"
//             placeholder="Correct Answer"
//             value={q.correctAnswer}
//             onChange={(e) => handleCorrectAnswer(index, e.target.value)}
//             className="w-full mt-3 p-3 rounded bg-emerald-700"
//           />
//         </div>
//       ))}

//       {/* ACTION BUTTONS */}
//       <div className="flex gap-4">
//         <button
//           onClick={addQuestion}
//           className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-semibold"
//         >
//           + Add Question
//         </button>

//         <button
//           onClick={saveQuiz}
//           className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-semibold"
//         >
//           Save Quiz
//         </button>
//       </div>
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  CheckCircle, 
  Plus, 
  Edit3, 
  Trash2, 
  ChevronLeft 
} from "lucide-react";

export default function CreateQuiz() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [title, setTitle] = useState("");
  const [course, setCourse] = useState(null);
  const [success, setSuccess] = useState(false);
  const [quizId, setQuizId] = useState(null);

  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], correctAnswer: "" }
  ]);

  const [savedQuestions, setSavedQuestions] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    fetchCourse();
    fetchExistingQuiz();
  }, []);

  // =========================
  // FETCH COURSE INFO
  // =========================
  const fetchCourse = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/courses/teacher", {
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();
    const current = data.find(c => c._id === courseId);
    setCourse(current);

    if (current) {
      setTitle(`${current.title} Final Quiz`);
    }
  };

  // =========================
  // FETCH EXISTING QUIZ
  // =========================
  const fetchExistingQuiz = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:5000/api/course-quiz/${courseId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const data = await res.json();

    if (data) {
      setQuizId(data._id);
      setSavedQuestions(data.questions || []);
    }
  };

  // =========================
  // ADD NEW QUESTION
  // =========================
  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], correctAnswer: "" }
    ]);
  };

  const handleQuestionChange = (index, value) => {
    const updated = [...questions];
    updated[index].question = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const handleCorrectAnswer = (index, value) => {
    const updated = [...questions];
    updated[index].correctAnswer = value;
    setQuestions(updated);
  };

  // =========================
  // SAVE QUIZ
  // =========================
  const saveQuiz = async () => {
    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/course-quiz",
      { title, courseId, questions },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setSuccess(true);
    fetchExistingQuiz();
  };

  // =========================
  // DELETE QUESTION
  // =========================
  const deleteQuestion = async (index) => {
    const token = localStorage.getItem("token");

    await fetch(
      `http://localhost:5000/api/course-quiz/${quizId}/question/${index}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    fetchExistingQuiz();
  };

  // =========================
  // EDIT QUESTION
  // =========================
  const saveEdit = async (index) => {
    const token = localStorage.getItem("token");
    const q = savedQuestions[index];

    await fetch(
      `http://localhost:5000/api/course-quiz/${quizId}/question/${index}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(q)
      }
    );

    setEditIndex(null);
    fetchExistingQuiz();
  };

  const updateSavedQuestion = (qIndex, field, value) => {
    const updated = [...savedQuestions];
    updated[qIndex][field] = value;
    setSavedQuestions(updated);
  };

  const updateSavedOption = (qIndex, optIndex, value) => {
    const updated = [...savedQuestions];
    updated[qIndex].options[optIndex] = value;
    setSavedQuestions(updated);
  };

  return (
    <div className="p-8 lg:p-12 space-y-12">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* HEADER */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
                Create Quiz: {course?.title}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium italic">
                Add questions to create an assessment for your students.
              </p>
            </div>
            <button 
              onClick={() => navigate(`/teacher/course/${courseId}`)}
              className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-indigo-500 rounded-2xl transition-all"
            >
              <ChevronLeft size={24} />
            </button>
          </div>
        </div>

        {success && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 p-6 rounded-3xl flex items-center gap-4 animate-pulse shadow-lg shadow-emerald-500/5">
            <CheckCircle size={20} />
            <p className="font-black uppercase tracking-widest text-sm text-center w-full">Assessment Synchronized Successfully ✓</p>
          </div>
        )}

        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-2">Quiz Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-black text-xl shadow-xl"
            placeholder="e.g. Quantum Mechanics Master Quiz"
          />
        </div>

        {/* NEW QUESTIONS */}
        {questions.length > 0 && (
          <div className="space-y-8">
            <div className="flex items-center gap-4">
               <div className="h-[1px] flex-1 bg-slate-200 dark:bg-slate-800"></div>
               <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">New Questions</h2>
               <div className="h-[1px] flex-1 bg-slate-200 dark:bg-slate-800"></div>
            </div>

            {questions.map((q, index) => (
              <div key={index} className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 p-8 rounded-[2rem] shadow-xl hover:border-indigo-500/30 transition-all space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-indigo-500 text-white rounded-xl flex items-center justify-center font-black">
                    {index + 1}
                  </div>
                  <input
                    placeholder="Enter Question"
                    value={q.question}
                    onChange={(e) => handleQuestionChange(index, e.target.value)}
                    className="flex-1 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-black"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {q.options.map((opt, i) => (
                    <div key={i} className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-500 dark:text-slate-400">{String.fromCharCode(65 + i)}</span>
                      <input
                        value={opt}
                        onChange={(e) => handleOptionChange(index, i, e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium"
                        placeholder={`Option ${i + 1}`}
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-emerald-500 ml-2">Correct Answer</label>
                  <input
                    placeholder="Correct Answer"
                    value={q.correctAnswer}
                    onChange={(e) => handleCorrectAnswer(index, e.target.value)}
                    className="w-full p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-emerald-500 focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-black"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={addQuestion}
            className="flex-1 flex items-center justify-center gap-2 bg-indigo-500 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] transition-all shadow-xl shadow-indigo-500/20"
          >
            <Plus size={16}/> Add Question
          </button>
          <button
            onClick={saveQuiz}
            className="flex-1 flex items-center justify-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] transition-all shadow-xl"
          >
            Save Quiz
          </button>
        </div>

        {/* SAVED QUESTIONS */}
        {savedQuestions.length > 0 && (
          <div className="space-y-10 pt-10">
            <div className="flex items-center gap-4">
               <div className="h-[1px] flex-1 bg-slate-200 dark:bg-slate-800"></div>
               <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500">Saved Questions</h2>
               <div className="h-[1px] flex-1 bg-slate-200 dark:bg-slate-800"></div>
            </div>

            <div className="space-y-6">
              {savedQuestions.map((q, index) => (
                <div key={index} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2rem] shadow-lg relative overflow-hidden group">
                  {editIndex === index ? (
                    <div className="space-y-6">
                      <input
                        value={q.question}
                        onChange={(e) => updateSavedQuestion(index, "question", e.target.value)}
                        className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-black text-lg"
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {q.options.map((opt, i) => (
                          <input
                            key={i}
                            value={opt}
                            onChange={(e) => updateSavedOption(index, i, e.target.value)}
                            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm font-medium"
                          />
                        ))}
                      </div>
                      <input
                        value={q.correctAnswer}
                        onChange={(e) => updateSavedQuestion(index, "correctAnswer", e.target.value)}
                        className="w-full p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-emerald-500 focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-black"
                      />
                      <div className="flex gap-4">
                        <button onClick={() => saveEdit(index)} className="flex-1 bg-emerald-500 text-white py-3 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-emerald-500/20">Sync Changes</button>
                        <button onClick={() => setEditIndex(null)} className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 py-3 rounded-xl font-black uppercase tracking-widest text-[10px]">Abort</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col md:flex-row justify-between gap-8">
                      <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500">Question {index + 1}</span>
                          <div className="h-1 w-1 bg-slate-300 rounded-full"></div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Live State</span>
                        </div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight uppercase tracking-tight">{q.question}</h3>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                          {q.options.map((opt, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{opt}</span>
                            </div>
                          ))}
                        </div>
                        <div className="pt-2">
                           <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-500/5 px-3 py-1 rounded-lg border border-emerald-500/10">Correct Answer: {q.correctAnswer}</span>
                        </div>
                      </div>
                      <div className="flex md:flex-col gap-2 shrink-0">
                        <button onClick={() => setEditIndex(index)} className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-indigo-500 rounded-2xl transition-all border border-slate-100 dark:border-slate-800">
                          <Edit3 size={18}/>
                        </button>
                        <button onClick={() => deleteQuestion(index)} className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-rose-500 rounded-2xl transition-all border border-slate-100 dark:border-slate-800">
                          <Trash2 size={18}/>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
