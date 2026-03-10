import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
} from "recharts";

export default function StudentAnalytics() {
  const navigate = useNavigate();
  const [openProfile, setOpenProfile] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const storedName = localStorage.getItem("name") || "Student";
  const token = localStorage.getItem("token");
  const initial = storedName.charAt(0).toUpperCase();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/analytics/student",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [token]);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-white">
        Loading Analytics...
      </div>
    );
  }

  const completionRate =
    data.totalEnrolled === 0
      ? 0
      : Math.round(
          (data.completedCourses / data.totalEnrolled) * 100
        );

  const pieData = [
    { name: "Pass", value: data.passCount },
    { name: "Fail", value: data.failCount },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  const radialData = [
    {
      name: "Completion",
      value: completionRate,
      fill: "#6366f1",
    },
  ];

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

          <li onClick={() => navigate("/quiz-attempts")} className="p-3 hover:bg-slate-800 cursor-pointer">
            Quiz Attempts
          </li>

          <li className="p-3 rounded-lg bg-indigo-600 text-white font-semibold">
            Analytics
          </li>

          <li onClick={handleLogout} className="p-3 mt-8 text-red-400 hover:bg-red-900/20 cursor-pointer">
            Logout
          </li>
        </ul>
      </div>

      {/* MAIN */}
      <div className="flex-1">

        {/* TOP BAR */}
        <div className="bg-slate-900/60 px-10 py-4 flex justify-between items-center relative">
          <h1 className="text-xl font-semibold text-white">
            Student Analytics
          </h1>

          <div className="relative">
            <div
              onClick={() => setOpenProfile(!openProfile)}
              className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold cursor-pointer"
            >
              {initial}
            </div>

            {openProfile && (
              <div className="absolute right-0 mt-2 bg-slate-800 border border-slate-700 rounded-lg w-48 shadow-lg text-white">
                <div className="px-4 py-3 border-b border-slate-700 font-semibold">
                  👤 {storedName}
                </div>

                <button
                  onClick={() => navigate("/student-profile")}
                  className="block w-full text-left px-4 py-2 hover:bg-slate-700"
                >
                  My Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-400 hover:bg-slate-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-10 text-white space-y-10">

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard title="Total Enrolled" value={data.totalEnrolled} />
            <StatCard title="Completed Courses" value={data.completedCourses} />
            <StatCard title="Average Score" value={`${data.averageScore}%`} />
            <StatCard title="Total Attempts" value={data.totalAttempts} />
          </div>

          {/* CHARTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <h3 className="mb-4 font-semibold">Pass vs Fail</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={pieData} innerRadius={60} outerRadius={90} dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col items-center justify-center">
              <h3 className="mb-4 font-semibold">Course Completion</h3>
              <ResponsiveContainer width="100%" height={250}>
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="70%"
                  outerRadius="100%"
                  barSize={15}
                  data={radialData}
                >
                  <RadialBar dataKey="value" />
                </RadialBarChart>
              </ResponsiveContainer>
              <p className="text-2xl font-bold mt-4">
                {completionRate}%
              </p>
            </div>
          </div>

         
          {/* COURSE PERFORMANCE */}
<div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
  <h3 className="mb-4 font-semibold text-lg">
    Course Performance Overview
  </h3>

  {!data.coursePerformance || data.coursePerformance.length === 0 ? (
    <p className="text-gray-400">No course data available.</p>
  ) : (
    <div className="space-y-4">
      {data.coursePerformance.map((course) => (
        <div
          key={course.courseId}
          className="bg-slate-900 p-5 rounded-lg border border-slate-700 flex justify-between items-center hover:bg-slate-800 transition"
        >
          {/* LEFT SIDE */}
          <div>
            <p className="font-bold text-white text-base">
              {course.courseTitle}
            </p>

            <p className="text-sm text-gray-400 mt-1">
              Attempts: {course.attempts} • Best: {course.bestScore}% • Avg: {course.averageScore}%
            </p>

            <p className="text-xs text-gray-500 mt-1">
              Last Attempt:{" "}
              {new Date(course.lastAttemptDate).toLocaleDateString()}
            </p>
          </div>

          {/* STATUS */}
          <div className="flex items-center gap-2">
            {course.status === "Completed" ? (
              <>
                <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                <span className="text-green-400 font-semibold text-sm">
                  Completed
                </span>
              </>
            ) : (
              <>
                <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                <span className="text-yellow-400 font-semibold text-sm">
                  In Progress
                </span>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  )}
</div>

          {/* RECENT ATTEMPTS */}
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h3 className="mb-4 font-semibold">Recent Attempts</h3>

            {data.recentAttempts.length === 0 ? (
              <p className="text-gray-400">No attempts yet.</p>
            ) : (
              <table className="w-full text-sm">
                <thead className="text-gray-400 border-b border-slate-700">
                  <tr>
                    <th className="py-2 text-left">Course</th>
                    <th className="py-2 text-left">Score</th>
                    <th className="py-2 text-left">Correct</th>
                    <th className="py-2 text-left">Wrong</th>
                    <th className="py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recentAttempts.map((attempt) => (
                    <tr key={attempt._id} className="border-b border-slate-700">
                      <td className="py-2 font-semibold">
                        {attempt.course?.title}
                      </td>
                      <td className="py-2">{attempt.score}%</td>
                      <td className="py-2">{attempt.correctCount}</td>
                      <td className="py-2">{attempt.wrongCount}</td>
                      <td className="py-2">
                        {attempt.score >= 60 ? (
                          <span className="text-green-400 font-semibold">Pass</span>
                        ) : (
                          <span className="text-red-400 font-semibold">Fail</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
      <h4 className="text-gray-400 text-sm mb-2">{title}</h4>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}