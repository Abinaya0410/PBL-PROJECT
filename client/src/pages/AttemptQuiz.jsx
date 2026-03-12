
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// export default function AttemptQuiz() {
//   const { courseId } = useParams();
//   const navigate = useNavigate();

//   const TOTAL_TIME = 30 * 60;

//   const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
//   const [answers, setAnswers] = useState({});
//   const [submitted, setSubmitted] = useState(false);
//   const [score, setScore] = useState(0);
//   const [questions, setQuestions] = useState([]);

//   // =========================
//   // FETCH QUIZ FROM DB
//   // =========================
//   useEffect(() => {
//     const fetchQuiz = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const res = await fetch(
//           `http://localhost:5000/api/course-quiz/${courseId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const data = await res.json();
//         setQuestions(data?.questions || []);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchQuiz();
//   }, [courseId]);

//   // =========================
//   // TIMER
//   // =========================
//   useEffect(() => {
//     if (submitted) return;

//     if (timeLeft <= 0) {
//       handleSubmit();
//       return;
//     }

//     const timer = setInterval(() => {
//       setTimeLeft((prev) => prev - 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [timeLeft, submitted]);

//   const formatTime = () => {
//     const m = Math.floor(timeLeft / 60);
//     const s = timeLeft % 60;
//     return `${m}:${s < 10 ? "0" : ""}${s}`;
//   };

//   const selectAnswer = (qid, option) => {
//     setAnswers({ ...answers, [qid]: option });
//   };

//   // =========================
//   // SUBMIT QUIZ
//   // =========================
//   const handleSubmit = async () => {
//     if (submitted) return;

//     let correctCount = 0;

//     questions.forEach((q) => {
//       if (answers[q._id] === q.correctAnswer) {
//         correctCount++;
//       }
//     });

//     const percent = (correctCount / questions.length) * 100;

//     setScore(percent);
//     setSubmitted(true);

//     // 🔥 SAVE RESULT TO DATABASE
//     try {
//       const token = localStorage.getItem("token");

//       await fetch(
//         `http://localhost:5000/api/course-quiz/submit/${courseId}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             score: percent,
//             correctCount: correctCount,
//             wrongCount: questions.length - correctCount,
//           }),
//         }
//       );
//     } catch (err) {
//       console.log("Error saving attempt:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white p-10">

//       {!submitted && (
//         <div className="flex justify-end mb-6">
//           <div className="bg-red-600 px-6 py-2 rounded-lg font-bold">
//             ⏱ {formatTime()}
//           </div>
//         </div>
//       )}

//       <h1 className="text-3xl font-bold mb-8 text-indigo-400">
//         Final Course Quiz
//       </h1>

//       {!submitted ? (
//         <>
//           {questions.map((q, i) => (
//             <div key={q._id} className="bg-slate-800 p-6 rounded-xl mb-6">
//               <h3 className="font-semibold mb-4">
//                 {i + 1}. {q.question}
//               </h3>

//               <div className="grid grid-cols-2 gap-3">
//                 {q.options.map((opt) => (
//                   <button
//                     key={opt}
//                     onClick={() => selectAnswer(q._id, opt)}
//                     className={`px-4 py-2 rounded-lg ${
//                       answers[q._id] === opt
//                         ? "bg-indigo-600"
//                         : "bg-slate-700"
//                     }`}
//                   >
//                     {opt}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           ))}

//           <div className="text-center mt-8">
//             <button
//               onClick={handleSubmit}
//               className="px-10 py-3 bg-emerald-600 rounded-lg font-semibold"
//             >
//               Finish Test
//             </button>
//           </div>
//         </>
//       ) : (
//         <div className="bg-slate-900 p-10 rounded-xl text-center">
//           <h2 className="text-3xl font-bold mb-4">
//             Your Score: {score.toFixed(0)}%
//           </h2>

//           {score >= 60 ? (
//             <>
//               <p className="text-emerald-400 text-lg mb-6">
//                 🎉 Congratulations! You passed the quiz.
//               </p>

