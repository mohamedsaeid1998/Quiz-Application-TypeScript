import { Navbar, SideBar, ToggleMenu } from "@/Components";
import useToggle from "@/Hooks/useToggle";
import { AnimatePresence } from "framer-motion";
import { Settings } from "lucide-react";
import { Outlet } from "react-router-dom";
import "./MasterLayout.module.scss";

const MasterLayout = () => {
  const [active, toggleActive] = useToggle();
  const [isSidebarOpen, toggleSidebar] = useToggle(true);
  const [isOpen, toggle] = useToggle();

  return (
    <>
      <div
        className={` ${
          isOpen
            ? " lg:hidden bg-[#000000be] z-20 fixed top-0 bottom-0 right-0 left-0 w-full h-full flex justify-center items-center "
            : "hidden "
        } `}
      >
        <ToggleMenu {...{ active, toggleActive }} />
      </div>

      <div className="flex ">
        <aside className={`fixed`}>
          <SideBar {...{ toggleSidebar, isSidebarOpen }} />
        </aside>

        <div
          onClick={toggle}
          className=" gear z-40  lg:hidden fixed top-[50%] size-10 flex items-center justify-center left-0 bg-blue-400  cursor-pointer "
        >
          <span className="animate-spin">
            <Settings size={20} color="white" />
          </span>
        </div>
        <div
          className={` flex flex-col w-full transition-all duration-300   ${
            isSidebarOpen
              ? "ml-0 lg:ml-[250px]  "
              : "w-[80px] ml-0 lg:ml-[80px]"
          }`}
        >
          <Navbar />
          <AnimatePresence mode="wait">
            <main className="m-2 mt-3 md:m-5">
              <Outlet />
            </main>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default MasterLayout;
