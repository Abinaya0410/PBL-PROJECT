
// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// export default function CreateQuiz() {
//   const { courseId } = useParams();

//   const [title, setTitle] = useState("");
//   const [course, setCourse] = useState(null);
//   const [success, setSuccess] = useState(false);

//   const [questions, setQuestions] = useState([
//     {
//       question: "",
//       options: ["", "", "", ""],
//       correctAnswer: ""
//     }
//   ]);

//   useEffect(() => {
//     fetchCourse();
//   }, []);

//   const fetchCourse = async () => {
//     const token = localStorage.getItem("token");

//     const res = await fetch("http://localhost:5000/api/courses/teacher", {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });

//     const data = await res.json();
//     const current = data.find(c => c._id === courseId);
//     setCourse(current);

//     if (current) {
//       setTitle(`${current.title} Final Quiz`);
//     }
//   };

//   const addQuestion = () => {
//     setQuestions([
//       ...questions,
//       { question: "", options: ["", "", "", ""], correctAnswer: "" }
//     ]);
//   };

//   const handleQuestionChange = (index, value) => {
//     const updated = [...questions];
//     updated[index].question = value;
//     setQuestions(updated);
//   };

//   const handleOptionChange = (qIndex, optIndex, value) => {
//     const updated = [...questions];
//     updated[qIndex].options[optIndex] = value;
//     setQuestions(updated);
//   };

//   const handleCorrectAnswer = (index, value) => {
//     const updated = [...questions];
//     updated[index].correctAnswer = value;
//     setQuestions(updated);
//   };

//   const saveQuiz = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       await axios.post(
//         "http://localhost:5000/api/course-quiz",
//         {
//           title,
//           courseId,
//           questions
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       setSuccess(true);
//     } catch (err) {
//       console.log(err.response?.data || err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-10">
      
//       {/* HEADER */}
//       <div className="bg-slate-900/60 backdrop-blur-md p-6 rounded-xl border border-purple-500/20 mb-8 shadow-lg">
//         <h1 className="text-3xl font-bold text-purple-400">
//           Create Quiz for {course?.title || "Course"}
//         </h1>
//         <p className="text-gray-400 mt-2">
//           Add questions to build the final assessment for this course.
//         </p>
//       </div>

//       {/* SUCCESS MESSAGE */}
//       {success && (
//         <div className="bg-emerald-600/20 border border-emerald-500 p-4 rounded-lg mb-6">
//           Quiz saved successfully ✔
//         </div>
//       )}

//       {/* QUIZ TITLE */}
//       <input
//         type="text"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         className="w-full mb-8 p-4 rounded-lg bg-slate-800 border border-purple-500/30"
//         placeholder="Quiz Title"
//       />

//       {/* QUESTIONS */}
//       {questions.map((q, index) => (
//         <div key={index} className="mb-8 p-6 bg-slate-900 border border-slate-700 rounded-xl">
          
//           <input
//             type="text"
//             placeholder="Enter Question"
//             value={q.question}
//             onChange={(e) => handleQuestionChange(index, e.target.value)}
//             className="w-full mb-4 p-3 rounded bg-slate-800"
//           />

//           {q.options.map((opt, optIndex) => (
//             <input
//               key={optIndex}
//               type="text"
//               placeholder={`Option ${optIndex + 1}`}
//               value={opt}
//               onChange={(e) =>
//                 handleOptionChange(index, optIndex, e.target.value)
//               }
//               className="w-full mb-2 p-3 rounded bg-slate-800"
//             />
//           ))}

//           <input
//             type="text"
//             placeholder="Correct Answer"
//             value={q.correctAnswer}
//             onChange={(e) => handleCorrectAnswer(index, e.target.value)}
//             className="w-full mt-3 p-3 rounded bg-emerald-700"
//           />
//         </div>
//       ))}

//       {/* ACTION BUTTONS */}
//       <div className="flex gap-4">
//         <button
//           onClick={addQuestion}
//           className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-semibold"
//         >
//           + Add Question
//         </button>

