
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function QuizAttempts() {
  const navigate = useNavigate();
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/student-attempts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAttempts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttempts();
  }, [token]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Group attempts by course
  const grouped = attempts.reduce((acc, attempt) => {
    const title = attempt.course?.title || "Unknown Course";
    if (!acc[title]) acc[title] = [];
    acc[title].push(attempt);
    return acc;
  }, {});

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900">

      {/* SIDEBAR */}
      <div className="w-72 bg-slate-950 text-gray-300 p-6 border-r border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-10">
          Learning Portal
        </h2>

        <ul className="space-y-2 text-sm">
          <li onClick={() => navigate("/student-dashboard")} className="p-3 hover:bg-slate-800 cursor-pointer">
            Dashboard
          </li>

          <li onClick={() => navigate("/available-courses")} className="p-3 hover:bg-slate-800 cursor-pointer">
            Available Courses
          </li>

          <li onClick={() => navigate("/my-courses-student")} className="p-3 hover:bg-slate-800 cursor-pointer">
            My Courses
          </li>

          <li onClick={() => navigate("/completed-courses")} className="p-3 hover:bg-slate-800 cursor-pointer">
            Completed Courses
          </li>

          <li className="p-3 rounded-lg bg-indigo-600 text-white font-semibold">
            Quiz Attempts
          </li>

          <li onClick={() => navigate("/student-analytics")} className="p-3 hover:bg-slate-800 cursor-pointer">
            Analytics
          </li>

          <li onClick={handleLogout} className="p-3 mt-8 text-red-400 hover:bg-red-900/20 cursor-pointer">
            Logout
          </li>
        </ul>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-10 text-white">
        <h1 className="text-3xl font-bold mb-8 text-indigo-400">
          Quiz Attempts
        </h1>

        {loading ? (
          <p className="text-gray-400">Loading attempts...</p>
        ) : Object.keys(grouped).length === 0 ? (
          <p className="text-gray-400">No quiz attempts yet.</p>
        ) : (
          Object.keys(grouped).map((courseTitle) => (
            <div key={courseTitle} className="mb-10">
              <h2 className="text-2xl font-semibold text-indigo-300 mb-4">
                {courseTitle}
              </h2>

              {grouped[courseTitle].map((attempt, index) => (
                <div
                  key={attempt._id}
                  onClick={() => navigate(`/quiz-attempt/${attempt._id}`)}
                  className="bg-slate-800 p-6 rounded-xl mb-4 border border-slate-700"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">
                        Attempt {grouped[courseTitle].length - index}
                      </p>
                      <p className="text-sm text-gray-400">
                        {new Date(attempt.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-bold">
                        {attempt.score}%
                      </p>
                      {attempt.score >= 60 ? (
                        <span className="text-green-400 font-semibold">
                          Pass
                        </span>
                      ) : (
                        <span className="text-red-400 font-semibold">
                          Fail
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 flex gap-6 text-sm text-gray-300">
                    <p>Correct: {attempt.correctCount}</p>
                    <p>Wrong: {attempt.wrongCount}</p>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-3 w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-indigo-500 h-2 rounded-full"
                      style={{ width: `${attempt.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}




// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function QuizAttempts() {
//   const navigate = useNavigate();
//   const [attempts, setAttempts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchAttempts = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:5000/api/quiz/student-attempts",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setAttempts(res.data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAttempts();
//   }, [token]);

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   // Group attempts by course
//   const grouped = attempts.reduce((acc, attempt) => {
//     const title = attempt.course?.title || "Unknown Course";
//     if (!acc[title]) acc[title] = [];
//     acc[title].push(attempt);
//     return acc;
//   }, {});

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900">

//       {/* SIDEBAR */}
//       <div className="w-72 bg-slate-950 text-gray-300 p-6 border-r border-slate-800">
//         <h2 className="text-2xl font-bold text-white mb-10">
//           Learning Portal
//         </h2>

//         <ul className="space-y-2 text-sm">
//           <li onClick={() => navigate("/student-dashboard")} className="p-3 hover:bg-slate-800 cursor-pointer">
//             Dashboard
//           </li>

//           <li onClick={() => navigate("/available-courses")} className="p-3 hover:bg-slate-800 cursor-pointer">
//             Available Courses
//           </li>

//           <li onClick={() => navigate("/my-courses-student")} className="p-3 hover:bg-slate-800 cursor-pointer">
//             My Courses
//           </li>

//           <li onClick={() => navigate("/completed-courses")} className="p-3 hover:bg-slate-800 cursor-pointer">
//             Completed Courses
//           </li>

//           <li className="p-3 rounded-lg bg-indigo-600 text-white font-semibold">
//             Quiz Attempts
//           </li>

//           <li onClick={() => navigate("/student-analytics")} className="p-3 hover:bg-slate-800 cursor-pointer">
//             Analytics
//           </li>

//           <li onClick={handleLogout} className="p-3 mt-8 text-red-400 hover:bg-red-900/20 cursor-pointer">
//             Logout
//           </li>
//         </ul>
//       </div>

//       {/* MAIN */}
//       <div className="flex-1 p-10 text-white">
//         <h1 className="text-3xl font-bold mb-8 text-indigo-400">
//           Quiz Attempts
//         </h1>

//         {loading ? (
//           <p className="text-gray-400">Loading attempts...</p>
//         ) : Object.keys(grouped).length === 0 ? (
//           <p className="text-gray-400">No quiz attempts yet.</p>
//         ) : (
//           Object.keys(grouped).map((courseTitle) => (
//             <div key={courseTitle} className="mb-10">
//               <h2 className="text-2xl font-semibold text-indigo-300 mb-4">
//                 {courseTitle}
//               </h2>

//               {grouped[courseTitle].map((attempt, index) => (
//                 <div
//                   key={attempt._id}
//                   onClick={() => navigate(`/quiz-attempt/${attempt._id}`)}
//                   className="bg-slate-800 p-6 rounded-xl mb-4 border border-slate-700 hover:scale-[1.01] transition-all duration-300 cursor-pointer"
//                 >
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <p className="font-semibold">
//                         Attempt {grouped[courseTitle].length - index}
//                       </p>
//                       <p className="text-sm text-gray-400">
//                         {new Date(attempt.createdAt).toLocaleString()}
//                       </p>
//                     </div>

//                     <div className="text-right">
//                       <p className="text-lg font-bold">
//                         {attempt.score}%
//                       </p>
//                       {attempt.score >= 60 ? (
//                         <span className="text-green-400 font-semibold">
//                           Pass
//                         </span>
//                       ) : (
//                         <span className="text-red-400 font-semibold">
//                           Fail
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   {/* ✅ BASIC COMPARISON DISPLAY */}
//                   <div className="mt-3 text-sm">
//                     {attempt.previousScore === null ? (
//                       <span className="text-gray-400">
//                         First Attempt
//                       </span>
//                     ) : attempt.improved ? (
//                       <span className="text-green-400 font-medium">
//                         ↑ Improved by {attempt.scoreDifference}%
//                       </span>
//                     ) : (
//                       <span className="text-red-400 font-medium">
//                         ↓ Dropped by {Math.abs(attempt.scoreDifference)}%
//                       </span>
//                     )}
//                   </div>

//                   <div className="mt-4 flex gap-6 text-sm text-gray-300">
//                     <p>Correct: {attempt.correctCount}</p>
//                     <p>Wrong: {attempt.wrongCount}</p>
//                   </div>

//                   {/* Progress bar */}
//                   <div className="mt-3 w-full bg-slate-700 rounded-full h-2">
//                     <div
//                       className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
//                       style={{ width: `${attempt.score}%` }}
//                     ></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }