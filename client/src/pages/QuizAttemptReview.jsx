// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function QuizAttemptReview() {
//   const { attemptId } = useParams();
//   const navigate = useNavigate();
//   const [attempt, setAttempt] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchAttempt = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/quiz-attempt/${attemptId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         setAttempt(res.data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAttempt();
//   }, [attemptId, token]);

//   if (loading || !attempt) {
//     return (
//       <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
//         Loading attempt...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white p-10">

//       <button
//         onClick={() => navigate(-1)}
//         className="mb-6 px-6 py-2 bg-slate-700 rounded-lg"
//       >
//         ← Back
//       </button>

//       <h1 className="text-3xl font-bold mb-6 text-indigo-400">
//         {attempt.course?.title}
//       </h1>

//       <div className="bg-slate-800 p-6 rounded-xl mb-8">
//         <p><strong>Score:</strong> {attempt.score}%</p>
//         <p><strong>Status:</strong> {attempt.score >= 60 ? "Pass" : "Fail"}</p>
//         <p><strong>Start Time:</strong> {new Date(attempt.startTime).toLocaleString()}</p>
//         <p><strong>End Time:</strong> {new Date(attempt.endTime).toLocaleString()}</p>
//         <p><strong>Time Taken:</strong> {attempt.timeSpent} seconds</p>
//       </div>

//       <h2 className="text-2xl font-semibold mb-6">Review Questions</h2>

//       {attempt.answers.map((q, index) => (
//         <div key={index} className="bg-slate-800 p-6 rounded-xl mb-6">
//           <h3 className="font-semibold mb-4">
//             {index + 1}. {q.question}
//           </h3>

//           <div className="space-y-2">
//             {q.options.map((opt, i) => {
//               const isSelected = opt === q.selectedAnswer;
//               const isCorrect = opt === q.correctAnswer;

//               return (
//                 <div
//                   key={i}
//                   className={`p-2 rounded ${
//                     isCorrect
//                       ? "bg-green-700"
//                       : isSelected
//                       ? "bg-red-700"
//                       : "bg-slate-700"
//                   }`}
//                 >
//                   {opt}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function QuizAttemptReview() {
  const { attemptId } = useParams();
  const navigate = useNavigate();
  const [attempt, setAttempt] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAttempt = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5001/api/quiz/quiz-attempt/${attemptId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAttempt(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttempt();
  }, [attemptId, token]);

  if (loading || !attempt) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading attempt...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white p-10">

      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-6 py-2 bg-slate-700 rounded-lg"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-6 text-indigo-400">
        {attempt.course?.title}
      </h1>

      <div className="bg-slate-800 p-6 rounded-xl mb-8">
        <p><strong>Score:</strong> {attempt.score}%</p>
        <p><strong>Status:</strong> {attempt.score >= 60 ? "Pass" : "Fail"}</p>
        <p><strong>Start Time:</strong> {new Date(attempt.startTime).toLocaleString()}</p>
        <p><strong>End Time:</strong> {new Date(attempt.endTime).toLocaleString()}</p>
        <p><strong>Time Taken:</strong> {attempt.timeSpent} seconds</p>
      </div>

      <h2 className="text-2xl font-semibold mb-6">Review Questions</h2>

      {attempt.answers.map((q, index) => (
        <div key={index} className="bg-slate-800 p-6 rounded-xl mb-6">
          <h3 className="font-semibold mb-4">
            {index + 1}. {q.question}
          </h3>

          <div className="space-y-2">
            {q.options.map((opt, i) => {
              const isSelected = opt === q.selectedAnswer;

              let style = "bg-slate-700";

              if (q.isCorrect && isSelected) {
                style = "bg-green-700";
              } 
              else if (!q.isCorrect && isSelected) {
                style = "bg-red-700";
              } 
              else if (!q.isCorrect && opt === q.correctAnswer) {
                style = "bg-green-700/60";
              }

              return (
                <div
                  key={i}
                  className={`p-2 rounded ${style}`}
                >
                  {opt}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}