//         <button
//           onClick={saveQuiz}
//           className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-semibold"
//         >
//           Save Quiz
//         </button>
//       </div>
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function CreateQuiz() {
  const { courseId } = useParams();

  const [title, setTitle] = useState("");
  const [course, setCourse] = useState(null);
  const [success, setSuccess] = useState(false);
  const [quizId, setQuizId] = useState(null);

  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], correctAnswer: "" }
  ]);

  const [savedQuestions, setSavedQuestions] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    fetchCourse();
    fetchExistingQuiz();
  }, []);

  // =========================
  // FETCH COURSE INFO
  // =========================
  const fetchCourse = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/courses/teacher", {
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();
    const current = data.find(c => c._id === courseId);
    setCourse(current);

    if (current) {
      setTitle(`${current.title} Final Quiz`);
    }
  };

  // =========================
  // FETCH EXISTING QUIZ
  // =========================
  const fetchExistingQuiz = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:5000/api/course-quiz/${courseId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const data = await res.json();

    if (data) {
      setQuizId(data._id);
      setSavedQuestions(data.questions || []);
    }
  };

  // =========================
  // ADD NEW QUESTION
  // =========================
  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], correctAnswer: "" }
    ]);
  };

  const handleQuestionChange = (index, value) => {
    const updated = [...questions];
    updated[index].question = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const handleCorrectAnswer = (index, value) => {
    const updated = [...questions];
    updated[index].correctAnswer = value;
    setQuestions(updated);
  };

  // =========================
  // SAVE QUIZ
  // =========================
  const saveQuiz = async () => {
    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/course-quiz",
      { title, courseId, questions },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setSuccess(true);
    fetchExistingQuiz();
  };

  // =========================
  // DELETE QUESTION
  // =========================
  const deleteQuestion = async (index) => {
    const token = localStorage.getItem("token");

    await fetch(
      `http://localhost:5000/api/course-quiz/${quizId}/question/${index}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    fetchExistingQuiz();
  };

  // =========================
  // EDIT QUESTION
  // =========================
  const saveEdit = async (index) => {
    const token = localStorage.getItem("token");
    const q = savedQuestions[index];

    await fetch(
      `http://localhost:5000/api/course-quiz/${quizId}/question/${index}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(q)
      }
    );

    setEditIndex(null);
    fetchExistingQuiz();
  };

  const updateSavedQuestion = (qIndex, field, value) => {
    const updated = [...savedQuestions];
    updated[qIndex][field] = value;
    setSavedQuestions(updated);
  };

  const updateSavedOption = (qIndex, optIndex, value) => {
    const updated = [...savedQuestions];
    updated[qIndex].options[optIndex] = value;
    setSavedQuestions(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-10">

      <h1 className="text-3xl font-bold text-purple-400 mb-6">
        Create Quiz for {course?.title}
      </h1>

      {success && (
        <div className="bg-emerald-600/20 border border-emerald-500 p-4 rounded-lg mb-6">
          Quiz saved successfully ✔
        </div>
      )}

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-8 p-4 rounded bg-slate-800"
      />

      {/* NEW QUESTIONS */}
      {questions.map((q, index) => (
        <div key={index} className="mb-6 p-6 bg-slate-900 rounded-xl">
          <input
            placeholder="Question"
            value={q.question}
            onChange={(e) => handleQuestionChange(index, e.target.value)}
            className="w-full mb-3 p-3 bg-slate-800"
          />

          {q.options.map((opt, i) => (
            <input
              key={i}
              value={opt}
              onChange={(e) => handleOptionChange(index, i, e.target.value)}
              className="w-full mb-2 p-3 bg-slate-800"
            />
          ))}

          <input
            placeholder="Correct Answer"
            value={q.correctAnswer}
            onChange={(e) => handleCorrectAnswer(index, e.target.value)}
            className="w-full p-3 bg-emerald-700"
          />
        </div>
      ))}

      <button
        onClick={addQuestion}
        className="px-6 py-3 bg-purple-600 rounded-lg mr-4"
      >
        + Add Question
      </button>

      <button
        onClick={saveQuiz}
        className="px-6 py-3 bg-emerald-600 rounded-lg"
      >
        Save Quiz
      </button>

      {/* SAVED QUESTIONS */}
      <h2 className="text-2xl mt-12 mb-4">Saved Questions</h2>

      {savedQuestions.map((q, index) => (
        <div key={index} className="p-6 mb-4 bg-slate-900 rounded-xl">

          {editIndex === index ? (
            <>
              <input
                value={q.question}
                onChange={(e) =>
                  updateSavedQuestion(index, "question", e.target.value)
                }
                className="w-full mb-3 p-3 bg-slate-800"
              />

              {q.options.map((opt, i) => (
                <input
                  key={i}
                  value={opt}
                  onChange={(e) =>
                    updateSavedOption(index, i, e.target.value)
                  }
                  className="w-full mb-2 p-3 bg-slate-800"
                />
              ))}

              <input
                value={q.correctAnswer}
                onChange={(e) =>
                  updateSavedQuestion(index, "correctAnswer", e.target.value)
                }
                className="w-full mb-3 p-3 bg-emerald-700"
              />

              <button
                onClick={() => saveEdit(index)}
                className="bg-emerald-600 px-4 py-2 rounded mr-3"
              >
                Save
              </button>

              <button
                onClick={() => setEditIndex(null)}
                className="bg-slate-600 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <h3 className="font-semibold mb-2">{q.question}</h3>
              <ul className="text-gray-400">
                {q.options.map((opt, i) => (
                  <li key={i}>{opt}</li>
                ))}
              </ul>

              <p className="text-emerald-400 mt-2">
                Correct: {q.correctAnswer}
              </p>

              <div className="mt-3 flex gap-3">
                <button
                  onClick={() => setEditIndex(index)}
                  className="bg-yellow-500 px-4 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteQuestion(index)}
                  className="bg-red-600 px-4 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
