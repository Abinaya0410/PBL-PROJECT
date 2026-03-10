// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// export default function StudentLessonView() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [completed, setCompleted] = useState(false);
//   const [answers, setAnswers] = useState({});

//   // Dummy lesson data (later from backend)
//   const lesson = {
//     title: "Introduction",
//     description: "Course overview",
//     content:
//       "This lesson explains the fundamentals of the topic. Carefully read the explanation and watch the video.",
//     youtube: "https://www.youtube.com/embed/dQw4w9WgXcQ"
//   };

//   // Dummy lesson question bank
//   const questions = [
//     {
//       _id: "q1",
//       question: "What is Java?",
//       options: ["Language", "Animal", "Car", "Game"],
//       correct: "Language"
//     },
//     {
//       _id: "q2",
//       question: "Which company created Java?",
//       options: ["Microsoft", "Sun Microsystems", "Google", "Apple"],
//       correct: "Sun Microsystems"
//     }
//   ];

//   const markCompleted = () => {
//     setCompleted(true);
//      const stored = JSON.parse(localStorage.getItem("completedLessons")) || [];

//   if (!stored.includes(id)) {
//     stored.push(id);
//     localStorage.setItem("completedLessons", JSON.stringify(stored));
//   }
//   };

//   const selectAnswer = (qid, option) => {
//     setAnswers({ ...answers, [qid]: option });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white p-10">

//       {/* HEADER */}
//       <div className="bg-slate-900/60 p-6 rounded-xl border border-indigo-500/20 mb-8">
//         <h1 className="text-3xl font-bold text-indigo-400">
//           {lesson.title}
//         </h1>
//         <p className="text-gray-400 mt-2">{lesson.description}</p>
//       </div>

//       {/* TEXT CONTENT */}
//       <div className="bg-slate-800 p-6 rounded-xl mb-8">
//         <h2 className="text-xl font-semibold mb-3 text-indigo-300">
//           Lesson Content
//         </h2>
//         <p className="text-gray-300 leading-relaxed">
//           {lesson.content}
//         </p>
//       </div>

//       {/* VIDEO */}
//       <div className="bg-slate-800 p-6 rounded-xl mb-8">
//         <h2 className="text-xl font-semibold mb-3 text-indigo-300">
//           Video Explanation
//         </h2>

//         <iframe
//           width="100%"
//           height="400"
//           src={lesson.youtube}
//           title="Lesson Video"
//           className="rounded-lg"
//           allowFullScreen
//         ></iframe>
//       </div>

//       {/* COMPLETE BUTTON */}
//       {!completed && (
//         <div className="text-center mb-10">
//           <button
//             onClick={markCompleted}
//             className="px-8 py-3 bg-emerald-600 rounded-lg hover:bg-emerald-500"
//           >
//             Mark Lesson as Completed
//           </button>
//         </div>
//       )}

//       {/* QUESTION PRACTICE */}
//       {completed && (
//         <div className="bg-slate-900 p-8 rounded-xl border border-purple-500/30">
//           <h2 className="text-2xl font-bold mb-6 text-purple-300">
//             Practice Questions
//           </h2>

//           {questions.map((q) => (
//             <div key={q._id} className="mb-8">
//               <h3 className="font-semibold mb-4">{q.question}</h3>

//               <div className="grid grid-cols-2 gap-3">
//                 {q.options.map((opt) => {
//                   const selected = answers[q._id];
//                   const isCorrect = opt === q.correct;
//                   const isSelected = selected === opt;

//                   let style = "bg-slate-800";

//                   if (isSelected && isCorrect) style = "bg-green-600";
//                   else if (isSelected && !isCorrect) style = "bg-red-600";

//                   return (
//                     <button
//                       key={opt}
//                       onClick={() => selectAnswer(q._id, opt)}
//                       className={`${style} px-4 py-2 rounded-lg`}
//                     >
//                       {opt}
//                     </button>
//                   );
//                 })}
//               </div>

