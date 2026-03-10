import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AddLesson() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [success, setSuccess] = useState(false);

  const [lesson, setLesson] = useState({
    title: "",
    description: "",
    textContent: "",
    videoUrl: "",
    order: "",
  });

  const handleChange = (e) => {
    setLesson({ ...lesson, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/api/courses/${id}/lessons`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...lesson,
            order: Number(lesson.order),
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);

        setLesson({
          title: "",
          description: "",
          textContent: "",
          videoUrl: "",
          order: "",
        });

        setTimeout(() => {
          navigate(`/course/${id}`);
        }, 1500);
      } else {
        alert(data.message || "Error adding lesson");
      }
    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex justify-center items-start py-12 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-10 rounded-2xl w-[900px] border border-slate-700 shadow-2xl"
      >
        <h2 className="text-3xl font-bold mb-8 text-cyan-400">
          Add Lesson
        </h2>

        {/* TITLE */}
        <input
          name="title"
          placeholder="Lesson Title"
          value={lesson.title}
          onChange={handleChange}
          className="w-full mb-4 p-4 rounded-lg bg-slate-800 border border-slate-700"
          required
        />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          placeholder="Short Description"
          value={lesson.description}
          onChange={handleChange}
          className="w-full mb-4 p-4 rounded-lg bg-slate-800 border border-slate-700 min-h-[100px]"
        />

        {/* TEXT CONTENT */}
        <textarea
          name="textContent"
          placeholder="Lesson Notes / Explanation (optional)"
          value={lesson.textContent}
          onChange={handleChange}
          className="w-full mb-4 p-4 rounded-lg bg-slate-800 border border-slate-700 min-h-[250px]"
        />

        {/* VIDEO URL */}
        <input
          name="videoUrl"
          placeholder="YouTube Video URL (optional)"
          value={lesson.videoUrl}
          onChange={handleChange}
          className="w-full mb-4 p-4 rounded-lg bg-slate-800 border border-slate-700"
        />

        {/* ORDER */}
        <input
          type="number"
          name="order"
          placeholder="Lesson Order (1,2,3...)"
          value={lesson.order}
          onChange={handleChange}
          className="w-full mb-4 p-4 rounded-lg bg-slate-800 border border-slate-700"
          required
        />

        {/* SUCCESS MESSAGE — NOW NEAR BUTTON */}
        {success && (
          <div className="mb-4 bg-green-600/20 border border-green-500 text-green-400 px-4 py-3 rounded-lg text-center font-semibold">
            Lesson added successfully ✓
          </div>
        )}

        <button className="w-full bg-cyan-600 hover:bg-cyan-500 p-4 rounded-lg font-semibold text-lg transition-all duration-300">
          Save Lesson
        </button>
      </form>
    </div>
  );
}
