import { quizImg } from "@/Assets/Images";
import { AnimationContainer, QuizzesCardSkeleton } from "@/Components";
import {
  ICompletedQuizzes,
  IUpcomingQuizzes,
} from "@/InterFaces/QuizzesInterFaces";
import {
  useCompletedQuizzesQuery,
  useGetFirstUpcomingQuizzesQuery,
} from "@/Redux/Services/Quizzes/QuizzesSlice";
import CookieServices from "@/Services/CookieServices/CookieServices";
import { List } from "@/Utils/Helpers/Variables/Variables";
import { ArrowRight } from "lucide-react";
import moment from "moment";
import { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./Quizzes.module.scss";
import { CreateQuizModal, InfoQuizModal } from "./QuizzesModels";
import StudentQuizzesPage from "./StudentQuizzesPage";
import useToggle from "@/Hooks/useToggle";

const Quizzes = () => {
  const { t } = useTranslation();

  //* ***************Create New Quiz ***************
  const [isOpen, toggle] = useToggle();
  const openModal = () => toggle();
  const closeModal = () => toggle();

  //* *************** Quiz Code ***************
  const [quizCode, setQuizCode] = useState("");
  const [isOpenInfoModel, toggleInfoModel] = useToggle();
  const openInfoModel = (code: string) => {
    toggleInfoModel();
    setQuizCode(code);
  };
  const closeInfoModel = () => toggleInfoModel();

  const { isLoading: upcomingQuizzesLoading, data: UpcomingQuizzes } =
    useGetFirstUpcomingQuizzesQuery(0);
  const { isLoading: completedQuizzesLoading, data: CompletedQuizzes } =
    useCompletedQuizzesQuery(0);
  const [allDataLoaded, toggleAllDataLoaded] = useToggle();

  useLayoutEffect(() => {
    if (!upcomingQuizzesLoading && !completedQuizzesLoading) {
      toggleAllDataLoaded();
    }
  }, [upcomingQuizzesLoading, completedQuizzesLoading]);

  return (
    <>
      {CookieServices.get("role").role === "Instructor" ? (
        <>
          <CreateQuizModal {...{ isOpen, closeModal, openInfoModel }} />
          <InfoQuizModal {...{ isOpenInfoModel, closeInfoModel, quizCode }} />
        </>
      ) : null}

      <AnimationContainer>
        <div className="flex w-full gap-3 ">
          {CookieServices.get("role").role === "Instructor" ? (
            <>
              <div className="flex flex-col space-y-2 ">
                {!allDataLoaded &&
                  Array.from({ length: 3 }, (_, idx) => (
                    <div
                      key={idx}
                      className=" hidden sm:block  sm:w-[130px]  md:w-[200px] h-[190px] animate-pulse bg-gray-500  quizBox border-2 border-gray-200  rounded-md "
                    ></div>
                  ))}

                {allDataLoaded &&
                  List?.map(({ icon, text, className, path }) => (
                    <Link onClick={openModal} key={text} to={path}>
                      <figure className="flex flex-col max-w-[250px] h-[190px] p-1 items-center justify-center  quizBox border-2 cursor-pointer  border-gray-200  text-center rounded-md">
                        <img
                          src={icon}
                          className={`${className} m-auto my-1 `}
                          alt="quiz icon for set up a new quiz"
                        />
                        <figcaption className="my-1 overflow-y-hidden font-bold leading-tight capitalize">
                          <h3>{t(text)}</h3>
                        </figcaption>
                      </figure>
                    </Link>
                  ))}
              </div>

              <div className="flex flex-col flex-1 ">
                <div className="p-3 border-2 rounded-md">
                  {!allDataLoaded ? (
                    <h6 className="h-[14px] w-[90px] animate-pulse bg-gray-500 rounded-md">
                      {""}
                    </h6>
                  ) : (
                    <h2 className="font-semibold ">{t("UpcomingQuizzes")}</h2>
                  )}
                  {!allDataLoaded &&
                    Array.from({ length: 1 }, (_, idx) => (
                      <QuizzesCardSkeleton key={idx} />
                    ))}
                  {allDataLoaded &&
                    UpcomingQuizzes?.map(
                      ({
                        title,
                        createdAt,
                        schadule,
                        _id,
                      }: IUpcomingQuizzes) => (
                        <div
                          key={_id}
                          className="flex items-center mt-4 border-2 rounded-lg "
                        >
                          <img
                            src={quizImg}
                            alt="quizImg"
                            className="bg-secondColor w-[120px] p-3 hidden sm:block h-[120px] rounded-md"
                          />
                          <div className="w-full p-3 ">
                            <h3 className="font-bold ">{title}</h3>
                            <div className="text-[#777]">
                              <span>
                                {moment(createdAt).format("Do MMM YY")}
                              </span>{" "}
                              | <span>{moment(schadule).format("HH:mmA")}</span>
                            </div>
                            <div className="flex items-center justify-between mt-3">
                              <span className="font-bold">
                                No. of student’s enrolled: 32
                              </span>
                              <Link
                                className="flex items-center gap-1 font-bold"
                                to={`/dashboard/quiz-details/${_id}`}
                              >
                                Open{" "}
                                <ArrowRight
                                  className="rounded-full bg-mainColor"
                                  size={15}
                                  strokeWidth={4}
                                  color="white"
                                />
                              </Link>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                </div>

                <div className="p-3 mt-2 overflow-x-auto border-2 rounded-md">
                  {!allDataLoaded ? (
                    <div className="flex justify-between [&_h6]:animate-pulse [&_h6]:bg-gray-500 [&_h6]:rounded-md">
                      <h6 className="h-[14px] mb-2 w-[90px]">{""}</h6>
                      <h6 className="flex items-center text-xs h-[10px] w-[70px] ">
                        {""}
                      </h6>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between font-semibold">
                      <h3>{t("CompletedQuizzes")}</h3>
                      <Link
                        className="flex items-center "
                        to={"/dashboard/results"}
                      >
                        {t("results")}{" "}
                        <ArrowRight
                          className="p-1 "
                          size={23}
                          strokeWidth={4}
                          color="#C5D86D"
                        />
                      </Link>
                    </div>
                  )}

                  <table className="w-full mt-2 border-2 border-separate rounded-md border-slate-400">
                    <thead className="text-white ">
                      {!allDataLoaded ? (
                        <tr
                          className="[&_span]:inline-block [&_span]:h-[14px] [&_span]:w-[80px] [&_span]:animate-pulse [&_span]:bg-gray-500 [&_span]:rounded-md
                        [&_th]:px-2 [&_th]:py-3 [&_th]:bg-black"
                        >
                          <th>
                            <span>{""}</span>
                          </th>
                          <th>
                            <span>{""}</span>
                          </th>
                          <th className="hidden lg:table-cell">
                            <span>{""}</span>
                          </th>
                          <th className="hidden md:table-cell">
                            <span>{""}</span>
                          </th>
                          <th>
                            <span>{""}</span>
                          </th>
                        </tr>
                      ) : (
                        <tr className="[&_th]:px-2 [&_th]:py-3 [&_th]:font-semibold [&_th]:bg-black">
                          <th>TITLE</th>
                          <th>STATUS</th>
                          <th className="hidden lg:table-cell">ENROLLED</th>
                          <th className="hidden md:table-cell">SCHEDULE</th>
                          <th>CLOSED</th>
                        </tr>
                      )}
                    </thead>
                    <tbody className="text-center text-black divide-y">
                      {!allDataLoaded
                        ? Array.from({ length: 5 }, (_, idx) => (
                            <tr
                              key={idx}
                              className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-blue-200  
                  [&_td]:py-3 [&_td]:bg-white [&_td]:border [&_td]:border-slate-300
                    [&_span]:inline-block [&_span]:h-[14px] [&_span]:w-[80px] [&_span]:animate-pulse [&_span]:bg-gray-500 [&_span]:rounded-md"
                            >
                              <td className="whitespace-nowrap ">
                                <span>{""}</span>
                              </td>
                              <td>
                                <span>{""}</span>
                              </td>
                              <td className="hidden lg:table-cell">
                                <span>{""}</span>
                              </td>
                              <td className="hidden md:table-cell">
                                <span>{""}</span>
                              </td>
                              <td>
                                <span>{""}</span>
                              </td>
                            </tr>
                          ))
                        : null}

                      {allDataLoaded &&
                        CompletedQuizzes?.map(
                          ({
                            title,
                            status,
                            participants,
                            schadule,
                            closed_at,
                            _id,
                          }: ICompletedQuizzes) => (
                            <tr
                              key={_id}
                              className="bg-white dark:border-gray-700 hover:bg-blue-200
                                        [&_td]:py-3 [&_td]:border [&_td]:border-slate-300"
                            >
                              <td className=" whitespace-nowrap font-medium truncate">
                                {title}
                              </td>
                              <td>
                                <span className="p-1 font-medium tracking-wider text-red-800 bg-red-200 rounded-full ">
                                  {status}
                                </span>
                              </td>
                              <td className="hidden  lg:table-cell">
                                {participants}
                              </td>
                              <td className="hidden  md:table-cell ">
                                {moment(schadule).format("Do MMM YY")}
                              </td>
                              <td>{moment(closed_at).format("HH:mm A")}</td>
                            </tr>
                          )
                        )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <StudentQuizzesPage
              {...{ CompletedQuizzes, UpcomingQuizzes, allDataLoaded }}
            />
          )}
        </div>
      </AnimationContainer>
    </>
  );
};

export default Quizzes;
