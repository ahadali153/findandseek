// import { useEffect, useState } from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import MainPage from "./MainPage";
import AccountPage from "./AccountPage"
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import CreateAdventure from "./adventures/AdventureForm";
import AdventureDetail from "./adventures/AdventureDetail";
import CommentForm from "./adventures/CommentForm";
import AdventureDetailPage from "./adventures/AdventureDetailPage";
import "bootstrap/dist/css/bootstrap.min.css";
import NavComponent from "./Nav";

function App() {
	const domain = /https:\/\/[^/]+/;
  	const basename = process.env.PUBLIC_URL.replace(domain, '');
	return (
		<BrowserRouter basename={basename}>
			<AuthProvider baseUrl={process.env.REACT_APP_API_HOST}>
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="account" element={<AccountPage />} />
					<Route path="/login" element={<LoginForm />} />
					<Route path="/signup" element={<SignupForm />} />
					<Route path="/adventures/new" element={<CreateAdventure />} />
					<Route
						path="/adventures/:adventureid"
						element={<AdventureDetailPage />}
					/>
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
