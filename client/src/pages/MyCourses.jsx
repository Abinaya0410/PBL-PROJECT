

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: "", description: "" });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/courses/teacher", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setCourses(data);
    };

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-10">
      <h1 className="text-3xl font-bold mb-8 text-cyan-400">My Courses</h1>

      <div className="space-y-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="flex items-center justify-between bg-slate-900 border border-slate-700 rounded-xl p-6"
          >
            {/* COURSE INFO (NO CLICK HERE ANYMORE) */}
            <div className="flex-1">
              {editingId !== course._id ? (
                <>
                  <h2 className="text-xl font-semibold text-cyan-300">
                    {course.title}
                  </h2>
                  <p className="text-gray-400 text-sm mt-2">
                    {course.description}
                  </p>
                </>
              ) : (
                <>
                  <input
                    value={editData.title}
                    onChange={(e) =>
                      setEditData({ ...editData, title: e.target.value })
                    }
                    className="w-full mb-3 p-2 rounded bg-slate-800"
                  />

                  <textarea
                    value={editData.description}
                    onChange={(e) =>
                      setEditData({ ...editData, description: e.target.value })
                    }
                    className="w-full mb-3 p-2 rounded bg-slate-800"
                  />
                </>
              )}
            </div>

            {/* BUTTONS AREA */}
            <div className="flex gap-3 ml-6">
              {editingId !== course._id ? (
                <>
                  {/* NEW BUTTON TO OPEN COURSE BUILDER */}
                  <button
                    onClick={() => navigate(`/course/${course._id}`)}
                    className="bg-cyan-600 hover:bg-cyan-500 px-4 py-2 rounded-lg text-sm font-semibold"
                  >
                    Go to Course →
                  </button>

                  <button
                    onClick={() => {
                      setEditingId(course._id);
                      setEditData({
                        title: course.title,
                        description: course.description,
                      });
                    }}
                    className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-lg text-sm font-semibold"
                  >
                    Edit
                  </button>

                  <button
                    onClick={async () => {
                      const token = localStorage.getItem("token");

                      await fetch(
                        `http://localhost:5000/api/courses/${course._id}`,
                        {
                          method: "DELETE",
                          headers: { Authorization: `Bearer ${token}` },
                        }
                      );

                      setCourses(
                        courses.filter((c) => c._id !== course._id)
                      );
                    }}
                    className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg text-sm font-semibold"
                  >
                    Delete
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={async () => {
                      const token = localStorage.getItem("token");

                      const res = await fetch(
                        `http://localhost:5000/api/courses/${course._id}`,
                        {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify(editData),
                        }
                      );

                      const updated = await res.json();

                      setCourses(
                        courses.map((c) =>
                          c._id === course._id ? updated : c
                        )
                      );

                      setEditingId(null);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-lg text-sm font-semibold"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded-lg text-sm font-semibold"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
