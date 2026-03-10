



import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function CourseBuilder() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lessons, setLessons] = useState([]);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetchCourse();
    fetchLessons();
  }, []);

  const fetchCourse = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:5000/api/courses/teacher`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      const current = data.find((c) => c._id === id);
      setCourse(current);
    } catch (err) {
      console.log(err);
    }
  };

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
    } catch (err) {
      console.log(err);
    }
  };

  const deleteLesson = async (lessonId) => {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/api/lessons/${lessonId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setLessons(lessons.filter((l) => l._id !== lessonId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-10">

      {/* HEADER */}
      <div className="bg-slate-900/60 backdrop-blur-md p-6 rounded-xl border border-cyan-500/20 mb-8 shadow-lg">
        <h1 className="text-3xl font-bold text-cyan-400">
          {course ? course.title : "Course Builder"}
        </h1>
        <p className="text-gray-400 mt-2">
          {course?.description}
        </p>
      </div>

      {/* INFO PANEL */}
      <div className="bg-emerald-600/10 border border-emerald-500 p-6 rounded-xl mb-10 shadow-md">
        <h2 className="text-2xl font-semibold mb-2 text-emerald-400">
          🎓 Manage Course Content
        </h2>
        <p className="text-gray-300">
          Add lessons, upload questions and create quizzes.
        </p>
      </div>

      {/* ACTION CARDS */}
      <div className="grid grid-cols-3 gap-6 mb-12">

        {/* <div
          onClick={() => navigate(`/add-lesson/${id}`)}
          className="bg-slate-800 p-6 rounded-xl border border-cyan-500/30 cursor-pointer hover:scale-105 transition-all"
        >
          <h3 className="text-xl font-semibold text-cyan-400">Add Lesson</h3>
        </div>

        <div 
         onClick={() => navigate(`/upload-questions/${id}`)}
        className="bg-slate-800 p-6 rounded-xl border border-purple-500/30 cursor-pointer hover:scale-105 transition-all">
          <h3 className="text-xl font-semibold text-purple-400">
            Upload Questions
          </h3>
        </div>

        <div
          onClick={() => navigate("/my-courses")}
          className="bg-slate-800 p-6 rounded-xl border border-amber-500/30 cursor-pointer hover:scale-105 transition-all"
        >
          <h3 className="text-xl font-semibold text-amber-400">
            View My Courses
          </h3>
        </div> */}
         {/* ADD LESSON */}
  <div
    onClick={() => navigate(`/add-lesson/${id}`)}
    className="bg-slate-800 p-6 rounded-xl border border-cyan-500/30 cursor-pointer hover:scale-105 transition-all"
  >
    <h3 className="text-xl font-semibold text-cyan-400">Add Lesson</h3>
  </div>

  {/* UPLOAD QUIZ (COURSE LEVEL) */}
  <div
    onClick={() => navigate(`/create-quiz/${id}`)}
    className="bg-slate-800 p-6 rounded-xl border border-purple-500/30 cursor-pointer hover:scale-105 transition-all"
  >
    <h3 className="text-xl font-semibold text-purple-400">Upload Quiz</h3>
  </div>

  {/* VIEW ANALYTICS */}
  <div
    onClick={() => navigate(`/course-analytics/${id}`)}
    className="bg-slate-800 p-6 rounded-xl border border-amber-500/30 cursor-pointer hover:scale-105 transition-all"
  >
    <h3 className="text-xl font-semibold text-amber-400">View Analytics</h3>
  </div>
      </div>

      {/* LESSON LIST */}
      <h2 className="text-2xl font-bold mb-6 text-cyan-400">
        Lessons in this Course
      </h2>

      {lessons.length === 0 ? (
        <p className="text-gray-400">No lessons added yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          {lessons.map((lesson) => (
            <div
              key={lesson._id}
              className="bg-slate-900 border border-slate-700 p-6 rounded-xl"
            >
              <h3 className="text-lg font-semibold text-cyan-300">
                {lesson.order}. {lesson.title}
              </h3>

              <p className="text-gray-400 text-sm mt-2">
                {lesson.description}
              </p>

              <div className="flex gap-3 mt-4">
                {/* EDIT BUTTON */}
                <button
                  onClick={() => navigate(`/edit-lesson/${lesson._id}`)}
                  className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-4 py-2 rounded-lg transition"
                >
                  Edit
                </button>

                {/* DELETE BUTTON */}
                <button
                  onClick={() => deleteLesson(lesson._id)}
                  className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg transition"
                >
                  Delete
                </button>
                  <button
    onClick={() => navigate(`/upload-questions/${lesson._id}`)}
    className="bg-purple-600 px-4 py-2 rounded"
  >
    Add Questions
  </button>
  <button
  onClick={() => navigate(`/lesson-details/${lesson._id}`)}
  className="bg-cyan-600 px-4 py-2 rounded"
>
  View
</button>
{/* <div
  onClick={() => navigate(`/create-quiz/${id}`)}
  className="bg-slate-800 p-6 rounded-xl border border-pink-500/30 cursor-pointer hover:scale-105 transition-all"
>
  
</div> */}


              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
