import { ArrowLeft, ArrowRight } from "lucide-react";
import ReactPaginate from "react-paginate";
import "./PaginationButtons.module.scss";
import { motion } from "framer-motion";
import { paginationVariants } from "@/Utils/Helpers/FramerVariables/FramerVariables";

interface IProps {
  members: [];
  handlePageChange: (selectedPage: number) => void;
  currentPage: number;
  count: number;
}
const PaginationButtons = ({
  members,
  handlePageChange,
  currentPage,
  count,
}: IProps) => {
  const showNextButton = Math.ceil(members.length / count) !== currentPage + 1;
  const showPrevButton = currentPage !== 0;

  return (
    <>
      <motion.div
        variants={paginationVariants}
        initial="hidden"
        animate="visible"
      >
        <ReactPaginate
          breakLabel={<span className="mr-4">...</span>}
          nextLabel={
            showNextButton ? (
              <button className=" size-6  md:size-8 flex items-center justify-center bg-[#D3D3D3] rounded-md">
                <ArrowRight />
              </button>
            ) : null
          }
          previousLabel={
            showPrevButton ? (
              <button className="size-6 mr-4  md:size-8   flex items-center justify-center bg-[#D3D3D3] rounded-md  ">
                <ArrowLeft />
              </button>
            ) : null
          }
          onPageChange={({ selected }) => handlePageChange(selected)}
          pageRangeDisplayed={2}
          pageCount={Math.ceil(members?.length / count)}
          containerClassName="flex items-center justify-center "
          pageClassName=" border border-solid border-[#D3D3D3] hover:bg-[#D3D3D3]  flex items-center justify-center rounded-full mr-3 sm:mr-4 font-semibold p-2.5 md:p-4 w-1 h-1"
          activeClassName="bg-mainColor text-white"
          forcePage={currentPage}
        />
      </motion.div>
    </>
  );
};

export default PaginationButtons;
