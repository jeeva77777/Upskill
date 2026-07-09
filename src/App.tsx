import React, { useState, useMemo } from "react";
import { generateCustomers } from "./utils/dataGenerator";
import DatasetViewer from "./components/DatasetViewer";
import VisualAnalytics from "./components/VisualAnalytics";
import ClusterPredictor from "./components/ClusterPredictor";
import NotebookViewer from "./components/NotebookViewer";
import InternshipReport from "./components/InternshipReport";
import SlideDeck from "./components/SlideDeck";
import ProjectFiles from "./components/ProjectFiles";
import AICopilot from "./components/AICopilot";
import {
  BarChart2,
  Table,
  BookOpen,
  Code2,
  MessageSquare,
  Presentation,
  CheckCircle,
  Database,
  Award,
  BookMarked,
  Layers,
  GraduationCap
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<
    "analytics" | "dataset" | "notebook" | "report" | "slides" | "repository" | "copilot"
  >("analytics");

  // Initialize realistic customer records once
  const customers = useMemo(() => generateCustomers(500), []);

  const tabs = [
    { id: "analytics", name: "Interactive Analytics", icon: BarChart2 },
    { id: "dataset", name: "Dataset Explorer", icon: Table },
    { id: "notebook", name: "Jupyter Notebook", icon: Code2 },
    { id: "report", name: "Internship Report", icon: BookOpen },
    { id: "slides", name: "Defense Presentation", icon: Presentation },
    { id: "repository", name: "Files & Repository", icon: Layers },
    { id: "copilot", name: "AI DS Co-pilot", icon: MessageSquare },
  ];

  return (
    <div id="app-root" className="min-h-screen bg-[#0a0a0b] text-[#fafafa] font-sans flex flex-col justify-between">
      {/* Top Professional Header Bar */}
      <header className="bg-[#111113] border-b border-[#27272a] py-4 sm:py-5 px-6 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-500 text-white rounded-2xl shadow-md shadow-indigo-500/20">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-indigo-500/20">
                  Internship Final Submission
                </span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 border border-emerald-500/20">
                  <CheckCircle className="h-3 w-3" /> Approved
                </span>
              </div>
              <h1 className="text-xl font-black text-[#fafafa] tracking-tight mt-0.5">
                Customer Segmentation using K-Means Clustering
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start md:self-center">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-[#fafafa]">Jane Doe</p>
              <p className="text-[10px] font-medium text-[#a1a1aa] uppercase tracking-widest">
                Data Science Intern
              </p>
            </div>
            <div className="h-10 w-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-sm border border-indigo-500/20">
              JD
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 flex-1 space-y-8">
        {/* Project Summary Banner */}
        <section id="project-overview-banner" className="bg-gradient-to-r from-[#111113] via-[#161618] to-[#111113] border border-[#27272a] p-6 sm:p-8 rounded-3xl text-white relative overflow-hidden shadow-xl">
          <div className="absolute right-0 top-0 w-96 h-full bg-[#6366f1]/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 space-y-4 max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              A Complete Retail Customer Analytics Portal
            </h2>
            <p className="text-[#a1a1aa] text-xs sm:text-sm leading-relaxed text-justify">
              This interactive platform demonstrates the end-to-end Machine Learning lifecyle for a customer segmentation model. Explore visual analytics curves, preprocess raw data, run interactive cluster classifications, review the 30-page academic internship report, click through presentation slide decks, inspect python scripts, or interact directly with the Gemini AI Lead Data Science Mentor.
            </p>

            {/* Micro Metrics Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              <div className="bg-white/5 border border-white/10 p-3 rounded-2xl">
                <span className="text-[10px] text-[#a1a1aa] block font-medium">Model Pipeline</span>
                <span className="font-bold text-slate-100 text-sm">K-Means Algorithm</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-3 rounded-2xl">
                <span className="text-[10px] text-[#a1a1aa] block font-medium">Silhouette Coeff</span>
                <span className="font-bold text-emerald-400 text-sm">0.55 (K=5 Peak)</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-3 rounded-2xl">
                <span className="text-[10px] text-[#a1a1aa] block font-medium">Database Sample</span>
                <span className="font-bold text-slate-100 text-sm">500 Customers</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-3 rounded-2xl">
                <span className="text-[10px] text-[#a1a1aa] block font-medium">Documentation</span>
                <span className="font-bold text-slate-100 text-sm">Fully Modular</span>
              </div>
            </div>
          </div>
        </section>

        {/* Global Navigation Tabs */}
        <section id="portal-navigation" className="bg-[#111113] p-2 rounded-2xl border border-[#27272a] flex flex-wrap gap-1.5 overflow-x-auto select-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`btn-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold tracking-tight transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/10"
                    : "text-[#a1a1aa] hover:bg-[#161618] hover:text-[#fafafa]"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-[#71717a]"}`} />
                {tab.name}
              </button>
            );
          })}
        </section>

        {/* Active Content Window */}
        <section id="portal-content-frame" className="transition-opacity duration-300">
          {activeTab === "analytics" && (
            <div className="space-y-12">
              <VisualAnalytics customers={customers} />
              <div className="border-t border-[#27272a] pt-10">
                <div className="mb-6">
                  <h3 className="text-xl font-black text-[#fafafa] tracking-tight">Interactive Cluster Profiling Tool</h3>
                  <p className="text-xs text-[#a1a1aa]">Run immediate Euclidean classification algorithms on live customer vectors</p>
                </div>
                <ClusterPredictor />
              </div>
            </div>
          )}

          {activeTab === "dataset" && <DatasetViewer customers={customers} />}

          {activeTab === "notebook" && <NotebookViewer />}

          {activeTab === "report" && <InternshipReport />}

          {activeTab === "slides" && <SlideDeck />}

          {activeTab === "repository" && <ProjectFiles />}

          {activeTab === "copilot" && <AICopilot />}
        </section>
      </main>

      {/* Footer bar */}
      <footer className="bg-[#111113] border-t border-[#27272a] py-6 px-6 mt-12 text-center text-xs text-[#71717a] font-medium">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Jane Doe • Customer Segmentation ML Internship Submission Portal</p>
          <div className="flex items-center gap-4 text-[#a1a1aa] font-semibold">
            <a href="#portal-navigation" className="hover:text-indigo-400 transition-colors">Back to Top</a>
            <span>•</span>
            <span className="text-[#71717a]">Standard PEP-8 Production Architecture</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
