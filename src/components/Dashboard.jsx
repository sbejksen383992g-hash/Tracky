import React from "react";

import HeaderSection from "../sections/HeaderSection";
import HabitSection from "../sections/HabitSection";
import TimerSection from "../sections/TimerSection";
import LearningSection from "../sections/LearningSection";
import QuoteSection from "../sections/QuoteSection";
import HistorySection from "../sections/HistorySection";

const Dashboard = () => {
  return (
    <main className="dashboard">
      <HeaderSection />

      <section className="dashboard-grid">
        <HabitSection />
        <HistorySection />
        <TimerSection />
        <LearningSection />
        <QuoteSection />
      </section>
    </main>
  );
};

export default Dashboard;
