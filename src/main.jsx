import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import "@radix-ui/themes/styles.css";
import { Theme} from "@radix-ui/themes";
createRoot(document.getElementById('root')).render(
  <Theme accentColor="red" scaling="95%">
	 <BrowserRouter>
		<AuthProvider>
			<App />
		</AuthProvider>
	</BrowserRouter>
   </Theme>
)
