

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function AvailableCourses() {
//   const navigate = useNavigate();

//   const [availableCourses, setAvailableCourses] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState(null);

//   // FETCH COURSES FROM BACKEND
//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const res = await fetch("http://localhost:5000/api/courses", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = await res.json();
//         setAvailableCourses(data);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchCourses();
//   }, []);

//   // ENROLL COURSE (API)
//   const confirmEnroll = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       await fetch(
//         `http://localhost:5000/api/courses/enroll/${selectedCourse._id}`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       // Remove from UI after enrolling
//       setAvailableCourses(
//         availableCourses.filter((c) => c._id !== selectedCourse._id)
//       );

//       setSelectedCourse(null);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const cancelEnroll = () => {
//     setSelectedCourse(null);
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

//           <li className="p-3 rounded-lg bg-indigo-600 text-white font-semibold">
//             Available Courses
//           </li>

//           <li
//             onClick={() => navigate("/my-courses-student")}
//             className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer"
//           >
//             My Courses
//           </li>

//           <li
//             onClick={() => navigate("/completed-courses")}
//             className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer"
//           >
//             Completed Courses
//           </li>

//           <li
//             onClick={() => navigate("/quiz-attempts")}
//             className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer"
//           >
//             Quiz Attempts
//           </li>

//           <li
//             onClick={handleLogout}
//             className="p-3 mt-8 text-red-400 hover:bg-red-900/20 cursor-pointer rounded-lg"
//           >
//             Logout
//           </li>
//         </ul>
//       </div>

//       {/* MAIN AREA */}
//       <div className="flex-1">
//         {/* TOP BAR */}
//         <div className="bg-slate-900/60 backdrop-blur-md px-10 py-4 border-b border-slate-800 flex justify-between items-center">
//           <h1 className="text-xl font-semibold text-white">
//             Available Courses
//           </h1>

//           <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
//             S
//           </div>
//         </div>

//         {/* CONTENT */}
//         <div className="p-10 text-white">
//           <h2 className="text-2xl font-semibold mb-6 text-indigo-300">
//             Courses You Can Enroll In
//           </h2>

//           {availableCourses.length === 0 ? (
//             <p className="text-gray-400">No new courses available.</p>
//           ) : (
//             <div className="grid grid-cols-3 gap-6">
//               {availableCourses.map((course) => (
//                 <div
//                   key={course._id}
//                   className="bg-slate-800 p-6 rounded-xl border border-indigo-500/30"
//                 >
//                   <h3 className="text-xl font-semibold mb-2 text-indigo-300">
//                     {course.title}
//                   </h3>

//                   <p className="text-gray-400 text-sm mb-4">
//                     {course.description}
//                   </p>

//                   <button
//                     onClick={() => setSelectedCourse(course)}
//                     className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-500"
//                   >
//                     Enroll
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* CONFIRM MODAL */}
//         {selectedCourse && (
//           <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
//             <div className="bg-slate-900 p-8 rounded-xl border border-indigo-500/30 w-[420px] text-center">
//               <h2 className="text-xl font-semibold mb-4 text-white">
//                 Enroll in {selectedCourse.title}?
//               </h2>

//               <p className="text-gray-400 mb-6">
//                 After enrolling, this course will appear in your My Courses
//                 section.
//               </p>

//               <div className="flex justify-center gap-4">
//                 <button
//                   onClick={confirmEnroll}
//                   className="px-5 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-500"
//                 >
//                   Yes, Enroll
//                 </button>

//                 <button
//                   onClick={cancelEnroll}
//                   className="px-5 py-2 bg-slate-700 rounded-lg hover:bg-slate-600"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AvailableCourses() {
  const navigate = useNavigate();

  const [availableCourses, setAvailableCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/api/courses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setAvailableCourses(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCourses();
  }, []);

  const confirmEnroll = async () => {
    try {
      const token = localStorage.getItem("token");

      await fetch(
        `http://localhost:5000/api/courses/enroll/${selectedCourse._id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAvailableCourses(
        availableCourses.filter((c) => c._id !== selectedCourse._id)
      );

      setSelectedCourse(null);
    } catch (err) {
      console.log(err);
    }
  };

  const cancelEnroll = () => {
    setSelectedCourse(null);
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

          <li className="p-3 rounded-lg bg-indigo-600 text-white font-semibold">
            Available Courses
          </li>

          <li
            onClick={() => navigate("/my-courses-student")}
            className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            My Courses
          </li>

          <li
            onClick={() => navigate("/completed-courses")}
            className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            Completed Courses
          </li>

          <li
            onClick={() => navigate("/quiz-attempts")}
            className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            Quiz Attempts
          </li>

          {/* ✅ Added Analytics */}
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

      {/* MAIN AREA */}
      <div className="flex-1">

        {/* TOP BAR */}
        <div className="bg-slate-900/60 backdrop-blur-md px-10 py-4 border-b border-slate-800 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-white">
            Available Courses
          </h1>

          <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
            S
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-10 text-white">
          <h2 className="text-2xl font-semibold mb-6 text-indigo-300">
            Courses You Can Enroll In
          </h2>

          {availableCourses.length === 0 ? (
            <p className="text-gray-400">No new courses available.</p>
          ) : (
            <div className="grid grid-cols-3 gap-6">
              {availableCourses.map((course) => (
                <div
                  key={course._id}
                  className="bg-slate-800 p-6 rounded-xl border border-indigo-500/30"
                >
                  <h3 className="text-xl font-semibold mb-2 text-indigo-300">
                    {course.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-4">
                    {course.description}
                  </p>

                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-500"
                  >
                    Enroll
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CONFIRM MODAL */}
        {selectedCourse && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="bg-slate-900 p-8 rounded-xl border border-indigo-500/30 w-[420px] text-center">
              <h2 className="text-xl font-semibold mb-4 text-white">
                Enroll in {selectedCourse.title}?
              </h2>

              <p className="text-gray-400 mb-6">
                After enrolling, this course will appear in your My Courses section.
              </p>

              <div className="flex justify-center gap-4">
                <button
                  onClick={confirmEnroll}
                  className="px-5 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-500"
                >
                  Yes, Enroll
                </button>

                <button
                  onClick={cancelEnroll}
                  className="px-5 py-2 bg-slate-700 rounded-lg hover:bg-slate-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}