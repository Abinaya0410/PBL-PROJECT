
import { useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";

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
    <div className="p-8 lg:p-12 space-y-10">
      <div className="max-w-6xl mx-auto space-y-10">
        <h1 className="text-3xl font-black uppercase tracking-tight leading-none text-indigo-500">
          My Courses
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course._id}
              onClick={() => navigate(`/student-course/${course._id}`)}
              className="glass-card p-8 group cursor-pointer hover:border-indigo-500 transition-all hover:-translate-y-2 flex flex-col h-full"
            >
              <div className="w-12 h-12 bg-indigo-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform mb-6">
                <GraduationCap size={24} />
              </div>

              <h2 className="text-xl font-black uppercase tracking-tight group-hover:text-indigo-500 transition-colors leading-tight mb-3">
                {course.title}
              </h2>

              <p className="text-xs text-gray-500 font-bold italic line-clamp-2 leading-relaxed opacity-80">
                {course.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
