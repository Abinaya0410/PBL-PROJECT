import { useNavigate, useParams } from "react-router-dom";

export default function QuizInstructions() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white flex items-center justify-center">

      <div className="bg-slate-900 p-10 rounded-xl border border-indigo-500/30 w-[600px] text-center">

        <h1 className="text-3xl font-bold text-indigo-400 mb-6">
          Quiz Instructions
        </h1>

        <div className="text-left space-y-3 text-gray-300 mb-8">
          <p><b>Course:</b> Java</p>
          <p><b>Total Questions:</b> 30</p>
          <p><b>Time Limit:</b> 30 Minutes</p>
          <p><b>Passing Score:</b> 60%</p>
          <p><b>Attempts:</b> Unlimited until pass</p>
        </div>

        <button
          onClick={() => navigate(`/attempt-quiz/${courseId}`)}
          className="px-8 py-3 bg-indigo-600 rounded-lg font-semibold hover:bg-indigo-500"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}
