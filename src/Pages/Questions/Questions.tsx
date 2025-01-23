import { AnimationContainer, Button, PaginationButtons } from "@/Components";
import { IQuestions } from "@/InterFaces/QuestionsInterFaces";
import { useAllQuestionsQuery } from "@/Redux/Services/Questions/QuestionsSlice";
import { Eye, FilePenLine, Plus, Trash2 } from "lucide-react";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import "./Questions.module.scss";
import {
  CreateQuestionModal,
  DeleteQuestionModal,
  DetailsQuestionModal,
  EditQuestionModal,
} from "./QuestionsModels";
import { RightAnswers } from "@/Types";
import { AnimatePresence, motion } from "framer-motion";
import useToggle from "@/Hooks/useToggle";

const Questions = () => {
  const { t } = useTranslation();

  //? ***************Get Questions ***************
  const { data: allQuestions, isLoading } = useAllQuestionsQuery(0);

  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };
  const questionsPerPage = 5;
  const startIndex = currentPage * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const currentQuestions = allQuestions?.slice(startIndex, endIndex);

  //* ***************Create New Question ***************
  const [isOpen, toggle] = useToggle();
  const openModal = useCallback(() => toggle(), []);
  const closeModal = useCallback(() => toggle(), []);

  //! *************** Delete Question ***************
  const [deleteItemId, setDeleteItem] = useState("");
  const [isOpenDeleteModel, toggleDeleteModel] = useToggle();
  const openModalDelete = useCallback((_id: string) => {
    toggleDeleteModel();
    setDeleteItem(_id);
  }, []);
  const closeModalDelete = useCallback(() => {
    toggleDeleteModel();
    setDeleteItem("");
  }, []);

  //TODO *************** Edit Question ***************
  const [editItemId, setEditItem] = useState("");
  const [rightAnswer, setRightAnswer] = useState<typeof RightAnswers>("A");
  const [isOpenEditModel, toggleEditModel] = useToggle();

  const closeModalEdit = useCallback(() => {
    toggleEditModel();
    setEditItem("");
    setRightAnswer("A");
  }, []);

  const openModalEdit = useCallback(
    (_id: string, answer: typeof RightAnswers) => {
      toggleEditModel();
      setEditItem(_id);
      setRightAnswer(answer);
    },
    []
  );

  //? *************** Get Question Details ***************

  const [isOpenDetailsModel, toggleDetailsModel] = useToggle();
  const [detailsItemId, setDetailsItem] = useState("");
  const closeDetailsModel = useCallback(() => {
    toggleDetailsModel();
    setDetailsItem("");
  }, []);

  const openDetailsModel = useCallback((_id: string) => {
    toggleDetailsModel();
    setDetailsItem(_id);
  }, []);

  return (
    <>
      <CreateQuestionModal {...{ closeModal, isOpen }} />
      <DeleteQuestionModal
        {...{ deleteItemId, isOpenDeleteModel, closeModalDelete }}
      />
      <EditQuestionModal
        {...{ rightAnswer, isOpenEditModel, closeModalEdit, editItemId }}
      />
      <DetailsQuestionModal
        {...{ detailsItemId, isOpenDetailsModel, closeDetailsModel }}
      />

      <AnimationContainer>
        <div className="p-3 mt-2 overflow-x-auto border-2 rounded-md">
          {isLoading ? (
            <div className="flex items-center justify-between font-semibold">
              <h6 className="h-[14px] mb-2 w-[90px] animate-pulse bg-gray-500 rounded-md">
                {""}
              </h6>
              <h6 className="rounded-full h-[35px] w-[145px] bg-gray-500 animate-pulse">
                {""}{" "}
              </h6>
            </div>
          ) : (
            <div className="flex items-center justify-between font-semibold">
              <h3>{t("BankOfQuestions")}</h3>
              <Button
                onClick={openModal}
                variant={"outline"}
                rounded={"full"}
                className="gap-2 text-left group "
              >
                <Plus
                  className="p-1 text-white transition bg-black rounded-full group-hover:bg-white group-hover:text-black duration-0"
                  size={19}
                  strokeWidth={5}
                />{" "}
                <span>{t("AddQuestion")}</span>{" "}
              </Button>
            </div>
          )}

          <table className="w-full mt-2 border-separate rounded-md border-slate-400">
            <thead className="text-white ">
              {isLoading ? (
                <tr className=" [&_th]:px-2 [&_th]:py-2 [&_th]:bg-black [&_span]:inline-block [&_span]:h-[12px] [&_span]:w-[80px] [&_span]:animate-pulse [&_span]:bg-gray-500 [&_span]:rounded-md">
                  <th className="rounded-s-md ">
                    <span>{""}</span>
                  </th>
                  <th className="hidden lg:table-cell">
                    <span>{""}</span>
                  </th>
                  <th className="hidden md:table-cell">
                    <span>{""}</span>
                  </th>
                  <th className="hidden md:table-cell">
                    <span>{""}</span>
                  </th>
                  <th>
                    <span>{""}</span>
                  </th>
                  <th className="rounded-e-md">
                    <span>{""}</span>
                  </th>
                </tr>
              ) : (
                <tr className="[&_th]:px-2 [&_th]:py-2 [&_th]:bg-black [&_th]:font-semibold ">
                  <th className="rounded-s-md">TITLE</th>
                  <th className="hidden lg:table-cell">DESCRIPTION</th>
                  <th className="hidden md:table-cell">RIGHT ANSWER</th>
                  <th className="hidden md:table-cell">DIFFICULTY</th>
                  <th className="hidden md:table-cell">TYPE</th>
                  <th className="rounded-e-md">ACTIONS</th>
                </tr>
              )}
            </thead>
            <tbody className="text-center text-gray-500 divide-y">
              {isLoading
                ? Array.from({ length: 5 }, (_, idx) => (
                    <tr
                      key={idx}
                      className="bg-white dark:border-gray-700 hover:bg-blue-200
                [&_td]:py-3 [&_td]:border [&_td]:border-slate-300  [&_span]:rounded-md [&_span]:bg-gray-500 [&_span]:animate-pulse"
                    >
                      <td className="whitespace-nowrap">
                        <span className="inline-block h-[14px] w-[80px]">
                          {""}
                        </span>
                      </td>
                      <td className="hidden lg:table-cell">
                        <span className="inline-block h-[14px] w-[80px] ">
                          {""}
                        </span>
                      </td>
                      <td className="hidden md:table-cell">
                        <span className="inline-block h-[14px] w-[80px]">
                          {""}
                        </span>
                      </td>
                      <td className="hidden md:table-cell">
                        <span className="inline-block h-[14px] w-[80px]">
                          {""}
                        </span>
                      </td>
                      <td>
                        <span className="inline-block h-[14px] w-[80px]">
                          {""}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center justify-around [&_span]:mr-1 [&_span]:h-[28px] [&_span]:w-[20px]">
                          <span /> <span /> <span />{" "}
                        </div>
                      </td>
                    </tr>
                  ))
                : null}
              <AnimatePresence initial={false}>
                {currentQuestions?.map(
                  ({
                    title,
                    description,
                    answer,
                    difficulty,
                    type,
                    _id,
                  }: IQuestions) => (
                    <motion.tr
                      key={_id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ layout: { type: "spring" } }}
                      layout
                      className="bg-white dark:border-gray-700 hover:bg-blue-200 [&_td]:font-medium [&_td]:whitespace-nowrap [&_td]:truncate [&_td]:py-3 [&_td]:border [&_td]:border-slate-300"
                    >
                      <td title={title} className="  text-balance max-w-60">
                        {title}
                      </td>
                      <td
                        title={description}
                        className="hidden lg:table-cell max-w-60"
                      >
                        {description}
                      </td>
                      <td className="hidden md:table-cell">{answer}</td>
                      <td className="hidden md:table-cell">{difficulty}</td>
                      <td className="hidden md:table-cell">{type}</td>
                      <td className="p-1 md:p-3">
                        {" "}
                        <div className="flex items-center justify-around gap-1">
                          <Eye
                            size={22}
                            onClick={() => openDetailsModel(_id)}
                            className="cursor-pointer"
                            color="green"
                          />{" "}
                          <FilePenLine
                            size={22}
                            onClick={() => openModalEdit(_id, answer)}
                            className="cursor-pointer"
                            color="gold"
                          />{" "}
                          <Trash2
                            size={22}
                            onClick={() => openModalDelete(_id)}
                            className="cursor-pointer"
                            color="red"
                          />
                        </div>
                      </td>
                    </motion.tr>
                  )
                )}
              </AnimatePresence>
            </tbody>
          </table>
          {!isLoading && (
            <PaginationButtons
              members={allQuestions}
              count={questionsPerPage}
              {...{ currentPage, handlePageChange }}
            />
          )}
        </div>
      </AnimationContainer>
    </>
  );
};

export default Questions;
