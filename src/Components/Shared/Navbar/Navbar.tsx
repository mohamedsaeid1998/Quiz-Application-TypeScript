import { Button } from "@/Components";
import CookieServices from "@/Services/CookieServices/CookieServices";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const profileString = CookieServices.get('role');

  return (
    <>
      <nav className="w-full  h-16  border-b flex px-5 items-center" >
        <div className="flex justify-between w-full items-center">
          {t("dashboard")}
          <div className="flex md:order-2">
            {i18n.language == "ar" ?
              <Button className="mx-2 border-2" onClick={() => { i18n.changeLanguage("en") }}>En</Button>
              : <Button className="mx-2 border-2" onClick={() => { i18n.changeLanguage("ar") }}>Ar</Button>
            }
            <div className="flex flex-col mx-2 ">
              <div className="flex justify-between items-center "><span className="block text-sm">{profileString.first_name} {profileString.last_name}</span> <span className="text-xs text-mainColor">{profileString.role}</span></div>
              <span className="block truncate text-sm font-medium">
                {profileString.email}
              </span>
            </div>
          </div>
        </div>

      </nav>


    </>
  );
}
