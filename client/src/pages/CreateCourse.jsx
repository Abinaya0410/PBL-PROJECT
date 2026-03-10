import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateCourse() {
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: course.title,
          description: course.description
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // alert("Course Created Successfully!");
        // navigate("/teacher");
        navigate(`/course/${data._id}`);
      } else {
        alert(data.message || "Error creating course");
      }
    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-10 rounded-xl w-[500px] border border-slate-700 shadow-2xl"
      >
        <h2 className="text-2xl font-bold text-white mb-6">
          Create New Course
        </h2>

        <input
          name="title"
          placeholder="Course Title"
          value={course.title}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded-lg bg-slate-800 text-white border border-slate-700"
          required
        />

        <textarea
          name="description"
          placeholder="Course Description"
          value={course.description}
          onChange={handleChange}
          className="w-full mb-6 p-3 rounded-lg bg-slate-800 text-white border border-slate-700"
          required
        />

        <button className="w-full bg-cyan-600 hover:bg-cyan-500 text-white p-3 rounded-lg font-semibold transition-all duration-300">
          Create Course
        </button>
      </form>
    </div>
  );
}