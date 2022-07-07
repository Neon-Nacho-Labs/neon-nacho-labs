import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MoralisProvider } from "react-moralis";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme'
import {
	BrowserRouter as Router,
} from "react-router-dom";

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<MoralisProvider serverUrl={process.env.REACT_APP_MORALIS_URL!} appId={process.env.REACT_APP_MORALIS_APP_ID!}>
			<Router>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<App />
				</ThemeProvider>
			</Router>
		</MoralisProvider>
	</React.StrictMode>
);

// Log web vitals for now
reportWebVitals(console.log);
