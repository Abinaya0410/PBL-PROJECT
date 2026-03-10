
// import { useNavigate } from "react-router-dom";

// export default function TeacherDashboard() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

//       {/* SIDEBAR */}
//       <div className="w-72 bg-slate-950 text-gray-300 p-6 border-r border-slate-800">

//         <h2 className="text-2xl font-bold text-white mb-10">
//           Virtual Academic <br /> Intelligence Hub
//         </h2>

//         <ul className="space-y-2 text-sm">

//           <li className="p-3 rounded-lg bg-cyan-600 text-white font-semibold shadow-lg">
//             Dashboard
//           </li>

//           {/* <li className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer transition-all duration-300 hover:translate-x-2 hover:shadow-lg">
//             Create Course
//           </li> */}
//           <li
//   onClick={() => navigate("/create-course")}
//   className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer transition-all duration-300 hover:translate-x-2 hover:shadow-lg"
// >
//   Create Course
// </li>

//           {/* <li className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer transition-all duration-300 hover:translate-x-2 hover:shadow-lg">
//             My Courses
//           </li> */}
//           <li
//   onClick={() => navigate("/my-courses")}
//   className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer transition-all duration-300 hover:translate-x-2 hover:shadow-lg"
// >
//   My Courses
// </li>

//           <li className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer transition-all duration-300 hover:translate-x-2 hover:shadow-lg">
//             Create Lesson
//           </li>

//           <li className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer transition-all duration-300 hover:translate-x-2 hover:shadow-lg">
//             Upload Questions
//           </li>

//           <li className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer transition-all duration-300 hover:translate-x-2 hover:shadow-lg">
//             Analytics
//           </li>

//           <li
//             onClick={handleLogout}
//             className="p-3 mt-8 text-red-400 hover:bg-red-900/20 cursor-pointer rounded-lg transition-all duration-300 hover:translate-x-2 hover:shadow-lg"
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
//             Teacher Dashboard
//           </h1>

//           <div className="flex items-center gap-4">

//             <input
//               type="text"
//               placeholder="Search..."
//               className="bg-slate-800 text-white border border-slate-700 p-2 rounded-lg w-64 
//               focus:ring-2 focus:ring-cyan-500 outline-none
//               transition-all duration-300 focus:scale-105"
//             />

//             <div className="w-10 h-10 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg
//             hover:scale-110 hover:rotate-6 hover:bg-cyan-500 transition-all duration-300 cursor-pointer">
//               T
//             </div>
//           </div>
//         </div>

//         {/* CONTENT */}
//         <div className="p-10 text-white">

//           {/* HERO */}
//           <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-10 rounded-xl mb-10 shadow-lg
//           hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
//             <h2 className="text-3xl font-bold mb-2">
//               Welcome back 👋
//             </h2>
//             <p className="text-white/80">
//               Manage courses, lessons, quizzes and monitor student learning progress.
//             </p>
//           </div>

//           {/* STATS */}
//           <div className="grid grid-cols-4 gap-6 mb-12">

//             <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 
//             hover:border-cyan-500 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.03]
//             transition-all duration-300 cursor-pointer">
//               <p className="text-gray-400">Total Courses</p>
//               <h3 className="text-3xl font-bold text-cyan-400 mt-2">0</h3>
//             </div>

//             <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 
//             hover:border-blue-500 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.03]
//             transition-all duration-300 cursor-pointer">
//               <p className="text-gray-400">Total Lessons</p>
//               <h3 className="text-3xl font-bold text-blue-400 mt-2">0</h3>
//             </div>

//             <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 
//             hover:border-emerald-500 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.03]
//             transition-all duration-300 cursor-pointer">
//               <p className="text-gray-400">Students Enrolled</p>
//               <h3 className="text-3xl font-bold text-emerald-400 mt-2">0</h3>
//             </div>

//             <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 
//             hover:border-orange-500 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.03]
//             transition-all duration-300 cursor-pointer">
//               <p className="text-gray-400">Quiz Activity</p>
//               <h3 className="text-3xl font-bold text-orange-400 mt-2">0</h3>
//             </div>

//           </div>

//           {/* ACTION CARDS */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4 text-gray-300">
//               Quick Actions
//             </h3>

//             <div className="grid grid-cols-3 gap-6">

//               <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 
//               hover:border-cyan-500 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.03]
//               transition-all duration-300 cursor-pointer">
//                 <h4 className="font-semibold text-cyan-400">
//                   Create Course
//                 </h4>
//                 <p className="text-sm text-gray-400 mt-2">
//                   Start building a new course for students.
//                 </p>
//               </div>

//               <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 
//               hover:border-blue-500 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.03]
//               transition-all duration-300 cursor-pointer">
//                 <h4 className="font-semibold text-blue-400">
//                   Add Lesson
//                 </h4>
//                 <p className="text-sm text-gray-400 mt-2">
//                   Upload materials and structure lessons.
//                 </p>
//               </div>

