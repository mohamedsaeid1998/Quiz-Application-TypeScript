import { quizIcon, quizImg, studentLogo } from "@/Assets/Images";
import { Button, QuizzesCardSkeleton } from "@/Components";
import useToggle from "@/Hooks/useToggle";
import {
  ICompletedQuizzes,
  IUpcomingQuizzes,
} from "@/InterFaces/QuizzesInterFaces";
import { ArrowRight } from "lucide-react";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { JoinQuizModal } from "./QuizzesModels";

interface IProps {
  CompletedQuizzes: [];
  UpcomingQuizzes: [];
  allDataLoaded: boolean;
}

const StudentQuizzesPage = ({
  CompletedQuizzes,
  UpcomingQuizzes,
  allDataLoaded,
}: IProps) => {
  const { t } = useTranslation();
  const [isOpenJoinQuizModel, toggleJoinQuiz] = useToggle();
  const openJoinQuizModel = () => toggleJoinQuiz();
  const closeJoinQuizModel = () => toggleJoinQuiz();

  const List = [
    {
      icon: quizIcon,
      text: "Join Quiz",
      className: "w-10 sm:w-12 lg:w-14 ",
      path: "",
      openModel: openJoinQuizModel,
    },
    {
      icon: studentLogo,
      text: "Results",
      className: "w-12 md:w-20",
      path: "/dashboard/results",
    },
  ];

  return (
    <>
      <JoinQuizModal
        {...{ closeJoinQuizModel, isOpenJoinQuizModel, openJoinQuizModel }}
      />

      <div className="flex w-full gap-3 ">
        <div className="flex flex-col space-y-2 w-[140px] md:w-[200px]  ">
          {!allDataLoaded &&
            Array.from({ length: 2 }, (_, idx) => (
              <div
                key={idx}
                className=" sm:w-[140px]  md:w-[200px] h-[190px] animate-pulse bg-gray-500 quizBox border-2 border-gray-200  rounded-md "
              ></div>
            ))}

          {allDataLoaded &&
            List?.map(({ icon, text, className, path, openModel }) => (
              <Link key={text} to={path}>
                <figure
                  onClick={openModel}
                  className="flex flex-col max-w-[250px] h-[190px] p-1 items-center justify-center  quizBox border-2 cursor-pointer  border-gray-200  text-center rounded-md"
                >
                  <img
                    src={icon}
                    className={`${className} m-auto my-1  `}
                    alt="quiz icon for set up a new quiz"
                  />
                  <figcaption className="my-1 overflow-y-hidden font-bold leading-tight capitalize">
                    <h3>{t(text)}</h3>
                  </figcaption>
                </figure>
              </Link>
            ))}
        </div>

        <div className="flex flex-col flex-1">
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
                ({ title, createdAt, schadule, _id }: IUpcomingQuizzes) => (
                  <div
                    key={_id}
                    className="flex items-center mt-4 border-2 rounded-lg "
                  >
                    <img
                      src={quizImg}
                      alt="quizImg"
                      className="bg-secondColor w-[120px] p-3 hidden sm:block h-[120px] rounded-md"
                    />

                    <div className="flex items-center justify-between w-full p-3 ">
                      <div className="">
                        <h3 className="mb-2 font-bold ">{title}</h3>
                        <div className="text-[#4c4b4b]">
                          <span>{moment(createdAt).format("Do MMM YY")}</span> |{" "}
                          <span>{moment(schadule).format("HH:mmA")}</span>
                        </div>
                        <span className="hidden mt-3 font-bold md:block">
                          No. of student’s enrolled: 32
                        </span>
                      </div>
                      <div onClick={openJoinQuizModel}>
                        <Button
                          className="flex items-center gap-1 font-bold text-white text-md md:me-5 "
                          variant={"secondary"}
                          rounded={"full"}
                        >
                          Join{" "}
                          <ArrowRight
                            className="rounded-full "
                            size={15}
                            strokeWidth={4}
                            color="white"
                          />
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              )}
          </div>

          <div className="p-3 mt-2 overflow-x-auto border-2 rounded-md">
            {!allDataLoaded ? (
              <div className="flex justify-between">
                <h6 className="h-[14px] mb-2 w-[90px] animate-pulse bg-gray-500 rounded-md">
                  {""}
                </h6>
                <h6 className="flex items-center text-xs animate-pulse bg-gray-500 h-[10px] w-[70px] rounded-md ">
                  {""}
                </h6>
              </div>
            ) : (
              <div className="flex justify-between font-semibold">
                {t("CompletedQuizzes")}
                <Link
                  className="flex items-center text-xs"
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
                  <tr className=" [&_th]:px-2 [&_th]:py-3 [&_th]:font-semibold [&_th]:bg-black">
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
                        <td className=" whitespace-nowrap">
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
                        <td className=" font-medium truncate whitespace-nowrap">
                          {title}
                        </td>
                        <td>
                          <span className="p-1 text-sm font-medium tracking-wider text-red-800 bg-red-200 rounded-full ">
                            {status}
                          </span>
                        </td>
                        <td className="hidden lg:table-cell">{participants}</td>
                        <td className="hidden md:table-cell">
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
      </div>
    </>
  );
};

export default StudentQuizzesPage;
