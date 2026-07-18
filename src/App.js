import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Dashboard from "./components/Dashboard";
import LearningPage from "./pages/LearningPage";
import CourseWorkspace from "./pages/CourseWorkspace";
import DiaryPage from "./pages/DiaryPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import NavBar from "./components/NavBar";
import PageTransition from "./components/PageTransition";
import VideoBackground from "./components/VideoBackground";
import CursorGlow from "./components/CursorGlow";
import "./App.css";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Dashboard />
            </PageTransition>
          }
        />
        <Route
          path="/learning"
          element={
            <PageTransition>
              <LearningPage />
            </PageTransition>
          }
        />
        <Route
          path="/learning/:courseId"
          element={
            <PageTransition>
              <CourseWorkspace />
            </PageTransition>
          }
        />
        <Route
          path="/diary"
          element={
            <PageTransition>
              <DiaryPage />
            </PageTransition>
          }
        />
        <Route
          path="/analytics"
          element={
            <PageTransition>
              <AnalyticsPage />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <VideoBackground />
        <CursorGlow />

        <NavBar />
        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
