

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function CompletedCourses() {
//   const navigate = useNavigate();
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchCompletedCourses();
//   }, []);

//   const fetchCompletedCourses = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await fetch(
//         "http://localhost:5000/api/course-progress/completed",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = await res.json();
//       setCourses(data);
//       setLoading(false);
//     } catch (err) {
//       console.log(err);
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900">

//       {/* SIDEBAR */}
//       <div className="w-72 bg-slate-950 text-gray-300 p-6 border-r border-slate-800">
//         <h2 className="text-2xl font-bold text-white mb-10">
//           Learning Portal
//         </h2>

//         <ul className="space-y-2 text-sm">
//           <li
//             onClick={() => navigate("/student-dashboard")}
//             className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer"
//           >
//             Dashboard
//           </li>

//           <li
//             onClick={() => navigate("/available-courses")}
//             className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer"
//           >
//             Available Courses
//           </li>

//           <li
//             onClick={() => navigate("/my-courses-student")}
//             className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer"
//           >
//             My Courses
//           </li>

//           <li className="p-3 rounded-lg bg-emerald-600 text-white font-semibold">
//             Completed Courses
//           </li>

//           <li
//             onClick={() => navigate("/quiz-attempts")}
//             className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer"
//           >
//             Quiz Attempts
//           </li>

//           {/* ✅ Added Analytics */}
//           <li
//             onClick={() => navigate("/student-analytics")}
//             className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer"
//           >
//             Analytics
//           </li>

//           {/* ✅ Added Logout */}
//           <li
//             onClick={handleLogout}
//             className="p-3 mt-8 text-red-400 hover:bg-red-900/20 cursor-pointer rounded-lg"
//           >
//             Logout
//           </li>
//         </ul>
//       </div>

//       {/* MAIN */}
//       <div className="flex-1 p-10 text-white">
//         <h1 className="text-3xl font-bold mb-8 text-emerald-400">
//           Completed Courses
//         </h1>

//         {loading ? (
//           <p className="text-gray-400">Loading...</p>
//         ) : courses.length === 0 ? (
//           <p className="text-gray-400">No courses completed yet.</p>
//         ) : (
//           <div className="grid grid-cols-3 gap-6">
//             {/* {courses.map((c) => ( */}
//             {courses
//   .filter((c) => c.course)   // ✅ ignore deleted courses
//   .map((c) => (
//     <div
//       key={c.course._id}
//       className="bg-slate-800 p-6 rounded-xl border border-emerald-500/30"
//     >
//       <h3 className="text-xl font-semibold text-emerald-300">
//         {c.course.title}
//       </h3>

//       <p className="mt-3 text-emerald-400 font-semibold">
//         ✔ Course Completed
//       </p>

//       <p className="text-sm text-gray-400 mt-2">
//         Completed on:{" "}
//         {new Date(c.completedAt).toLocaleDateString()}
//       </p>
//     </div>
// ))}
//               <div
//                 key={c.course._id}
//                 className="bg-slate-800 p-6 rounded-xl border border-emerald-500/30"
//               >
//                 <h3 className="text-xl font-semibold text-emerald-300">
//                   {c.course.title}
//                 </h3>

//                 <p className="mt-3 text-emerald-400 font-semibold">
//                   ✔ Course Completed
//                 </p>

//                 <p className="text-sm text-gray-400 mt-2">
//                   Completed on:{" "}
//                   {new Date(c.completedAt).toLocaleDateString()}
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CompletedCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompletedCourses();
  }, []);

  const fetchCompletedCourses = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:5000/api/course-progress/completed",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setCourses(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900">

      {/* SIDEBAR */}
      <div className="w-72 bg-slate-950 text-gray-300 p-6 border-r border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-10">
          Learning Portal
        </h2>

        <ul className="space-y-2 text-sm">
          <li
            onClick={() => navigate("/student-dashboard")}
            className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            Dashboard
          </li>

          <li
            onClick={() => navigate("/available-courses")}
            className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            Available Courses
          </li>

          <li
            onClick={() => navigate("/my-courses-student")}
            className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            My Courses
          </li>

          <li className="p-3 rounded-lg bg-emerald-600 text-white font-semibold">
            Completed Courses
          </li>

          <li
            onClick={() => navigate("/quiz-attempts")}
            className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            Quiz Attempts
          </li>

          <li
            onClick={() => navigate("/student-analytics")}
            className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            Analytics
          </li>

          <li
            onClick={handleLogout}
            className="p-3 mt-8 text-red-400 hover:bg-red-900/20 cursor-pointer rounded-lg"
          >
            Logout
          </li>
        </ul>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-10 text-white">
        <h1 className="text-3xl font-bold mb-8 text-emerald-400">
          Completed Courses
        </h1>

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : courses.filter((c) => c.course).length === 0 ? (
          <p className="text-gray-400">No courses completed yet.</p>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {courses
              .filter((c) => c.course) // ignore deleted courses safely
              .map((c) => (
                <div
                  key={c.course._id}
                  className="bg-slate-800 p-6 rounded-xl border border-emerald-500/30"
                >
                  <h3 className="text-xl font-semibold text-emerald-300">
                    {c.course.title}
                  </h3>

                  <p className="mt-3 text-emerald-400 font-semibold">
                    ✔ Course Completed
                  </p>

                  <p className="text-sm text-gray-400 mt-2">
                    Completed on:{" "}
                    {new Date(c.completedAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}