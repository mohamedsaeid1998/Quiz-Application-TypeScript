import ReactDOM from 'react-dom/client'
import "./Locale/i18n";
import App from './App'
import 'react-toastify/dist/ReactToastify.css';
import "./Styles/global.scss";


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)

