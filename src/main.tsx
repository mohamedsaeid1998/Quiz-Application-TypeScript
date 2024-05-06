//@ts-nocheck
import ReactDOM from 'react-dom/client'
import "./Locale/i18n";
import App from './App'
import 'react-toastify/dist/ReactToastify.css';
import "./Styles/global.scss";
import i18next from 'i18next';
import CookieServices from './Services/CookieServices/CookieServices';
const lng =  CookieServices.get("i18next") || "en";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)

