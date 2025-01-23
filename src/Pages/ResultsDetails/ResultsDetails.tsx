import { NoData } from "@/Assets/Images";
import { AnimationContainer } from "@/Components";
import useToggle from "@/Hooks/useToggle";
import moment from "moment";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./ResultsDetails.module.scss";

interface IParticipants {
  score: number;
  started_at: string;
}

const ResultsDetails = () => {
  const location = useLocation();
  const data = location?.state;
  const [Loading, toggleLoading] = useToggle(true);
  useEffect(() => {
    if (data) {
      toggleLoading();
    } else {
      toggleLoading();
    }
  }, [data]);

  return (
    <>
      <AnimationContainer>
        <div className="p-3 mt-2 overflow-x-auto border-2 rounded-md">
          {Loading ? (
            <h6 className="h-[14px] mb-2 w-[90px] animate-pulse bg-gray-500 rounded-md">
              {""}
            </h6>
          ) : (
            <div className="flex justify-between font-semibold">
              <h2>Results</h2>
            </div>
          )}
          <table className="w-full my-2 border-separate rounded-md border-slate-400">
            <thead className="text-white ">
              {Loading ? (
                <tr className="[&_th]:px-2 [&_th]:py-2 [&_th]:bg-black [&_span]:inline-block [&_span]:h-[12px] [&_span]:w-[80px] [&_span]:animate-pulse [&_span]:bg-gray-500 [&_span]:rounded-md">
                  <th className="rounded-s-md">
                    <span>{""}</span>
                  </th>
                  <th>
                    <span>{""}</span>
                  </th>
                  <th>
                    <span>{""}</span>
                  </th>
                  <th className="rounded-e-md">
                    <span>{""}</span>
                  </th>
                </tr>
              ) : null}

              {data?.participants?.length > 0 && (
                <tr className="[&_th]:px-2 [&_th]:py-2 [&_th]:bg-black [&_th]:font-semibold">
                  <th className="rounded-s-md">TITLE</th>
                  <th>Score</th>
                  <th>Average</th>
                  <th className="rounded-e-md">Started At</th>
                </tr>
              )}
            </thead>
            <tbody className="text-center text-gray-500 divide-y">
              {Loading
                ? Array.from({ length: 7 }, (_, idx) => (
                    <tr
                      key={idx}
                      className="bg-white dark:border-gray-700 hover:bg-blue-200
            [&_td]:py-3 [&_td]:border [&_td]:border-slate-300
            [&_span]:inline-block [&_span]:h-[14px] [&_span]:w-[80px] [&_span]:animate-pulse [&_span]:bg-gray-500 [&_span]:rounded-md"
                    >
                      <td className=" whitespace-nowrap">
                        <span>{""}</span>
                      </td>
                      <td>
                        <span>{""}</span>
                      </td>
                      <td>
                        <span>{""}</span>
                      </td>
                      <td>
                        <span>{""}</span>
                      </td>
                    </tr>
                  ))
                : null}

              {data?.participants?.length == 0 && (
                <div className="flex flex-col items-center justify-center gap-3">
                  <img src={NoData} alt="NoData" />
                  <p className="text-xl font-bold tracking-wider text-red-500">
                    No Students Joined Exam
                  </p>
                </div>
              )}
              {data?.participants?.length > 0 &&
                data?.participants?.map(
                  ({ score, started_at }: IParticipants, idx: number) => (
                    <tr
                      key={idx}
                      className="bg-white dark:border-gray-700 hover:bg-blue-200
            [&_td]:py-3 [&_td]:border [&_td]:border-slate-300"
                    >
                      <td className="font-medium truncate whitespace-nowrap">
                        {data?.quiz?.title}
                      </td>
                      <td className="font-medium truncate whitespace-nowrap">
                        {score}
                      </td>
                      <td className="font-medium truncate whitespace-nowrap">
                        {data?.participants?.length}
                      </td>
                      <td>{moment(started_at).format("HH:mm A")}</td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
        </div>
      </AnimationContainer>
    </>
  );
};

export default ResultsDetails;
