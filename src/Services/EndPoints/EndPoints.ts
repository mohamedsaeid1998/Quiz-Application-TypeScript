// ****************************** BaseUrl ************************************

export const BASE_URL = import.meta.env.VITE_SERVER_URL

// ****************************** Auth ************************************

export const AUTH_URLS = {
  login: "/auth/login",
  register: "/auth/register",
  forgotPass: "/auth/forgot-password",
  resetPass: "/auth/reset-password",
  changePass: "/auth/change-password",
}

// ****************************** Groups ************************************

export const GROUPS_URLS = {
  groupsList: "/group",
  UpdateOrDeleteGroup: (id: string) => `/group/${id}`
}

// ****************************** STUDENTS ************************************

export const STUDENTS_URLS = {
  allStudents: "/student",
  topFiveStudents: "/student/top-five",
  allStudentsWithoutGroups: "/student/without-group",
  StudentDetails: (id: string) => `/student/${id}`
}

// ****************************** Quizzes ************************************

export const QUIZZES_URLS = {
  upcomingQuizzes: "/quiz/incomming",
  completedQuizzes: "/quiz/completed",
  createQuiz: "/quiz",
  quizzesOperations: (id: string) => `/quiz/${id}`,
  joinQuiz: "/quiz/join",
  finishQuiz: (id: string) => `/quiz/submit/${id}`,
}

// ****************************** Results ************************************

export const RESULTS_URLS = {
  resultsList: "/quiz/result",
}

// ****************************** Questions ************************************

export const QUESTIONS_URLS = {
  createQuestion: "/question",
  questionOperations: (id: string) => `/question/${id}`,
  examQuestions: (id: string) =>`/quiz/without-answers/${id}`
}

