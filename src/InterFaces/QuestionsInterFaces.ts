export interface IUpcomingQuizzes {
  _id: string
  title: string,
  createdAt: string,
  schadule: string
}

export interface ICompletedQuizzes {
  closed_at: string
  code: string
  createdAt: string
  description: string
  difficulty: string
  duration: number
  group: string
  instructor: string
  participants: number
  questions: []
  questions_number: number
  schadule: string
  score_per_question: number
  status: string
  title: string
  type: string
  updatedAt: string
  __v: number
  _id: string
}
export interface IQuizzesResponse {
  data: {
    closed_at: string
    code: string
    createdAt: string
    description: string
    difficulty: string
    duration: number
    group: string
    instructor: string
    participants: number
    questions: []
    questions_number: number
    schadule: string
    score_per_question: number
    status: string
    title: string
    type: string
    updatedAt: string
    __v: number
    _id: string
  },
  message: string
}

export interface ICreateQuestions {

  title: string,
  description: string,
  options: {
    A: string,
    B: string,
    C: string,
    D: string
  },
  answer: string,
  difficulty: string,
  type: string
}


export interface IEditQuiz {
  title: string,
}

export interface IQuizzesResponse {
  participants: [],
  quiz: {
    closed_at: string
    code: string
    createdAt: string
    description: string
    difficulty: string
    duration: number
    group: string
    instructor: string
    participants: number
    questions: []
    questions_number: number
    schadule: string
    score_per_question: number
    status: string
    title: string
    type: string
    updatedAt: string
    __v: number
    _id: string
  },
}


