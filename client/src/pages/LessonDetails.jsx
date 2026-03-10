
// // import { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";

// // export default function LessonDetails() {
// //   const { lessonId } = useParams();

// //   const [lesson, setLesson] = useState(null);
// //   const [questions, setQuestions] = useState([]);
// //   const [completed, setCompleted] = useState(false);
// //   const role = localStorage.getItem("role"); // 👈 role check

// //   useEffect(() => {
// //     if (lessonId) {
// //       fetchLesson();
// //       fetchQuestions();
// //       if (role === "student") {
// //         checkProgress(); // only students need progress
// //       }
// //     }
// //   }, [lessonId, role]);

// //   // =========================
// //   // FETCH LESSON
// //   // =========================
// //   const fetchLesson = async () => {
// //     try {
// //       const token = localStorage.getItem("token");

// //       const res = await fetch(
// //         `http://localhost:5000/api/lessons/${lessonId}`,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );

// //       const data = await res.json();
// //       setLesson(data);
// //     } catch (err) {
// //       console.log(err);
// //     }
// //   };

// //   // =========================
// //   // FETCH QUESTIONS
// //   // =========================
// //   const fetchQuestions = async () => {
// //     try {
// //       const token = localStorage.getItem("token");

// //       const res = await fetch(
// //         `http://localhost:5000/api/lessons/${lessonId}/question-bank`,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );

// //       const data = await res.json();
// //       setQuestions(Array.isArray(data) ? data : []);
// //     } catch (err) {
// //       console.log(err);
// //       setQuestions([]);
// //     }
// //   };

// //   // =========================
// //   // CHECK PROGRESS (Student only)
// //   // =========================
// //   const checkProgress = async () => {
// //     try {
// //       const token = localStorage.getItem("token");

// //       const res = await fetch(
// //         `http://localhost:5000/api/lessons/${lessonId}/progress`,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );

// //       const data = await res.json();
// //       if (data?.completed) {
// //         setCompleted(true);
// //       }
// //     } catch (err) {
// //       console.log(err);
// //     }
// //   };

// //   // =========================
// //   // MARK AS COMPLETED (Student only)
// //   // =========================
// //   const markCompleted = async () => {
// //     try {
// //       const token = localStorage.getItem("token");

// //       await fetch(
// //         `http://localhost:5000/api/lessons/${lessonId}/complete`,
// //         {
// //           method: "POST",
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );

// //       setCompleted(true);
// //     } catch (err) {
// //       console.log(err);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-slate-950 text-white p-10">
// //       <div className="max-w-5xl mx-auto">

// //         {/* LESSON CONTENT */}
// //         <div className="bg-slate-900 p-8 rounded-xl border border-cyan-500/20 mb-10">
// //           <h2 className="text-3xl font-bold text-cyan-400 mb-4">
// //             {lesson?.title}
// //           </h2>

// //           <p className="text-gray-300 mb-4">
// //             {lesson?.description}
// //           </p>

// //           {lesson?.textContent && (
// //             <div className="mb-4">
// //               <h3 className="text-xl text-cyan-300 mb-2">Text Content</h3>
// //               <p className="text-gray-400">{lesson.textContent}</p>
// //             </div>
// //           )}

// //           {lesson?.videoUrl && (
// //             <div>
// //               <h3 className="text-xl text-cyan-300 mb-2">Video URL</h3>
// //               <a
// //                 href={lesson.videoUrl}
// //                 target="_blank"
// //                 rel="noreferrer"
// //                 className="text-blue-400 underline"
// //               >
// //                 Watch Video
// //               </a>
// //             </div>
// //           )}

// //           {/* COMPLETE BUTTON — ONLY FOR STUDENTS */}
// //           {role === "student" && (
// //             <div className="mt-6">
// //               {completed ? (
// //                 <span className="bg-emerald-600 px-4 py-2 rounded-lg">
// //                   Completed ✔
// //                 </span>
// //               ) : (
// //                 <button
// //                   onClick={markCompleted}
// //                   className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded-lg"
// //                 >
// //                   Mark as Completed
// //                 </button>
// //               )}
// //             </div>
// //           )}
// //         </div>

// //         {/* QUESTIONS SECTION */}
// //         <div>
// //           <h2 className="text-2xl font-bold text-purple-400 mb-6">
// //             Practice Questions
// //           </h2>

// //           {questions.length === 0 ? (
// //             <p className="text-gray-400">No questions added yet.</p>
// //           ) : (
// //             <div className="grid gap-6">
// //               {questions.map((q, index) => (
// //                 <div
// //                   key={q._id}
// //                   className="bg-slate-900 p-6 rounded-xl border border-purple-500/20"
// //                 >
// //                   <h3 className="text-lg font-semibold mb-3">
// //                     Q{index + 1}. {q.question}
// //                   </h3>

