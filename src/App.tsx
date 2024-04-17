//@ts-nocheck
import { RouterProvider, createHashRouter } from "react-router-dom";
import { AuthLayout, MasterLayout, ProtectedRoute } from "./Components";
import { ForgetPassword, Groups, Home, Login, NotFound, Questions, QuizDetails, QuizQuestions, Quizzes, Register, ResetPassword, ResultFinal, Results, ResultsDetails, Students } from "./Pages";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "./Redux/store";

// import LoadingComponent from "./Components/Loading/Loading";
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
        { index: true, element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "groups", element: <Groups /> },
        { path: "quiz", element: <Quizzes /> },
        { path: "quiz-details/:id", element: <QuizDetails /> },
        { path: "quiz-questions/:id", element: <QuizQuestions /> },
        { path: "questions", element: <Questions /> },
        { path: "results", element: <Results /> },
        { path: "results-details", element: <ResultsDetails /> },
        { path: "student", element: <Students /> },
        { path: "results-final", element: <ResultFinal /> },
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
