import { useNavigate } from "react-router-dom";

export default function StudentCourses() {
  const navigate = useNavigate();

  // Dummy courses (temporary until backend is ready)
  const courses = [
    {
      _id: "1",
      title: "Java",
      description: "Basics of Java programming"
    },
    {
      _id: "2",
      title: "Python",
      description: "Python fundamentals"
    },
    {
      _id: "3",
      title: "Web Development",
      description: "HTML, CSS, JS basics"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white p-10">
      
      <h1 className="text-3xl font-bold mb-8 text-indigo-400">
        My Courses
      </h1>

      <div className="grid grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            onClick={() => navigate(`/student-course/${course._id}`)}
            className="bg-slate-800 p-6 rounded-xl border border-indigo-500/30 cursor-pointer hover:scale-105 transition"
          >
            <h2 className="text-xl font-semibold mb-2 text-indigo-300">
              {course.title}
            </h2>

            <p className="text-gray-400 text-sm">
              {course.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