// //                   <ul className="text-gray-400 space-y-1">
// //                     {q.options?.map((opt, i) => (
// //                       <li key={i}>
// //                         {String.fromCharCode(65 + i)}. {opt}
// //                       </li>
// //                     ))}
// //                   </ul>

// //                   <p className="mt-3 text-emerald-400">
// //                     Correct: {q.correctAnswer}
// //                   </p>
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </div>

// //       </div>
// //     </div>
// //   );
// // }


// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// export default function LessonDetails() {
//   const { lessonId } = useParams();

//   const [lesson, setLesson] = useState(null);
//   const [questions, setQuestions] = useState([]);
//   const [completed, setCompleted] = useState(false);
//   const [selectedAnswers, setSelectedAnswers] = useState({});

//   const role = localStorage.getItem("role");

//   useEffect(() => {
//     if (lessonId) {
//       fetchLesson();
//       fetchQuestions();
//       if (role === "student") checkProgress();
//     }
//   }, [lessonId]);

//   // FETCH LESSON
//   const fetchLesson = async () => {
//     const token = localStorage.getItem("token");

//     const res = await fetch(
//       `http://localhost:5000/api/lessons/${lessonId}`,
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );

//     const data = await res.json();
//     setLesson(data);
//   };

//   // FETCH QUESTIONS
//   const fetchQuestions = async () => {
//     const token = localStorage.getItem("token");

//     const res = await fetch(
//       `http://localhost:5000/api/lessons/${lessonId}/question-bank`,
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );

//     const data = await res.json();
//     setQuestions(Array.isArray(data) ? data : []);
//   };

//   // CHECK PROGRESS
//   const checkProgress = async () => {
//     const token = localStorage.getItem("token");

//     const res = await fetch(
//       `http://localhost:5000/api/lessons/${lessonId}/progress`,
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );

//     const data = await res.json();
//     if (data?.completed) setCompleted(true);
//   };

//   // MARK COMPLETED
//   const markCompleted = async () => {
//     const token = localStorage.getItem("token");

//     await fetch(
//       `http://localhost:5000/api/lessons/${lessonId}/complete`,
//       {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );

//     setCompleted(true);
//   };

//   // STUDENT ANSWER CLICK
//   const handleAnswerClick = (qId, option, correct) => {
//     setSelectedAnswers({
//       ...selectedAnswers,
//       [qId]: { selected: option, correct },
//     });
//   };

//   // DELETE QUESTION (Teacher)
//   const deleteQuestion = async (questionId) => {
//     const token = localStorage.getItem("token");

//     await fetch(
//       `http://localhost:5000/api/question-bank/${questionId}`,
//       {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );

//     setQuestions(questions.filter((q) => q._id !== questionId));
//   };

//   return (
//     <div className="min-h-screen bg-slate-950 text-white p-10">
//       <div className="max-w-5xl mx-auto">

//         {/* LESSON CONTENT */}
//         <div className="bg-slate-900 p-8 rounded-xl border border-cyan-500/20 mb-10">
//           <h2 className="text-3xl font-bold text-cyan-400 mb-4">
//             {lesson?.title}
//           </h2>

//           <p className="text-gray-300 mb-4">
//             {lesson?.description}
//           </p>

//           {lesson?.textContent && (
//             <p className="text-gray-400 mb-4">{lesson.textContent}</p>
//           )}

//           {/* STUDENT COMPLETE BUTTON */}
//           {role === "student" && (
//             <div className="mt-6">
//               {completed ? (
//                 <span className="bg-emerald-600 px-4 py-2 rounded-lg">
//                   Completed ✔
//                 </span>
//               ) : (
//                 <button
//                   onClick={markCompleted}
//                   className="bg-indigo-600 px-5 py-2 rounded-lg"
//                 >
//                   Mark as Completed
//                 </button>
//               )}
//             </div>
//           )}
//         </div>

//         {/* PRACTICE QUESTIONS */}
//         <h2 className="text-2xl font-bold text-purple-400 mb-6">
//           Practice Questions
//         </h2>

//         {questions.length === 0 ? (
//           <p className="text-gray-400">No questions added yet.</p>
//         ) : (
//           <div className="grid gap-6">
//             {questions.map((q, index) => (
//               <div
//                 key={q._id}
//                 className="bg-slate-900 p-6 rounded-xl border border-purple-500/20"
//               >
//                 <h3 className="text-lg font-semibold mb-4">
//                   Q{index + 1}. {q.question}
//                 </h3>

//                 {q.options.map((opt, i) => {
//                   const selected = selectedAnswers[q._id]?.selected;
//                   const isCorrect = q.correctAnswer === opt;
//                   const isChosen = selected === opt;

