import { Outlet } from "react-router-dom";
// import { useTranslation } from "react-i18next";
import { Navbar, SideBar } from "@/Components";
import { useState } from "react";
import "./MasterLayout.module.scss";

const MasterLayout = () => {
  // const { i18n } = useTranslation();

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  return (
    <>
      <div className="flex ">

        <aside className={`fixed`}>
          <SideBar {...{ setSidebarOpen, isSidebarOpen }} />
        </aside>


        <div className={` flex flex-col w-full transition-all duration-300  ${isSidebarOpen ? 'ml-[250px]' : 'ml-[80px]'}`}>
          <Navbar />
          <Outlet />
        </div>

      </div>
    </>
  );
};

export default MasterLayout;
