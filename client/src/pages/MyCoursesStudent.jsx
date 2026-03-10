

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyCoursesStudent() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem("token");

      const enrolledRes = await fetch(
        "http://localhost:5000/api/courses/my",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const enrolledData = await enrolledRes.json();

      const completedRes = await fetch(
        "http://localhost:5000/api/course-progress/completed",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const completedData = await completedRes.json();

      const completedIds = completedData.map(
        (item) => item.course._id
      );

      const activeCourses = enrolledData.filter(
        (course) => !completedIds.includes(course._id)
      );

      setCourses(activeCourses);

    } catch (err) {
      console.log(err);
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

          <li className="p-3 rounded-lg bg-purple-600 text-white font-semibold">
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
        <div className="bg-slate-900/60 backdrop-blur-md px-10 py-4 border-b border-slate-800 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-white">
            My Courses
          </h1>

          <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
            S
          </div>
        </div>

        <div className="p-10 text-white">
          <h2 className="text-2xl font-semibold mb-6 text-purple-300">
            Courses You Are Enrolled In
          </h2>

          {courses.length === 0 ? (
            <p className="text-gray-400">
              No active courses. All completed ✔
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="bg-slate-800 p-6 rounded-xl border border-purple-500/30"
                >
                  <h3 className="text-xl font-semibold text-purple-300">
                    {course.title}
                  </h3>

                  <p className="text-gray-400 text-sm mt-2">
                    {course.description}
                  </p>

                  <button
                    onClick={() =>
                      navigate(`/student-course/${course._id}`)
                    }
                    className="mt-4 px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-500"
                  >
                    Open Course
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}