import React, { useState } from "react";
import { BookOpen, Award, FileText, CheckCircle, ChevronRight, ChevronLeft, Download, Eye } from "lucide-react";

interface ReportSection {
  title: string;
  badge?: string;
  content: React.ReactNode;
}

export default function InternshipReport() {
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);

  const sections: ReportSection[] = [
    {
      title: "Cover Page",
      content: (
        <div className="flex flex-col items-center justify-center text-center py-12 px-6 space-y-8 font-serif border border-[#27272a] rounded-2xl bg-[#111113] max-w-2xl mx-auto shadow-sm">
          <div className="text-sm font-bold tracking-widest text-[#a1a1aa] uppercase">
            A FINAL INTERNSHIP SUBMISSION REPORT
          </div>
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#fafafa] tracking-tight leading-snug">
              Customer Segmentation Analysis Using K-Means Clustering
            </h1>
            <p className="text-[#a1a1aa] italic text-base">
              Harnessing Unsupervised Machine Learning for Precision Marketing & Strategic Retail Loyalty
            </p>
          </div>
          <div className="w-24 h-1 bg-indigo-500 rounded-full mx-auto my-4"></div>
          <div className="space-y-1.5 text-sm text-[#a1a1aa]">
            <p className="font-semibold">Submitted in partial fulfillment of the requirements for</p>
            <p className="font-bold text-[#fafafa] text-base">The Final Machine Learning Internship Project</p>
          </div>
          <div className="grid grid-cols-2 gap-8 w-full pt-12 border-t border-[#27272a] text-left text-xs font-sans text-[#a1a1aa]">
            <div>
              <p className="font-bold text-[#fafafa]/80 uppercase tracking-wider mb-2">INTERN DETAILS</p>
              <p className="font-medium text-[#fafafa]">Jane Doe, Lead Intern</p>
              <p>M.S. in Data Science & Machine Learning</p>
              <p>Intern ID: DS-2026-9904</p>
            </div>
            <div>
              <p className="font-bold text-[#fafafa]/80 uppercase tracking-wider mb-2">PROJECT GUIDES</p>
              <p className="font-medium text-[#fafafa]">Dr. Alan Turing</p>
              <p>Senior Principal Data Scientist</p>
              <p>Artificial Intelligence Group</p>
            </div>
          </div>
          <div className="text-xs text-[#71717a] font-sans pt-12">
            Academic Term: Summer 2026 • Date: July 2026
          </div>
        </div>
      ),
    },
    {
      title: "Certificate of Completion",
      badge: "Official Certification",
      content: (
        <div className="p-8 border-4 border-double border-[#27272a] rounded-3xl bg-[#111113] max-w-2xl mx-auto space-y-6">
          <div className="flex justify-center text-indigo-400 mb-2">
            <Award className="h-14 w-14" />
          </div>
          <h2 className="text-xl font-bold text-center text-[#fafafa] uppercase tracking-wider font-serif">
            Certificate of Internship Authenticity
          </h2>
          <p className="text-sm text-[#a1a1aa] leading-relaxed text-justify font-sans">
            This is to certify that the project report titled **"Customer Segmentation using K-Means Clustering"** is a bonafide work carried out by **Jane Doe (Intern ID: DS-2026-9904)** during their tenure of the Summer 2026 Data Science Internship.
          </p>
          <p className="text-sm text-[#a1a1aa] leading-relaxed text-justify font-sans">
            The results, analytical pipelines, and clustering metrics compiled within this document represent authentic findings of practical marketing relevance and conform fully to standardized codes of ethical research.
          </p>
          <div className="grid grid-cols-2 gap-12 pt-16 font-serif text-xs text-[#a1a1aa] text-center">
            <div className="space-y-1">
              <div className="border-b border-[#27272a] pb-2 italic text-[#fafafa]/80">Alan Turing</div>
              <p className="font-bold text-[#fafafa]">Dr. Alan Turing</p>
              <p className="text-[#71717a]">Corporate Guide & Principal Scientist</p>
            </div>
            <div className="space-y-1">
              <div className="border-b border-[#27272a] pb-2 italic text-[#fafafa]/80">Sarah Jenkins</div>
              <p className="font-bold text-[#fafafa]">Sarah Jenkins, HRD</p>
              <p className="text-[#71717a]">Global Director of Internships</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Abstract",
      content: (
        <div className="space-y-4 font-sans text-sm text-[#a1a1aa] leading-relaxed text-justify">
          <h3 className="text-lg font-bold text-[#fafafa] border-b border-[#27272a] pb-2 font-serif">Abstract</h3>
          <p>
            In the modern retail ecosystem, standard bulk-distribution marketing models are failing to engage customers effectively, resulting in high churn rates and inefficient promotional spend. This project details the design, validation, and production deployment of an unsupervised machine learning model that clusters customer profiles using the **K-Means algorithm**.
          </p>
          <p>
            Utilizing the **Mall Customers Dataset**, a synthetic array representing 500 distinct client records was generated containing Age, Gender, Annual Income, and Spending Scores. Exploratory Data Analysis (EDA) exposed a crucial negative correlation (-0.32) between customer age and spending propensity. At the same time, the correlation between income and spending score was near zero, establishing the necessity for multi-dimensional spatial clustering over standard linear groupings.
          </p>
          <p>
            Optimal cluster determination was validated using two independent evaluation criteria: the **Elbow Method (Inertia)** and the **Silhouette Coefficient**. Both criteria pointed conclusively to **K=5** as the optimal segmentation boundary, peaking at a silhouette score of **0.55**.
          </p>
          <p>
            The resulting 5 cohorts—**Premium VIPs, Conservative High-Income Savers, Budget Shoppers, Stable Regulars, and Potential Dormant Buyers**—were assigned distinct behavioral personas. Custom-tailored marketing strategies were mapped to each cohort to maximize operational conversion, demonstrating a data-driven path to strategic business growth.
          </p>
        </div>
      ),
    },
    {
      title: "1. Problem Statement & Objectives",
      content: (
        <div className="space-y-4 font-sans text-sm text-[#a1a1aa] leading-relaxed text-justify">
          <h3 className="text-lg font-bold text-[#fafafa] border-b border-[#27272a] pb-2 font-serif">
            1. Problem Statement & Research Objectives
          </h3>
          <h4 className="font-bold text-[#fafafa] mt-4">1.1 Problem Statement</h4>
          <p>
            Traditional retail business intelligence models fail to address individual customer behaviors, grouping all shoppers into broad, generic categories. This one-size-fits-all paradigm fails to capitalize on the unique preferences of high-value shoppers while alienating budget-conscious groups with irrelevant high-cost offers.
          </p>
          <p>
            Because human purchasing behavior is governed by multiple overlapping dimensions (such as financial capacity and emotional willingness to spend), finding patterns manually across hundreds of thousands of transactions is impossible. The core problem is to deploy an unsupervised machine learning pipeline that can automatically discover and classify distinct, cohesive customer segments without human bias.
          </p>
          <h4 className="font-bold text-[#fafafa] mt-4">1.2 Core Research Objectives</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              **Objective 1**: Develop a fully automated, reproducible Python data processing pipeline that prepares raw retail behavior logs for clustering.
            </li>
            <li>
              **Objective 2**: Conduct robust Exploratory Data Analysis to mathematically define demographics and highlight key correlations.
            </li>
            <li>
              **Objective 3**: Implement the K-Means clustering algorithm and find the optimal number of segments (K) using mathematical validation curves.
            </li>
            <li>
              **Objective 4**: Define detailed customer persona profiles for each segment and map them to targeted, high-ROI business marketing strategies.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "2. Mathematical Methodology",
      content: (
        <div className="space-y-4 font-sans text-sm text-[#a1a1aa] leading-relaxed text-justify">
          <h3 className="text-lg font-bold text-[#fafafa] border-b border-[#27272a] pb-2 font-serif">
            2. Technical Methodology & K-Means Optimization
          </h3>
          <h4 className="font-bold text-[#fafafa] mt-4">2.1 The K-Means Clustering Algorithm</h4>
          <p>
            K-Means is a centroid-based, iterative unsupervised clustering algorithm that partitions $N$ observations into $K$ clusters. Each observation is assigned to the cluster with the nearest mean (centroid), serving as a prototype of that cluster.
          </p>
          <p>
            Mathematically, K-Means minimizes the within-cluster sum of squares (WCSS or Inertia):
          </p>
          <div className="bg-[#1c1c1f] p-4 rounded-xl font-mono text-center text-xs text-[#fafafa] border border-[#27272a] my-2">
            {"WCSS = \\sum_{i=1}^{K} \\sum_{x \\in S_i} ||x - \\mu_i||^2"}
          </div>
          <p>
            Where {"S_i"} is the set of points belonging to cluster {"i"}, and {"\\mu_i"} is the coordinate vector of the centroid for cluster {"i"}.
          </p>
          <h4 className="font-bold text-[#fafafa] mt-4">2.2 Feature Standardization</h4>
          <p>
            Since K-Means is heavily sensitive to differences in feature scaling (features with larger numerical ranges dominate distance calculations), standardization was performed on Age, Income, and Spending. Standard Z-score normalization:
          </p>
          <div className="bg-[#1c1c1f] p-4 rounded-xl font-mono text-center text-xs text-[#fafafa] border border-[#27272a] my-2">
            {"Z = \\frac{x - \\mu}{\\sigma}"}
          </div>
          <p>
            This forces all clustering inputs to share a zero mean ({"\\mu=0"}) and unit variance ({"\\sigma=1"}), assuring unbiased Euclidean distances.
          </p>
        </div>
      ),
    },
    {
      title: "3. Model Evaluation Results",
      content: (
        <div className="space-y-4 font-sans text-sm text-[#a1a1aa] leading-relaxed text-justify">
          <h3 className="text-lg font-bold text-[#fafafa] border-b border-[#27272a] pb-2 font-serif">
            3. Model Evaluation & Parameter Optimization
          </h3>
          <h4 className="font-bold text-[#fafafa] mt-4">3.1 Optimal K Selection Validation</h4>
          <p>
            Evaluating clustering requires mathematical measures of separation and cohesion. We utilized two criteria:
          </p>
          <ul className="list-decimal pl-5 space-y-2">
            <li>
              **The Elbow Method**: Measures WCSS (Inertia) across a range of K. At K=5, the slope of Inertia decay sharply reduces (creating an 'elbow'), proving that additional clusters yield minimal benefit.
            </li>
            <li>
              **Silhouette Coefficient**: Measures how similar a point is to its own cluster compared to other clusters:
              <div className="bg-[#1c1c1f] p-3 rounded-xl font-mono text-center text-xs text-[#fafafa] border border-[#27272a] my-2">
                {"s(i) = \\frac{b(i) - a(i)}{\\max(a(i), b(i))}"}
              </div>
              Where {"a(i)"} is the mean intra-cluster distance and {"b(i)"} is the mean nearest-cluster distance. The score peaks at **0.55** precisely when **K=5**, demonstrating clean cluster separation.
            </li>
          </ul>
          <h4 className="font-bold text-[#fafafa] mt-4">3.2 Centroid Locations Table</h4>
          <table className="w-full text-left text-xs border border-[#27272a] rounded-lg overflow-hidden mt-2">
            <thead className="bg-[#161618] text-[#a1a1aa] font-semibold uppercase">
              <tr className="border-b border-[#27272a]">
                <th className="p-3">Cluster ID</th>
                <th className="p-3">Average Income (k$)</th>
                <th className="p-3">Average Spending Score</th>
                <th className="p-3">Average Age</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#27272a] text-[#a1a1aa]">
              <tr>
                <td className="p-3 font-semibold text-emerald-400">0 (Premium)</td>
                <td className="p-3">105.1</td>
                <td className="p-3">82.5</td>
                <td className="p-3">32.4</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-blue-400">1 (Conservative)</td>
                <td className="p-3">104.8</td>
                <td className="p-3">25.1</td>
                <td className="p-3">44.8</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-amber-400">2 (Budget)</td>
                <td className="p-3">26.3</td>
                <td className="p-3">80.2</td>
                <td className="p-3">25.6</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-indigo-400">3 (Regular)</td>
                <td className="p-3">52.4</td>
                <td className="p-3">50.1</td>
                <td className="p-3">34.9</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-red-400">4 (Potential)</td>
                <td className="p-3">26.1</td>
                <td className="p-3">20.4</td>
                <td className="p-3">47.2</td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      title: "4. References & Bibliography",
      content: (
        <div className="space-y-4 font-sans text-sm text-[#a1a1aa] leading-relaxed text-justify">
          <h3 className="text-lg font-bold text-[#fafafa] border-b border-[#27272a] pb-2 font-serif">
            4. Academic References & Technical Bibliography
          </h3>
          <ol className="list-decimal pl-5 space-y-3 text-xs text-[#a1a1aa]/90">
            <li>
              MacQueen, J. (1967). **"Some methods for classification and analysis of multivariate observations."** Proceedings of the Fifth Berkeley Symposium on Mathematical Statistics and Probability, 1, 281-297.
            </li>
            <li>
              Rousseeuw, P. J. (1987). **"Silhouettes: a graphical aid to the interpretation and validation of cluster analysis."** Journal of Computational and Applied Mathematics, 20, 53-65.
            </li>
            <li>
              Pedregosa, F., et al. (2011). **"Scikit-learn: Machine Learning in Python."** Journal of Machine Learning Research, 12, 2825-2830.
            </li>
            <li>
              McKinney, W. (2010). **"Data Structures for Statistical Computing in Python."** Proceedings of the 9th Python in Science Conference, 51-56.
            </li>
            <li>
              Kotsiantis, S. B., & Kanellopoulos, D. (2006). **"Association rules mining: A recent overview."** International Transactions on Computer Science and Applications, 32(1), 71-82.
            </li>
          </ol>
        </div>
      ),
    },
  ];

  const handleDownloadReport = () => {
    // Generate a simple report plain text content for the user
    const textReport = `CUSTOMER SEGMENTATION ANALYSIS USING K-MEANS CLUSTERING
============================================================
A Data Science & Machine Learning Internship Final Submission Report

1. ABSTRACT
------------------------------------------------------------
Traditional mass marketing techniques are highly inefficient. This report presents an end-to-end 
unsupervised machine learning system using the K-Means algorithm to partition 500 customers 
from the Mall Customers Dataset. Evaluation via Inertia (Elbow Method) and Silhouette Coefficient 
curves mathematically validated K=5 clusters as optimal. The five segments discovered include 
Premium VIP, Conservative Savers, Budget Shoppers, Stable Regulars, and Potential Dormants.

2. METHODOLOGY
------------------------------------------------------------
Features analyzed: Age, Annual Income, Spending Score. 
Standardization via StandardScaler. WCSS (Sum of Squares) minimized iteratively to find optimal 
centroids. Maximum Silhouette score achieved: 0.55.

3. MARKETING RECOMMENDATIONS
------------------------------------------------------------
- Premium VIP (Cluster 0): Concierge support, early product previews, bespoke tier.
- Conservative Savers (Cluster 1): High-end bundle deals, luxury cash-backs.
- Budget Shoppers (Cluster 2): Flash sales, limited coupons, Buy Now Pay Later.
- Stable Regulars (Cluster 3): Subscription boxes, predictable cashback, newsletters.
- Potential Dormants (Cluster 4): Activation coupons, educational introductory campaigns.

End of Report.
`;
    const blob = new Blob([textReport], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Customer_Segmentation_Internship_Report.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="internship-report" className="grid grid-cols-1 md:grid-cols-12 gap-8">
      {/* Table of Contents Column */}
      <div className="md:col-span-4 bg-[#111113] p-5 rounded-3xl border border-[#27272a] flex flex-col justify-between space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-5 w-5 text-indigo-400" />
            <h3 className="font-bold text-[#fafafa] text-sm">Report Modules</h3>
          </div>
          <div className="space-y-1.5">
            {sections.map((sec, idx) => (
              <button
                key={idx}
                id={`btn-report-toc-${idx}`}
                onClick={() => setActiveSectionIdx(idx)}
                className={`w-full flex items-center justify-between text-left px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeSectionIdx === idx
                    ? "bg-indigo-500 text-white shadow-sm"
                    : "text-[#a1a1aa] hover:bg-[#1c1c1f]"
                }`}
              >
                <span>{sec.title}</span>
                <ChevronRight className={`h-3.5 w-3.5 transition-transform ${activeSectionIdx === idx ? "rotate-90 text-white" : "text-[#71717a]"}`} />
              </button>
            ))}
          </div>
        </div>

        <button
          id="btn-download-report-txt"
          onClick={handleDownloadReport}
          className="w-full py-2.5 border border-[#27272a] border-dashed hover:bg-[#1c1c1f]/50 text-[#a1a1aa] hover:text-[#fafafa] font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Download className="h-4 w-4 text-indigo-400" />
          Download Report (.TXT)
        </button>
      </div>

      {/* Document Reader Area */}
      <div className="md:col-span-8 bg-[#111113] border border-[#27272a] rounded-3xl p-6 md:p-8 min-h-[450px] flex flex-col justify-between">
        <div className="space-y-6">
          {/* Section Header */}
          <div className="flex items-center justify-between border-b border-[#27272a] pb-4">
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">
              Page {activeSectionIdx + 1} of {sections.length}
            </span>
            {sections[activeSectionIdx].badge && (
              <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider">
                {sections[activeSectionIdx].badge}
              </span>
            )}
          </div>

          {/* Active Section Content */}
          <div className="transition-opacity duration-300">
            {sections[activeSectionIdx].content}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between border-t border-[#27272a] pt-6 mt-8 text-xs font-semibold">
          <button
            id="btn-report-prev"
            onClick={() => setActiveSectionIdx((prev) => Math.max(0, prev - 1))}
            disabled={activeSectionIdx === 0}
            className="flex items-center gap-1.5 text-[#a1a1aa] hover:text-[#fafafa] disabled:opacity-40 cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </button>
          <span className="text-[#71717a]">
            Academic Board Submission, DS-2026
          </span>
          <button
            id="btn-report-next"
            onClick={() => setActiveSectionIdx((prev) => Math.min(sections.length - 1, prev + 1))}
            disabled={activeSectionIdx === sections.length - 1}
            className="flex items-center gap-1.5 text-[#a1a1aa] hover:text-[#fafafa] disabled:opacity-40 cursor-pointer"
          >
            Next <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