//                   let style = "bg-slate-700";

//                   if (role === "student" && isChosen) {
//                     style = isCorrect
//                       ? "bg-green-600"
//                       : "bg-red-600";
//                   }
//                   {/* SHOW CORRECT ANSWER ONLY FOR TEACHER */}
// {role === "teacher" && (
//   <p className="mt-3 text-emerald-400 font-semibold">
//     Correct Answer: {q.correctAnswer}
//   </p>
// )}

//                   return (
//                     <button
//                       key={i}
//                       onClick={() =>
//                         role === "student" &&
//                         handleAnswerClick(q._id, opt, isCorrect)
//                       }
//                       className={`block w-full text-left px-4 py-2 mb-2 rounded ${style}`}
//                     >
//                       {String.fromCharCode(65 + i)}. {opt}
//                     </button>
//                   );
//                 })}

//                 {/* TEACHER BUTTONS */}
//                 {role === "teacher" && (
//                   <div className="flex gap-4 mt-4">
//                     <button
//                       className="bg-yellow-500 px-4 py-1 rounded"
//                     >
//                       Edit
//                     </button>

//                     <button
//                       onClick={() => deleteQuestion(q._id)}
//                       className="bg-red-600 px-4 py-1 rounded"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function LessonDetails() {
  const { lessonId } = useParams();
  const navigate = useNavigate();

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
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:5000/api/lessons/${lessonId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const data = await res.json();
    setLesson(data);
  };

  const fetchQuestions = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:5000/api/lessons/${lessonId}/question-bank`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const data = await res.json();
    setQuestions(Array.isArray(data) ? data : []);
  };

  const checkProgress = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:5000/api/lessons/${lessonId}/progress`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const data = await res.json();
    if (data?.completed) setCompleted(true);
  };

  const markCompleted = async () => {
    const token = localStorage.getItem("token");

    await fetch(
      `http://localhost:5000/api/lessons/${lessonId}/complete`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setCompleted(true);
  };

  const handleAnswerClick = (qId, option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [qId]: option,
    });
  };

  const deleteQuestion = async (questionId) => {
    const token = localStorage.getItem("token");

    await fetch(
      `http://localhost:5000/api/question-bank/${questionId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setQuestions(questions.filter((q) => q._id !== questionId));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <div className="max-w-5xl mx-auto">

        <div className="bg-slate-900 p-8 rounded-xl border border-cyan-500/20 mb-10">
          <h2 className="text-3xl font-bold text-cyan-400 mb-4">
            {lesson?.title}
          </h2>

          <p className="text-gray-300 mb-4">
            {lesson?.description}
          </p>

          {lesson?.textContent && (
            <p className="text-gray-400 mb-4">{lesson.textContent}</p>
          )}

          {role === "student" && (
            <div className="mt-6">
              {completed ? (
                <span className="bg-emerald-600 px-4 py-2 rounded-lg">
                  Completed ✔
                </span>
              ) : (
                <button
                  onClick={markCompleted}
                  className="bg-indigo-600 px-5 py-2 rounded-lg"
                >
                  Mark as Completed
                </button>
              )}
            </div>
          )}
        </div>

        <h2 className="text-2xl font-bold text-purple-400 mb-6">
          Practice Questions
        </h2>

        {questions.map((q, index) => (
          <div
            key={q._id}
            className="bg-slate-900 p-6 rounded-xl border border-purple-500/20 mb-6"
          >
            <h3 className="text-lg font-semibold mb-4">
              Q{index + 1}. {q.question}
            </h3>

            {q.options.map((opt, i) => {
              const selected = selectedAnswers[q._id];
              const isCorrect = q.correctAnswer === opt;
              const isChosen = selected === opt;

              let style = "bg-slate-700";

              if (role === "student" && isChosen) {
                style = isCorrect ? "bg-green-600" : "bg-red-600";
              }

              return (
                <button
                  key={i}
                  onClick={() =>
                    role === "student" && handleAnswerClick(q._id, opt)
                  }
                  className={`block w-full text-left px-4 py-2 mb-2 rounded ${style}`}
                >
                  {String.fromCharCode(65 + i)}. {opt}
                </button>
              );
            })}

            {/* TEACHER: SHOW CORRECT ANSWER */}
            {role === "teacher" && (
              <p className="mt-3 text-emerald-400 font-semibold">
                Correct Answer: {q.correctAnswer}
              </p>
            )}

            {/* TEACHER ACTIONS */}
            {role === "teacher" && (
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => navigate(`/edit-question/${q._id}`)}
                  className="bg-yellow-500 px-4 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteQuestion(q._id)}
                  className="bg-red-600 px-4 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
