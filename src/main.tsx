import { createRoot } from 'react-dom/client'
import './config/firebase'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);
