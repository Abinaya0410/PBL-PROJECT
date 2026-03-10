// import { useState } from "react";
// import { useParams } from "react-router-dom";

// export default function UploadQuestions() {
//   const { courseId } = useParams();

//   const [questionData, setQuestionData] = useState({
//     question: "",
//     optionA: "",
//     optionB: "",
//     optionC: "",
//     optionD: "",
//     correctAnswer: "",
//   });

//   const [success, setSuccess] = useState(false);

//   const handleChange = (e) => {
//     setQuestionData({
//       ...questionData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       await fetch("http://localhost:5000/api/questionbanks/add", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           ...questionData,
//           courseId,
//         }),
//       });

//       setSuccess(true);

//       setQuestionData({
//         question: "",
//         optionA: "",
//         optionB: "",
//         optionC: "",
//         optionD: "",
//         correctAnswer: "",
//       });

//       setTimeout(() => setSuccess(false), 2000);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-950 text-white p-10">
//       <div className="max-w-3xl mx-auto bg-slate-900 p-8 rounded-2xl shadow-xl border border-purple-500/20">
        
//         <h2 className="text-3xl font-bold text-purple-400 mb-6">
//           Upload Question Bank
//         </h2>

//         {success && (
//           <div className="bg-emerald-500/10 border border-emerald-500 p-4 rounded-lg mb-6">
//             Question added successfully!
//           </div>
//         )}

//         <textarea
//           name="question"
//           value={questionData.question}
//           onChange={handleChange}
//           placeholder="Enter Question"
//           className="w-full p-3 mb-4 bg-slate-800 rounded"
//         />

//         <input
//           name="optionA"
//           value={questionData.optionA}
//           onChange={handleChange}
//           placeholder="Option A"
//           className="w-full p-3 mb-3 bg-slate-800 rounded"
//         />

//         <input
//           name="optionB"
//           value={questionData.optionB}
//           onChange={handleChange}
//           placeholder="Option B"
//           className="w-full p-3 mb-3 bg-slate-800 rounded"
//         />

//         <input
//           name="optionC"
//           value={questionData.optionC}
//           onChange={handleChange}
//           placeholder="Option C"
//           className="w-full p-3 mb-3 bg-slate-800 rounded"
//         />

//         <input
//           name="optionD"
//           value={questionData.optionD}
//           onChange={handleChange}
//           placeholder="Option D"
//           className="w-full p-3 mb-4 bg-slate-800 rounded"
//         />

//         <input
//           name="correctAnswer"
//           value={questionData.correctAnswer}
//           onChange={handleChange}
//           placeholder="Correct Answer (A/B/C/D)"
//           className="w-full p-3 mb-6 bg-slate-800 rounded"
//         />

//         <button
//           onClick={handleSubmit}
//           className="bg-purple-500 hover:bg-purple-400 px-6 py-3 rounded-lg font-semibold transition"
//         >
//           Add Question
//         </button>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import { useParams } from "react-router-dom";

export default function UploadQuestions() {
  const { lessonId } = useParams();   // IMPORTANT: lessonId, not courseId

  const [form, setForm] = useState({
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
       console.log("FRONTEND lessonId:", lessonId);
      const res = await fetch(
        `http://localhost:5000/api/lessons/${lessonId}/question-bank`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            question: form.question,
            options: [
              form.optionA,
              form.optionB,
              form.optionC,
              form.optionD,
            ],
            correctAnswer: form.correctAnswer,
            difficulty: "medium",
          }),
        }
      );

      const data = await res.json();
      console.log("Saved:", data);

      setSuccess(true);

      setForm({
        question: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctAnswer: "",
      });

      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <div className="max-w-3xl mx-auto bg-slate-900 p-8 rounded-2xl shadow-xl border border-purple-500/20">
        <h2 className="text-3xl font-bold text-purple-400 mb-6">
          Add Questions to Lesson
        </h2>

        {success && (
          <div className="bg-emerald-500/10 border border-emerald-500 p-4 rounded-lg mb-6">
            Question saved successfully!
          </div>
        )}

        <textarea
          name="question"
          value={form.question}
          onChange={handleChange}
          placeholder="Enter Question"
          className="w-full p-3 mb-4 bg-slate-800 rounded"
        />

        <input
          name="optionA"
          value={form.optionA}
          onChange={handleChange}
          placeholder="Option A"
          className="w-full p-3 mb-3 bg-slate-800 rounded"
        />

        <input
          name="optionB"
          value={form.optionB}
          onChange={handleChange}
          placeholder="Option B"
          className="w-full p-3 mb-3 bg-slate-800 rounded"
        />

        <input
          name="optionC"
          value={form.optionC}
          onChange={handleChange}
          placeholder="Option C"
          className="w-full p-3 mb-3 bg-slate-800 rounded"
        />

        <input
          name="optionD"
          value={form.optionD}
          onChange={handleChange}
          placeholder="Option D"
          className="w-full p-3 mb-4 bg-slate-800 rounded"
        />

        <input
          name="correctAnswer"
          value={form.correctAnswer}
          onChange={handleChange}
          placeholder="Correct Answer (A/B/C/D)"
          className="w-full p-3 mb-6 bg-slate-800 rounded"
        />

        <button
          onClick={handleSubmit}
          className="bg-purple-500 hover:bg-purple-400 px-6 py-3 rounded-lg font-semibold transition"
        >
          Save Question
        </button>
      </div>
    </div>
  );
}