//               <button
//                 onClick={() => navigate("/completed-courses")}
//                 className="px-8 py-3 bg-emerald-600 rounded-lg"
//               >
//                 Go to Completed Courses
//               </button>
//             </>
//           ) : (
//             <>
//               <p className="text-red-400 text-lg mb-6">
//                 You scored below 60%. Please reattempt.
//               </p>

//               <button
//                 onClick={() => {
//                   setSubmitted(false);
//                   setAnswers({});
//                   setTimeLeft(TOTAL_TIME);
//                 }}
//                 className="px-8 py-3 bg-indigo-600 rounded-lg"
//               >
//                 Reattempt Quiz
//               </button>
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }




import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AttemptQuiz() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const TOTAL_TIME = 30 * 60;

  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);

  const startTimeRef = useRef(new Date()); // ✅ store real start time

  // =========================
  // FETCH QUIZ FROM DB
  // =========================
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `http://localhost:5000/api/course-quiz/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setQuestions(data?.questions || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchQuiz();
  }, [courseId]);

  // =========================
  // TIMER
  // =========================
  useEffect(() => {
    if (submitted) return;

    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  const formatTime = () => {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const selectAnswer = (qid, option) => {
    setAnswers({ ...answers, [qid]: option });
  };

  // =========================
  // SUBMIT QUIZ
  // =========================
  const handleSubmit = async () => {
    if (submitted) return;

    let correctCount = 0;

    const detailedAnswers = questions.map((q) => {
      const selected = answers[q._id] || null;
      const isCorrect = selected === q.correctAnswer;

      if (isCorrect) correctCount++;

      return {
        questionId: q._id, // ✅ Add questionId
        question: q.question,
        options: q.options,
        selectedAnswer: selected,
        correctAnswer: q.correctAnswer,
        isCorrect,
      };
    });

    const percent = (correctCount / questions.length) * 100;

    setScore(percent);
    setSubmitted(true);

    const endTime = new Date();

    // 🔥 SAVE RESULT TO DATABASE (WITH DETAILS)
    try {
      const token = localStorage.getItem("token");

      await fetch(
        `http://localhost:5000/api/course-quiz/submit/${courseId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            score: percent,
            correctCount: correctCount,
            wrongCount: questions.length - correctCount,
            answers: detailedAnswers,
            startTime: startTimeRef.current,
            endTime: endTime,
          }),
        }
      );
    } catch (err) {
      console.log("Error saving attempt:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white p-10">

      {!submitted && (
        <div className="flex justify-end mb-6">
          <div className="bg-red-600 px-6 py-2 rounded-lg font-bold">
            ⏱ {formatTime()}
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-8 text-indigo-400">
        Final Course Quiz
      </h1>

      {!submitted ? (
        <>
          {questions.map((q, i) => (
            <div key={q._id} className="bg-slate-800 p-6 rounded-xl mb-6">
              <h3 className="font-semibold mb-4">
                {i + 1}. {q.question}
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {q.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => selectAnswer(q._id, opt)}
                    className={`px-4 py-2 rounded-lg ${
                      answers[q._id] === opt
                        ? "bg-indigo-600"
                        : "bg-slate-700"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="text-center mt-8">
            <button
              onClick={handleSubmit}
              className="px-10 py-3 bg-emerald-600 rounded-lg font-semibold"
            >
              Finish Test
            </button>
          </div>
        </>
      ) : (
        <div className="bg-slate-900 p-10 rounded-xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Your Score: {score.toFixed(0)}%
          </h2>

          {score >= 60 ? (
            <>
              <p className="text-emerald-400 text-lg mb-6">
                🎉 Congratulations! You passed the quiz.
              </p>

              <button
                onClick={() => navigate("/quiz-attempts")}
                className="px-8 py-3 bg-indigo-600 rounded-lg"
              >
                View Attempts
              </button>
            </>
          ) : (
            <>
              <p className="text-red-400 text-lg mb-6">
                You scored below 60%. Please reattempt.
              </p>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setAnswers({});
                  setTimeLeft(TOTAL_TIME);
                  startTimeRef.current = new Date();
                }}
                className="px-8 py-3 bg-indigo-600 rounded-lg"
              >
                Reattempt Quiz
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}