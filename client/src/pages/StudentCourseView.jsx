
// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";

// export default function StudentCourseView() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [lessons, setLessons] = useState([]);

//   useEffect(() => {
//     const fetchLessons = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const res = await fetch(
//           `http://localhost:5000/api/courses/${id}/lessons`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const data = await res.json();
//         setLessons(data);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchLessons();
//   }, [id]);

//   const allCompleted = lessons.length > 0; // temporary unlock logic

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white p-10">
//       {/* HEADER */}
//       <div className="bg-slate-900/60 backdrop-blur-md p-6 rounded-xl border border-indigo-500/20 mb-8 shadow-lg">
//         <h1 className="text-3xl font-bold text-indigo-400">
//           Course Learning
//         </h1>
//         <p className="text-gray-400 mt-2">
//           Complete all lessons to unlock the final quiz.
//         </p>
//       </div>

//       {/* LESSON LIST */}
//       <h2 className="text-2xl font-semibold mb-6 text-indigo-300">
//         Lessons
//       </h2>

//       <div className="grid grid-cols-2 gap-6 mb-10">
//         {lessons.map((lesson) => (
//           <div
//             key={lesson._id}
//             className="relative bg-slate-800 p-6 rounded-xl border border-slate-700"
//           >
//             <h3 className="text-lg font-semibold text-indigo-300">
//               {lesson.title}
//             </h3>

//             <p className="text-gray-400 text-sm mt-2">
//               {lesson.description}
//             </p>

//             <button
//               onClick={() => navigate(`/student-lesson/${lesson._id}`)}
//               className="mt-4 px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-500"
//             >
//               View Lesson
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* QUIZ SECTION */}
//       <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 rounded-xl shadow-lg">
//         <h2 className="text-2xl font-bold mb-3">
//           Final Course Quiz
//         </h2>

//         {allCompleted ? (
//           <>
//             <p className="text-white/80 mb-4">
//               Lessons loaded! You can now attempt the quiz.
//             </p>

//             <button
//               onClick={() => navigate(`/quiz-instructions/${id}`)}
//               className="px-8 py-3 bg-white text-indigo-700 font-semibold rounded-lg"
//             >
//               Attempt Quiz
//             </button>
//           </>
//         ) : (
//           <p className="text-white/80">
//             No lessons found for this course.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }



import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function StudentCourseView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lessons, setLessons] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    fetchLessons();
  }, [id]);

  const fetchLessons = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/api/courses/${id}/lessons`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setLessons(data);

      checkAllProgress(data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 Check progress for all lessons
  const checkAllProgress = async (lessonList) => {
    try {
      const token = localStorage.getItem("token");

      let count = 0;

      for (let lesson of lessonList) {
        const res = await fetch(
          `http://localhost:5000/api/lessons/${lesson._id}/progress`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (data.completed) {
          count++;
        }
      }

      setCompletedCount(count);
    } catch (err) {
      console.log(err);
    }
  };

  const allCompleted =
    lessons.length > 0 && completedCount === lessons.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white p-10">
      {/* HEADER */}
      <div className="bg-slate-900/60 backdrop-blur-md p-6 rounded-xl border border-indigo-500/20 mb-8 shadow-lg">
        <h1 className="text-3xl font-bold text-indigo-400">
          Course Learning
        </h1>
        <p className="text-gray-400 mt-2">
          Complete all lessons to unlock the final quiz.
        </p>
      </div>

      {/* LESSON LIST */}
      <h2 className="text-2xl font-semibold mb-6 text-indigo-300">
        Lessons ({completedCount}/{lessons.length} completed)
      </h2>

      <div className="grid grid-cols-2 gap-6 mb-10">
        {lessons.map((lesson) => (
          <div
            key={lesson._id}
            className="relative bg-slate-800 p-6 rounded-xl border border-slate-700"
          >
            <h3 className="text-lg font-semibold text-indigo-300">
              {lesson.title}
            </h3>

            <p className="text-gray-400 text-sm mt-2">
              {lesson.description}
            </p>

            <button
              onClick={() => navigate(`/student-lesson/${lesson._id}`)}
              className="mt-4 px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-500"
            >
              View Lesson
            </button>
          </div>
        ))}
      </div>

      {/* QUIZ SECTION */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-3">
          Final Course Quiz
        </h2>

        {allCompleted ? (
          <>
            <p className="text-white/80 mb-4">
              All lessons completed! You can now attempt the quiz.
            </p>

            <button
              onClick={() => navigate(`/quiz-instructions/${id}`)}
              className="px-8 py-3 bg-white text-indigo-700 font-semibold rounded-lg"
            >
              Attempt Quiz
            </button>
          </>
        ) : (
          <p className="text-white/80">
            Complete all lessons to unlock the quiz.
          </p>
        )}
      </div>
    </div>
  );
}
