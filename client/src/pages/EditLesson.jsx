// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function EditLesson() {
//   const { lessonId } = useParams();
//   const navigate = useNavigate();

//   const [lesson, setLesson] = useState({
//     title: "",
//     description: "",
//     textContent: "",
//     videoUrl: "",
//     order: 1,
//   });

//   const [success, setSuccess] = useState(false);

//   useEffect(() => {
//     fetchLesson();
//   }, []);

//   const fetchLesson = async () => {
//     const res = await axios.get(`/api/lessons/${lessonId}`);
//     setLesson(res.data);
//   };

//   const handleChange = (e) => {
//     setLesson({ ...lesson, [e.target.name]: e.target.value });
//   };

//   const handleUpdate = async () => {
//     await axios.put(`/api/lessons/${lessonId}`, lesson);
//     setSuccess(true);

//     setTimeout(() => {
//       navigate(-1);
//     }, 1500);
//   };

//   return (
//     <div className="min-h-screen bg-slate-900 text-white p-10">
//       <div className="max-w-3xl mx-auto bg-slate-800 p-8 rounded-2xl shadow-xl">
//         <h2 className="text-3xl font-bold mb-6 text-cyan-400">
//           Edit Lesson
//         </h2>

//         {success && (
//           <div className="bg-green-500/20 border border-green-500 p-4 rounded-lg mb-4">
//             Lesson updated successfully!
//           </div>
//         )}

//         <input
//           name="title"
//           value={lesson.title}
//           onChange={handleChange}
//           placeholder="Lesson Title"
//           className="w-full p-3 mb-4 bg-slate-700 rounded"
//         />

//         <textarea
//           name="description"
//           value={lesson.description}
//           onChange={handleChange}
//           placeholder="Lesson Description"
//           className="w-full p-3 mb-4 bg-slate-700 rounded"
//         />

//         <textarea
//           name="textContent"
//           value={lesson.textContent}
//           onChange={handleChange}
//           placeholder="Text Content"
//           className="w-full p-3 mb-4 bg-slate-700 rounded"
//         />

//         <input
//           name="videoUrl"
//           value={lesson.videoUrl}
//           onChange={handleChange}
//           placeholder="Video URL"
//           className="w-full p-3 mb-4 bg-slate-700 rounded"
//         />

//         <input
//           type="number"
//           name="order"
//           value={lesson.order}
//           onChange={handleChange}
//           className="w-full p-3 mb-6 bg-slate-700 rounded"
//         />

//         <button
//           onClick={handleUpdate}
//           className="bg-cyan-500 px-6 py-3 rounded-lg font-semibold hover:bg-cyan-400"
//         >
//           Update Lesson
//         </button>
//       </div>
//     </div>
//   );
// }




import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditLesson() {
  const { lessonId } = useParams();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState({
    title: "",
    description: "",
    textContent: "",
    videoUrl: "",
    order: 1,
  });

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchLesson();
  }, []);

  const fetchLesson = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/api/lessons/${lessonId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setLesson({
        title: data.title || "",
        description: data.description || "",
        textContent: data.textContent || "",
        videoUrl: data.videoUrl || "",
        order: data.order || 1,
      });

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setLesson({ ...lesson, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      await fetch(
        `http://localhost:5000/api/lessons/${lessonId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(lesson),
        }
      );

      setSuccess(true);

      setTimeout(() => {
        navigate(-1);
      }, 1500);
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        Loading lesson...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-10">
      <div className="max-w-3xl mx-auto bg-slate-800 p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-cyan-400">
          Edit Lesson
        </h2>

        {success && (
          <div className="bg-green-500/20 border border-green-500 p-4 rounded-lg mb-4">
            Lesson updated successfully!
          </div>
        )}

        <input
          name="title"
          value={lesson.title}
          onChange={handleChange}
          placeholder="Lesson Title"
          className="w-full p-3 mb-4 bg-slate-700 rounded"
        />

        <textarea
          name="description"
          value={lesson.description}
          onChange={handleChange}
          placeholder="Lesson Description"
          className="w-full p-3 mb-4 bg-slate-700 rounded"
        />

        <textarea
          name="textContent"
          value={lesson.textContent}
          onChange={handleChange}
          placeholder="Text Content"
          className="w-full p-3 mb-4 bg-slate-700 rounded"
        />

        <input
          name="videoUrl"
          value={lesson.videoUrl}
          onChange={handleChange}
          placeholder="Video URL"
          className="w-full p-3 mb-4 bg-slate-700 rounded"
        />

        <input
          type="number"
          name="order"
          value={lesson.order}
          onChange={handleChange}
          className="w-full p-3 mb-6 bg-slate-700 rounded"
        />

        <button
          onClick={handleUpdate}
          className="bg-cyan-500 px-6 py-3 rounded-lg font-semibold hover:bg-cyan-400"
        >
          Update Lesson
        </button>
      </div>
    </div>
  );
}
