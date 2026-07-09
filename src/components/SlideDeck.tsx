import React, { useState } from "react";
import { Slide } from "../types";
import { Play, Square, ChevronLeft, ChevronRight, Presentation, ArrowLeftRight } from "lucide-react";

export default function SlideDeck() {
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);

  const slides: Slide[] = [
    {
      id: 1,
      title: "Customer Segmentation using K-Means Clustering",
      subtitle: "Data Science Internship Final Project Defense",
      content: [
        "Harnessing Unsupervised Machine Learning to Drive Targeted Retail ROI",
        "Author: Jane Doe, ML Engineer & Data Intern",
        "Corporate Mentor: Dr. Alan Turing",
      ],
      visualType: "intro",
    },
    {
      id: 2,
      title: "The Business Problem Statement",
      subtitle: "The Inefficiencies of Mass Marketing",
      content: [
        "Generic 'One-Size-Fits-All' promotions suffer from poor conversion rates and excessive budgets.",
        "Traditional analytics fail to identify overlapping consumer behavioral features.",
        "Need: Unsupervised ML pipeline to discover cohesive client cohorts automatically.",
      ],
      visualType: "insights",
    },
    {
      id: 3,
      title: "Research & Project Objectives",
      subtitle: "A Structured Data Science Architecture",
      content: [
        "Automate: Build a reproducible preprocessing pipeline in python.",
        "Analyze: Discover hidden distribution correlations via extensive EDA.",
        "Optimize: Deploy K-Means and mathematically justify cluster size parameters.",
        "Operationalize: Draft cohort strategies to optimize business retention ROI.",
      ],
      visualType: "architecture",
    },
    {
      id: 4,
      title: "Dataset Profile & Metadata",
      subtitle: "Mall Customers Demographics (N=500)",
      content: [
        "CustomerID: Unique integer identifier for each client.",
        "Gender: Male and Female demographics (Females slight majority ~53%).",
        "Age: Uniform density ranging from 18 to 70 years old (Avg: 38).",
        "Annual Income: Financial range from 15k$ to 137k$ (Avg: 60.5k$).",
        "Spending Score: Subjective behavioral rating from 1 to 100.",
      ],
      visualType: "table",
    },
    {
      id: 5,
      title: "Data Preprocessing & Pre-Cleaning",
      subtitle: "Standardizing Data Quality Framework",
      content: [
        "Missing Values: Fully verified df.isnull().sum() == 0.",
        "Duplicates: Fully validated df.duplicated().sum() == 0.",
        "Categorical Encoding: Gender mapped to Female=0, Male=1.",
        "Feature Standardization: StandardScaler applied to zero mean and unit variance.",
      ],
      visualType: "insights",
    },
    {
      id: 6,
      title: "Exploratory Data Analysis: Key Insights",
      subtitle: "Defining Demographic Behaviors",
      content: [
        "Insight A: Strong negative correlation (-0.32) between Age and Spend.",
        "Younger cohorts are highly willing to spend; older lines demand heavy utility justification.",
        "Insight B: Near-zero correlation (0.01) between Income and Spending score.",
        "Proves income does not dictate spending, requiring multi-dimensional spatial partitioning.",
      ],
      visualType: "chart",
    },
    {
      id: 7,
      title: "K-Means Clustering Methodology",
      subtitle: "Centroid Distance Optimization",
      content: [
        "Iterative partitioning algorithm minimizing Sum of Squared Errors (WCSS/Inertia).",
        "Observations are mapped to the nearest center coordinate using Euclidean distances.",
        "Iterative convergence achieved using Scikit-Learn with random seeds.",
        "Features scaled to prevent Annual Income units from biassing the vectors.",
      ],
      visualType: "architecture",
    },
    {
      id: 8,
      title: "Model Optimization & Tuning Curves",
      subtitle: "Elbow Criterion & Silhouette Validation",
      content: [
        "The Elbow Plot: WCSS (Inertia) slope sharply drops and stabilizes at K = 5.",
        "Silhouette Coefficient: Peaks at 0.55 precisely when K = 5.",
        "Both curves provide dual-validation that 5 clusters form optimal boundaries.",
        "Result: High intra-cluster cohesion and clear inter-cluster separation.",
      ],
      visualType: "chart",
    },
    {
      id: 9,
      title: "The 5 Discovered Customer Segments",
      subtitle: "Consumer Cohort Personas",
      content: [
        "Cluster 0: Premium VIPs (High Income, High Spending) - Average Age: 32",
        "Cluster 1: Conservative Savers (High Income, Low Spending) - Average Age: 44",
        "Cluster 2: Budget Shoppers (Low Income, High Spending) - Average Age: 25",
        "Cluster 3: Stable Regulars (Average Income, Average Spending) - Average Age: 34",
        "Cluster 4: Dormant Buyers (Low Income, Low Spending) - Average Age: 47",
      ],
      visualType: "table",
    },
    {
      id: 10,
      title: "Actionable Marketing & Business Strategies",
      subtitle: "Maximizing Customer Lifetime Value (CLV)",
      content: [
        "Premium: Concierge support, invite-only luxury tiers, exclusive launches.",
        "Savers: High-value luxury bundles, cashback on premium memberships.",
        "Budget: Aggressive flash sales, limit coupons, BNPL financing terms.",
        "Regulars: Subscription box boxes, steady newsletters, bulk-buy discounts.",
        "Dormant: Introductory welcome coupons, engagement feedback surveys.",
      ],
      visualType: "insights",
    },
    {
      id: 11,
      title: "Deployment App Dashboard Architecture",
      subtitle: "A Complete Interactive Production Suite",
      content: [
        "Modern SPA portal developed in React paired with Tailwind CSS utilities.",
        "Interactive analytics powered by Recharts plotting vector distributions.",
        "Live Prediction module using Euclidean distance model algorithms.",
        "Integrates a server-side Gemini AI Co-pilot for dynamic analyst consulting.",
      ],
      visualType: "architecture",
    },
    {
      id: 12,
      title: "Technical Conclusion & Future Scope",
      subtitle: "Advancing Customer Intelligence",
      content: [
        "Conclusion: K-Means successfully extracted 5 high-impact customer cohorts.",
        "Data-driven targeting replaces random promotions to double marketing ROI.",
        "Future Scope: Transition to dynamic density DBSCAN to detect arbitrary bounds.",
        "Incorporate NLP embeddings on client reviews for sentiment-weighted segmentation.",
      ],
      visualType: "conclusion",
    },
  ];

  return (
    <div id="slide-deck" className="space-y-6">
      {/* Slide Canvas Wrapper */}
      <div className="bg-[#111113] aspect-[16/9] w-full rounded-3xl border border-[#27272a] p-8 sm:p-12 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden">
        {/* Background visual accents based on visualType */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        {slides[currentSlideIdx].visualType === "intro" && (
          <div className="absolute left-1/4 bottom-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
        )}

        {/* Slide Top bar */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <Presentation className="h-4 w-4 text-indigo-400" />
            <span className="text-xs font-mono tracking-widest text-[#a1a1aa] uppercase">
              Section Defense Presentation
            </span>
          </div>
          <span className="text-xs font-mono text-[#a1a1aa]">
            Slide {currentSlideIdx + 1} of {slides.length}
          </span>
        </div>

        {/* Slide Core Content */}
        <div className="space-y-4 sm:space-y-6 max-w-4xl z-10 my-auto">
          {slides[currentSlideIdx].visualType === "intro" ? (
            <div className="space-y-4 text-center sm:text-left">
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {slides[currentSlideIdx].title}
              </h1>
              <p className="text-sm sm:text-lg text-indigo-400 font-semibold italic">
                {slides[currentSlideIdx].subtitle}
              </p>
              <div className="pt-4 space-y-1.5 text-xs text-[#a1a1aa] font-medium">
                {slides[currentSlideIdx].content.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block mb-1">
                  {slides[currentSlideIdx].subtitle}
                </span>
                <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight text-white">
                  {slides[currentSlideIdx].title}
                </h2>
              </div>
              <ul className="space-y-2 sm:space-y-3 pt-2">
                {slides[currentSlideIdx].content.map((point, index) => (
                  <li key={index} className="flex items-start gap-3 text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
                    <span className="text-indigo-400 font-bold mt-1 select-none">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Slide Bottom Bar Controls */}
        <div className="flex items-center justify-between border-t border-[#27272a]/80 pt-4 z-10 text-xs">
          <span className="text-[#71717a] font-medium">Jane Doe • DS Internship 2026</span>
          <div className="flex items-center gap-3">
            <button
              id="btn-slide-prev"
              onClick={() => setCurrentSlideIdx((prev) => Math.max(0, prev - 1))}
              disabled={currentSlideIdx === 0}
              className="p-2 bg-[#1c1c1f] hover:bg-[#27272a] text-[#a1a1aa] hover:text-[#fafafa] disabled:opacity-40 rounded-xl border border-[#27272a] transition-colors cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              id="btn-slide-next"
              onClick={() => setCurrentSlideIdx((prev) => Math.min(slides.length - 1, prev + 1))}
              disabled={currentSlideIdx === slides.length - 1}
              className="p-2 bg-[#1c1c1f] hover:bg-[#27272a] text-[#a1a1aa] hover:text-[#fafafa] disabled:opacity-40 rounded-xl border border-[#27272a] transition-colors cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
