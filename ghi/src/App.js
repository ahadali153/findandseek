// import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import MainPage from "./MainPage";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import CreateAdventure from "./adventures/AdventureForm";
import AdventureDetail from "./adventures/AdventureDetail";
import CommentForm from "./adventures/CommentForm";
import ImageUploader from "./FileUploader";

function App() {
  return (
    <BrowserRouter>
      {/* <Nav className="Navbar" /> */}
      <AuthProvider baseUrl={process.env.REACT_APP_API_HOST}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/adventures/new" element={<CreateAdventure />} />
          <Route path="/adventures/:id/comments" element={<CommentForm />} />
          <Route path="/adventures/:id" element={<AdventureDetail />} />
          <Route path="/imageupload" element={<ImageUploader />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
