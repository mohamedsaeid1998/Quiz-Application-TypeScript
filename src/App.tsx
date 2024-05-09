//@ts-nocheck
import { Provider } from "react-redux";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthLayout, InstructorProtectedRoute, MasterLayout, ProtectedRoute, StudentProtectedRoute } from "./Components";
import { ExamQuestions, ForgetPassword, Groups, Home, Login, NotFound, Questions, QuizDetails, Quizzes, Register, ResetPassword, Results, ResultsDetails, Students } from "./Pages";
import store from "./Redux/store";

function App() {

  const routes = createHashRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "reset-password", element: <ResetPassword /> },
      ],
    },

    {
      path: "dashboard",
      element: (
        <ProtectedRoute>
          <MasterLayout />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { path: "home", element: <InstructorProtectedRoute><Home /></InstructorProtectedRoute> },
        { path: "groups", element: <InstructorProtectedRoute><Groups /></InstructorProtectedRoute> },
        { path: "quiz", element: <Quizzes /> },
        { path: "quiz-details/:id", element: <InstructorProtectedRoute><QuizDetails /></InstructorProtectedRoute> },
        { path: "exam-questions/:id", element: <StudentProtectedRoute><ExamQuestions /></StudentProtectedRoute> },
        { path: "questions", element: <InstructorProtectedRoute><Questions /></InstructorProtectedRoute> },
        { path: "results", element: <Results /> },
        { path: "results-details", element: <InstructorProtectedRoute><ResultsDetails /></InstructorProtectedRoute> },
        { path: "student", element: <InstructorProtectedRoute><Students /></InstructorProtectedRoute> },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer theme="dark" autoClose={2000} />
      <Provider store={store}>
        <RouterProvider router={routes} />
      </Provider>
    </>
  );
}

export default App;
