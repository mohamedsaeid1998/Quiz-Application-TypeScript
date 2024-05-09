import CookieServices from "@/Services/CookieServices/CookieServices";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { t } = useTranslation();
  const profileString = CookieServices.get('role');

  // useEffect(() => {
  //   const htmlElement = document.querySelector('html');
  //   if (htmlElement)
  //     htmlElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  // }, [i18n.language]);
  return (

    <>
      <nav className="w-full  h-16  border-b flex px-5 items-center" >
        <div className="flex justify-between w-full items-center">
          {t("dashboard")}
          <div className="flex md:order-2">
            {/* {i18n.language == "ar" ?
              <Button className="mx-2 border-2" onClick={() => { i18n.changeLanguage("en") }}>En</Button>
              : <Button className="mx-2 border-2" onClick={() => { i18n.changeLanguage("ar") }}>Ar</Button>
            } */}
            <div className="flex flex-col mx-2 ">
              <div className="flex justify-between items-center text-sm p "><span className="block">{profileString?.first_name} {profileString?.last_name}</span> <span className=" text-mainColor font-bold">{profileString?.role}</span></div>
              <span className="block truncate  font-medium">
                {profileString?.email}
              </span>
            </div>
          </div>
        </div>

      </nav>


    </>
  );
}