//               {answers[q._id] && answers[q._id] !== q.correct && (
//                 <p className="text-green-400 mt-3">
//                   Correct Answer: {q.correct}
//                 </p>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function StudentLessonView() {
  const { id } = useParams();

  const [completed, setCompleted] = useState(false);
  const [answers, setAnswers] = useState({});

  // Restore completion state after refresh
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("completedLessons")) || [];
    if (stored.includes(id)) {
      setCompleted(true);
    }
  }, [id]);

  // Dummy lesson data
  const lesson = {
    title: "Introduction",
    description: "Course overview",
    content:
      "This lesson explains the fundamentals of the topic. Carefully read the explanation and watch the video.",
    youtube: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  };

  const questions = [
    {
      _id: "q1",
      question: "What is Java?",
      options: ["Language", "Animal", "Car", "Game"],
      correct: "Language"
    },
    {
      _id: "q2",
      question: "Which company created Java?",
      options: ["Microsoft", "Sun Microsystems", "Google", "Apple"],
      correct: "Sun Microsystems"
    }
  ];

  const markCompleted = () => {
    setCompleted(true);

    const stored = JSON.parse(localStorage.getItem("completedLessons")) || [];

    if (!stored.includes(id)) {
      stored.push(id);
      localStorage.setItem("completedLessons", JSON.stringify(stored));
    }
  };

  const selectAnswer = (qid, option) => {
    setAnswers({ ...answers, [qid]: option });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white p-10">

      {/* HEADER */}
      <div className="bg-slate-900/60 p-6 rounded-xl border border-indigo-500/20 mb-8">
        <h1 className="text-3xl font-bold text-indigo-400">
          {lesson.title}
        </h1>
        <p className="text-gray-400 mt-2">{lesson.description}</p>
      </div>

      {/* CONTENT */}
      <div className="bg-slate-800 p-6 rounded-xl mb-8">
        <h2 className="text-xl font-semibold mb-3 text-indigo-300">
          Lesson Content
        </h2>
        <p className="text-gray-300 leading-relaxed">
          {lesson.content}
        </p>
      </div>

      {/* VIDEO */}
      <div className="bg-slate-800 p-6 rounded-xl mb-8">
        <h2 className="text-xl font-semibold mb-3 text-indigo-300">
          Video Explanation
        </h2>

        <iframe
          width="100%"
          height="400"
          src={lesson.youtube}
          title="Lesson Video"
          className="rounded-lg"
          allowFullScreen
        ></iframe>
      </div>

      {/* COMPLETE BUTTON */}
      {!completed && (
        <div className="text-center mb-10">
          <button
            onClick={markCompleted}
            className="px-8 py-3 bg-emerald-600 rounded-lg hover:bg-emerald-500"
          >
            Mark Lesson as Completed
          </button>
        </div>
      )}

      {/* PRACTICE QUESTIONS */}
      {completed && (
        <div className="bg-slate-900 p-8 rounded-xl border border-purple-500/30">
          <h2 className="text-2xl font-bold mb-6 text-purple-300">
            Practice Questions
          </h2>

          {questions.map((q) => (
            <div key={q._id} className="mb-8">
              <h3 className="font-semibold mb-4">{q.question}</h3>

              <div className="grid grid-cols-2 gap-3">
                {q.options.map((opt) => {
                  const selected = answers[q._id];
                  const isCorrect = opt === q.correct;
                  const isSelected = selected === opt;

                  let style = "bg-slate-800";

                  if (isSelected && isCorrect) {
                    style = "bg-green-600";
                  } 
                  else if (isSelected && !isCorrect) {
                    style = "bg-red-600";
                  } 
                  else if (!isSelected && isCorrect && selected) {
                    style = "bg-green-700/60";
                  }

                  return (
                    <button
                      key={opt}
                      onClick={() => selectAnswer(q._id, opt)}
                      className={`${style} px-4 py-2 rounded-lg`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {answers[q._id] && answers[q._id] !== q.correct && (
                <p className="text-green-400 mt-3">
                  Correct Answer: {q.correct}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}