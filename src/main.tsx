//@ts-nocheck
import ReactDOM from 'react-dom/client'
import App from './App'
import "./Locale/i18n";
import 'react-toastify/dist/ReactToastify.css';
import "./Styles/global.scss";
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)
