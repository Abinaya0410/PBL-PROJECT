import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import StudentOnboarding from "./pages/StudentOnboarding";
import TeacherOnboarding from "./pages/TeacherOnboarding";
import CreateCourse from "./pages/CreateCourse";
import MyCourses from "./pages/MyCourses";
import CourseBuilder from "./pages/CourseBuilder";
import AddLesson from "./pages/AddLesson";
import EditLesson from "./pages/EditLesson";
import UploadQuestions from "./pages/UploadQuestions";
import LessonDetails from "./pages/LessonDetails";
import CreateQuiz from "./pages/CreateQuiz";
import StudentCourses from "./pages/StudentCourses";
import AvailableCourses from "./pages/AvailableCourses";
import StudentCourseView from "./pages/StudentCourseView";
import MyCoursesStudent from "./pages/MyCoursesStudent";
import StudentLessonView from "./pages/StudentLessonView";
import AttemptQuiz from "./pages/AttemptQuiz";
import QuizInstructions from "./pages/QuizInstructions";
import CompletedCourses from "./pages/CompletedCourses";
import QuizAttempts from "./pages/QuizAttempts";
import StudentProfile from "./pages/StudentProfile";
import EditQuestion from "./pages/EditQuestion";
import StudentAnalytics from "./pages/StudentAnalytics";
import QuizAttemptReview from "./pages/QuizAttemptReview";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student-onboarding" element={<StudentOnboarding />} />
        <Route path="/teacher-onboarding" element={<TeacherOnboarding />} />
        <Route path="/create-course" element={<CreateCourse />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/course/:id" element={<CourseBuilder />} />
        <Route path="/add-lesson/:id" element={<AddLesson />} />
        <Route path="/edit-lesson/:lessonId" element={<EditLesson />} />
        <Route path="/quiz-attempt/:attemptId" element={<QuizAttemptReview />} />
        <Route path="/lesson-details/:lessonId" element={<LessonDetails />} />
         <Route path="/upload-questions/:lessonId" element={<UploadQuestions />} />
           <Route path="/create-quiz/:courseId" element={<CreateQuiz />} />
{/* <Route path="/create-quiz/:courseId" element={<CreateQuiz />} /> */}
<Route path="/student-dashboard" element={<StudentDashboard />} />
<Route path="/student-courses" element={<StudentCourses />} />
<Route path="/student-course/:id" element={<StudentCourseView />} />
<Route path="/available-courses" element={<AvailableCourses />} />
<Route path="/my-courses-student" element={<MyCoursesStudent />} />
{/* <Route path="/student-lesson/:id" element={<StudentLessonView />} /> */}
<Route path="/student-lesson/:lessonId" element={<LessonDetails />} />

<Route path="/attempt-quiz/:courseId" element={<AttemptQuiz />} />
<Route path="/quiz-instructions/:courseId" element={<QuizInstructions />} />
<Route path="/completed-courses" element={<CompletedCourses />} />
<Route path="/quiz-attempts" element={<QuizAttempts />} />
<Route path="/student-profile" element={<StudentProfile />} />
<Route path="/edit-question/:questionId" element={<EditQuestion />} />
<Route path="/student-analytics" element={<StudentAnalytics />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