//               <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 
//               hover:border-pink-500 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.03]
//               transition-all duration-300 cursor-pointer">
//                 <h4 className="font-semibold text-pink-400">
//                   Upload Questions
//                 </h4>
//                 <p className="text-sm text-gray-400 mt-2">
//                   Add questions for quizzes and assessments.
//                 </p>
//               </div>

//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }



import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function TeacherDashboard() {
  const navigate = useNavigate();

  const [totalCourses, setTotalCourses] = useState(0);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    fetchCourseCount();
  }, []);

  const fetchCourseCount = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/courses/teacher", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setTotalCourses(data.length);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

      {/* SIDEBAR */}
      <div className="w-72 bg-slate-950 text-gray-300 p-6 border-r border-slate-800">

        <h2 className="text-2xl font-bold text-white mb-10">
          Virtual Academic <br /> Intelligence Hub
        </h2>

        <ul className="space-y-2 text-sm">

          <li className="p-3 rounded-lg bg-cyan-600 text-white font-semibold shadow-lg">
            Dashboard
          </li>

          <li
            onClick={() => navigate("/create-course")}
            className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer transition-all duration-300 hover:translate-x-2 hover:shadow-lg"
          >
            Create Course
          </li>

          <li
            onClick={() => navigate("/my-courses")}
            className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer transition-all duration-300 hover:translate-x-2 hover:shadow-lg"
          >
            My Courses
          </li>

          <li
            onClick={() => navigate("/analytics")}
            className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer transition-all duration-300 hover:translate-x-2 hover:shadow-lg"
          >
            Analytics
          </li>

          <li
            onClick={handleLogout}
            className="p-3 mt-8 text-red-400 hover:bg-red-900/20 cursor-pointer rounded-lg transition-all duration-300 hover:translate-x-2 hover:shadow-lg"
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
            Teacher Dashboard
          </h1>

          <div className="flex items-center gap-4">

            <input
              type="text"
              placeholder="Search..."
              className="bg-slate-800 text-white border border-slate-700 p-2 rounded-lg w-64 
              focus:ring-2 focus:ring-cyan-500 outline-none
              transition-all duration-300 focus:scale-105"
            />

            <div className="w-10 h-10 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg
            hover:scale-110 hover:rotate-6 hover:bg-cyan-500 transition-all duration-300 cursor-pointer">
              T
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-10 text-white">

          {/* HERO */}
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-10 rounded-xl mb-10 shadow-lg
          hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
            <h2 className="text-3xl font-bold mb-2">
              Welcome back 👋
            </h2>
            <p className="text-white/80">
              Manage courses, lessons, quizzes and monitor student learning progress.
            </p>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-4 gap-6 mb-12">

            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 
            hover:border-cyan-500 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.03]
            transition-all duration-300 cursor-pointer">
              <p className="text-gray-400">Total Courses</p>
              <h3 className="text-3xl font-bold text-cyan-400 mt-2">
                {totalCourses}
              </h3>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <p className="text-gray-400">Total Lessons</p>
              <h3 className="text-3xl font-bold text-blue-400 mt-2">0</h3>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <p className="text-gray-400">Students Enrolled</p>
              <h3 className="text-3xl font-bold text-emerald-400 mt-2">0</h3>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <p className="text-gray-400">Quiz Activity</p>
              <h3 className="text-3xl font-bold text-orange-400 mt-2">0</h3>
            </div>

          </div>

          {/* PLATFORM OVERVIEW (Replaces Quick Actions)
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-300">
              Platform Overview
            </h3>

            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <p className="text-gray-300">
                Create and manage courses, add lessons, build quizzes, and track student learning progress from a single dashboard.
              </p>
            </div>
          </div> */}
{/* STUDENT ACTIVITY */}
<div>
  <h3 className="text-lg font-semibold mb-4 text-gray-300">
    Student Activity
  </h3>

  <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
    
    <p className="text-gray-400 mb-4">
      Recent student interactions will appear here once learners start engaging with courses and quizzes.
    </p>

    <div className="space-y-3 text-sm text-gray-300">
      <div className="flex justify-between border-b border-slate-700 pb-2">
        <span>• Quiz attempts</span>
        <span className="text-gray-500">Coming soon</span>
      </div>

      <div className="flex justify-between border-b border-slate-700 pb-2">
        <span>• New enrollments</span>
        <span className="text-gray-500">Coming soon</span>
      </div>

      <div className="flex justify-between border-b border-slate-700 pb-2">
        <span>• Top performers</span>
        <span className="text-gray-500">Coming soon</span>
      </div>

      <div className="flex justify-between">
        <span>• Course engagement</span>
        <span className="text-gray-500">Coming soon</span>
      </div>
    </div>
  </div>
</div>

        </div>
      </div>
    </div>
  );
}

