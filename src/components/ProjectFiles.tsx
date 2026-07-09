import React, { useState } from "react";
import { Folder, FileCode, FolderOpen, FileText, Check, Copy, Download, CornerDownRight } from "lucide-react";

interface FileNode {
  name: string;
  type: "file" | "folder";
  content?: string;
  children?: FileNode[];
}

export default function ProjectFiles() {
  const [selectedFileName, setSelectedFileName] = useState<string>("README.md");
  const [copied, setCopied] = useState(false);

  const fileTree: FileNode[] = [
    {
      name: "Customer_Segmentation",
      type: "folder",
      children: [
        {
          name: "data",
          type: "folder",
          children: [
            {
              name: "mall_customers.csv",
              type: "file",
              content: "CustomerID,Gender,Age,Annual Income (k$),Spending Score (1-100)\n1001,Male,19,15,39\n1002,Female,21,15,81\n...",
            },
            {
              name: "mall_customers_segmented.csv",
              type: "file",
              content: "CustomerID,Gender,Age,Annual Income (k$),Spending Score (1-100),Cluster\n1001,Male,19,15,39,4\n...",
            },
          ],
        },
        {
          name: "notebook",
          type: "folder",
          children: [
            {
              name: "customer_segmentation.ipynb",
              type: "file",
              content: "{\n  \"cells\": [\n    {\n      \"cell_type\": \"markdown\",\n      \"source\": [\"# Customer Segmentation using K-Means\\n\"]\n    }\n  ]\n}",
            },
          ],
        },
        {
          name: "app",
          type: "folder",
          children: [
            {
              name: "app.py",
              type: "file",
              content: "import streamlit as st\nimport pandas as pd\n# Streamlit App Code here...",
            },
          ],
        },
        {
          name: "report",
          type: "folder",
          children: [
            {
              name: "internship_report.pdf",
              type: "file",
              content: "[Binary PDF Stream - Simulated Certificate & Report Summary]",
            },
            {
              name: "internship_presentation.pptx",
              type: "file",
              content: "[Binary PPTX Stream - 15 Slide Defense Deck]",
            },
          ],
        },
        {
          name: "requirements.txt",
          type: "file",
          content: `pandas>=1.5.0
numpy>=1.22.0
scikit-learn>=1.0.0
matplotlib>=3.5.0
seaborn>=0.12.0
plotly>=5.10.0
streamlit>=1.15.0
scipy>=1.9.0`,
        },
        {
          name: "README.md",
          type: "file",
          content: `# Customer Segmentation using K-Means Clustering

A complete, production-ready Data Science Portfolio & Internship submission project utilizing Unsupervised Machine Learning.

## 🌟 Key Features
- **Data Preprocessing Pipeline**: Built-in outlier detection, null imputation, scaling, and categorical mappings in Python.
- **Robust Model Evaluation**: Elbow WCSS curves and silhouette score tuning to secure optimal cluster division.
- **5 Discovered Consumer Personas**: Premium Shoppers, Conservative Savers, Budget buyers, Stable Regulars, and Potential Dormant accounts.
- **Live Streamlit / React Dashboard**: An interactive web interface with model visualization, custom inputs, and dynamic predictions.
- **Built-in AI Co-pilot**: Powered by Google Gemini to provide instant data science advisory & targeted retail campaigns.

## 📁 Directory Structure
\`\`\`
Customer_Segmentation/
├── data/                       # Contains raw and processed CSV databases
├── notebook/                   # Contains Jupyter Notebook code cells
├── app/                        # Streamlit web dashboard application
├── report/                     # Final PDF report and PPTX defense files
├── requirements.txt            # Package library configurations
├── README.md                   # Setup and usage guides
└── app.py                      # Main dashboard application entry point
\`\`\`

## 🚀 Quick Setup & Installation

1. **Clone the project repository**:
   \`\`\`bash
   git clone https://github.com/intern/customer-segmentation.git
   cd customer-segmentation
   \`\`\`

2. **Initialize python virtual environment**:
   \`\`\`bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\\Scripts\\activate
   \`\`\`

3. **Install exact packages**:
   \`\`\`bash
   pip install -r requirements.txt
   \`\`\`

4. **Launch the web application**:
   \`\`\`bash
   streamlit run app/app.py
   \`\`\`

## 📊 Analytical Insights summary
- **Age is inversely proportional to spending score (-0.32)**: Retailers should direct trendy, high-engagement digital ads to younger demographics.
- **Income does not correlate with spending score (0.01)**: Simple tabular filtering fails to distinguish customers. Only Unsupervised multi-dimensional algorithms (like K-Means) extract true behavioral clusters.

## 📄 License
MIT License. Free for academic & corporate portfolio reviews.`,
        },
      ],
    },
  ];

  // Flat lookup of content
  const findFileContent = (tree: FileNode[], targetName: string): string => {
    for (const node of tree) {
      if (node.name === targetName) {
        return node.content || "";
      }
      if (node.children) {
        const found = findFileContent(node.children, targetName);
        if (found) return found;
      }
    }
    return "";
  };

  const activeContent = findFileContent(fileTree, selectedFileName);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([activeContent], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = selectedFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="project-files" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* File Tree column */}
      <div className="lg:col-span-4 bg-[#111113] p-5 rounded-3xl border border-[#27272a] space-y-4">
        <div className="flex items-center gap-2 border-b border-[#27272a] pb-2">
          <FolderOpen className="h-5 w-5 text-indigo-400" />
          <h4 className="font-bold text-[#fafafa] text-sm">Project Folder Tree</h4>
        </div>

        {/* Tree simulation */}
        <div className="space-y-3 text-xs font-semibold">
          <div className="flex items-center gap-2 text-indigo-400">
            <FolderOpen className="h-4 w-4" />
            <span>Customer_Segmentation/</span>
          </div>

          <div className="pl-4 space-y-2.5 border-l-2 border-[#27272a] ml-2">
            {/* data */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-[#fafafa]/90">
                <Folder className="h-3.5 w-3.5 text-[#71717a]" />
                <span>data/</span>
              </div>
              <div className="pl-4 flex flex-col gap-1.5 text-[#a1a1aa] font-normal">
                <button
                  id="btn-file-mall-csv"
                  onClick={() => setSelectedFileName("mall_customers.csv")}
                  className={`text-left hover:text-indigo-400 font-medium cursor-pointer transition-colors ${selectedFileName === "mall_customers.csv" ? "text-indigo-400 font-semibold" : ""}`}
                >
                  📄 mall_customers.csv
                </button>
                <button
                  id="btn-file-segmented-csv"
                  onClick={() => setSelectedFileName("mall_customers_segmented.csv")}
                  className={`text-left hover:text-indigo-400 font-medium cursor-pointer transition-colors ${selectedFileName === "mall_customers_segmented.csv" ? "text-indigo-400 font-semibold" : ""}`}
                >
                  📄 mall_customers_segmented.csv
                </button>
              </div>
            </div>

            {/* notebook */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-[#fafafa]/90">
                <Folder className="h-3.5 w-3.5 text-[#71717a]" />
                <span>notebook/</span>
              </div>
              <div className="pl-4 text-[#a1a1aa] font-normal">
                <button
                  id="btn-file-ipynb"
                  onClick={() => setSelectedFileName("customer_segmentation.ipynb")}
                  className={`text-left hover:text-indigo-400 font-medium cursor-pointer transition-colors ${selectedFileName === "customer_segmentation.ipynb" ? "text-indigo-400 font-semibold" : ""}`}
                >
                  📄 customer_segmentation.ipynb
                </button>
              </div>
            </div>

            {/* app */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-[#fafafa]/90">
                <Folder className="h-3.5 w-3.5 text-[#71717a]" />
                <span>app/</span>
              </div>
              <div className="pl-4 text-[#a1a1aa] font-normal">
                <button
                  id="btn-file-app-py"
                  onClick={() => setSelectedFileName("app.py")}
                  className={`text-left hover:text-indigo-400 font-medium cursor-pointer transition-colors ${selectedFileName === "app.py" ? "text-indigo-400 font-semibold" : ""}`}
                >
                  📄 app.py
                </button>
              </div>
            </div>

            {/* report */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-[#fafafa]/90">
                <Folder className="h-3.5 w-3.5 text-[#71717a]" />
                <span>report/</span>
              </div>
              <div className="pl-4 flex flex-col gap-1.5 text-[#a1a1aa] font-normal">
                <span className="text-[#71717a] italic">📄 internship_report.pdf</span>
                <span className="text-[#71717a] italic">📄 internship_presentation.pptx</span>
              </div>
            </div>

            {/* root files */}
            <div className="flex flex-col gap-2 font-normal text-[#a1a1aa]">
              <button
                id="btn-file-req"
                onClick={() => setSelectedFileName("requirements.txt")}
                className={`text-left hover:text-indigo-400 font-semibold cursor-pointer transition-colors ${selectedFileName === "requirements.txt" ? "text-indigo-400" : ""}`}
              >
                📄 requirements.txt
              </button>
              <button
                id="btn-file-readme"
                onClick={() => setSelectedFileName("README.md")}
                className={`text-left hover:text-indigo-400 font-semibold cursor-pointer transition-colors ${selectedFileName === "README.md" ? "text-indigo-400" : ""}`}
              >
                📄 README.md
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* File Editor/Viewer column */}
      <div className="lg:col-span-8 bg-[#111113] rounded-3xl border border-[#27272a] overflow-hidden shadow-xl flex flex-col justify-between min-h-[450px]">
        {/* Editor Top Bar */}
        <div className="bg-[#161618] px-5 py-3 flex items-center justify-between border-b border-[#27272a]">
          <div className="flex items-center gap-2">
            <FileCode className="h-4 w-4 text-indigo-400" />
            <span className="text-xs font-mono font-bold text-[#fafafa]">
              {selectedFileName}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Copy */}
            <button
              id="btn-copy-file-editor"
              onClick={handleCopy}
              className="flex items-center gap-1 text-[#a1a1aa] hover:text-[#fafafa] transition-colors text-xs cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>

            {/* Download */}
            <button
              id="btn-download-file-editor"
              onClick={handleDownload}
              className="flex items-center gap-1 text-[#a1a1aa] hover:text-[#fafafa] transition-colors text-xs cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Code Canvas */}
        <div className="flex-1 p-5 sm:p-6 overflow-auto bg-black/20">
          {selectedFileName === "README.md" ? (
            <div className="prose prose-invert max-w-none text-xs sm:text-sm text-[#a1a1aa] leading-relaxed font-sans space-y-4">
              {activeContent.split("\n").map((line, lidx) => {
                if (line.startsWith("# ")) {
                  return <h3 key={lidx} className="text-lg font-bold text-indigo-400 border-b border-[#27272a] pb-2 mb-2">{line.replace("# ", "")}</h3>;
                }
                if (line.startsWith("## ")) {
                  return <h4 key={lidx} className="text-sm font-bold text-indigo-300 mt-4 mb-1">{line.replace("## ", "")}</h4>;
                }
                if (line.startsWith("- ")) {
                  return <li key={lidx} className="ml-4">{line.replace("- ", "")}</li>;
                }
                if (line.startsWith("```")) {
                  return null;
                }
                return <p key={lidx} className="text-[#a1a1aa]">{line}</p>;
              })}
            </div>
          ) : (
            <pre className="font-mono text-xs text-[#a1a1aa] leading-relaxed overflow-x-auto whitespace-pre">
              <code>{activeContent}</code>
            </pre>
          )}
        </div>

        {/* Status Line */}
        <div className="bg-[#161618] px-5 py-2 text-[10px] font-mono text-[#71717a] border-t border-[#27272a]">
          UTF-8 • Standard Python / Text File • Tab Size: 4 Space
        </div>
      </div>
    </div>
  );
}
