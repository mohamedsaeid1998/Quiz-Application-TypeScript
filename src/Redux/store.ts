import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { AuthenticationApiSlice } from "./Services/Authentication/AuthSlice"
import { QuizzesApiSlice } from "./Services/Quizzes/QuizzesSlice"
import { StudentsApiSlice } from "./Services/Students/StudentsSlice"
import { GroupsApiSlice } from "./Services/Groups/GroupsSlice"
import { ResultsApiSlice } from "./Services/Results/ResultsSlice"
import { QuestionsApiSlice } from "./Services/Questions/QuestionsSlice"

const store = configureStore({
  reducer: {
    [AuthenticationApiSlice.reducerPath]: AuthenticationApiSlice.reducer,
    [QuizzesApiSlice.reducerPath]: QuizzesApiSlice.reducer,
    [StudentsApiSlice.reducerPath]: StudentsApiSlice.reducer,
    [GroupsApiSlice.reducerPath]: GroupsApiSlice.reducer,
    [ResultsApiSlice.reducerPath]: ResultsApiSlice.reducer,
    [QuestionsApiSlice.reducerPath]: QuestionsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }).concat([AuthenticationApiSlice.middleware, QuizzesApiSlice.middleware, StudentsApiSlice.middleware, GroupsApiSlice.middleware, ResultsApiSlice.middleware,QuestionsApiSlice.middleware]),
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
