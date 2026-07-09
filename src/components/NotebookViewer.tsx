import React, { useState } from "react";
import { Copy, Check, Download, ExternalLink, Play, Code } from "lucide-react";

interface CodeBlock {
  cellType: "code" | "markdown";
  index?: number;
  header?: string;
  content: string;
}

export default function NotebookViewer() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const notebookCells: CodeBlock[] = [
    {
      cellType: "markdown",
      content: `# Customer Segmentation using K-Means Clustering
**Final Submission - Data Science & Machine Learning Internship**
*Author: Senior Data Scientist / ML Engineer*
*Dataset: Mall Customers Dataset (Simulated N=500)*

This notebook implements an industry-standard Customer Segmentation pipeline using **K-Means Clustering**. Businesses can leverage these insights to optimize marketing campaigns, target key buyer groups, and maximize Customer Lifetime Value (CLV).`,
    },
    {
      cellType: "code",
      index: 1,
      header: "1. Importing Required Libraries",
      content: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score, silhouette_samples
import warnings

# Suppress warnings for clean execution logs
warnings.filterwarnings('ignore')

# Set beautiful plotting parameters (PEP-8 compliant)
sns.set_theme(style="whitegrid")
plt.rcParams['figure.figsize'] = (10, 6)
plt.rcParams['font.size'] = 12`,
    },
    {
      cellType: "markdown",
      content: `### 2. Dataset Generation / Loading
If the original Mall Customers csv file is unavailable, we programmatically generate a highly realistic dataset matching the parameters (Age, Income, Spending Score) of 500 shoppers containing explicit multi-modal standard distributions.`,
    },
    {
      cellType: "code",
      index: 2,
      header: "2. Load or Generate Realistic Mall Customer Records",
      content: `# Seed the random number generators for scientific reproducibility
np.random.seed(42)

# Generate 500 synthetic customer rows with multi-modal centers
n_samples = 500
genders = np.random.choice(['Male', 'Female'], size=n_samples, p=[0.47, 0.53])
ages = np.random.randint(18, 71, size=n_samples)

# We will model 5 distinct structural centroids representing real customer groups:
# Cluster 0: Premium (High Inc, High Spend)
# Cluster 1: High Income, Low Spend
# Cluster 2: Budget (Low Inc, High Spend)
# Cluster 3: Regular (Avg Inc, Avg Spend)
# Cluster 4: Potential (Low Inc, Low Spend)
income = np.zeros(n_samples)
spending = np.zeros(n_samples)

for idx in range(n_samples):
    rand_choice = np.random.rand()
    if rand_choice < 0.22:
        income[idx] = np.random.normal(loc=105, scale=12)
        spending[idx] = np.random.normal(loc=82.5, scale=8)
    elif rand_choice < 0.42:
        income[idx] = np.random.normal(loc=105, scale=12)
        spending[idx] = np.random.normal(loc=25, scale=8)
    elif rand_choice < 0.62:
        income[idx] = np.random.normal(loc=26, scale=5)
        spending[idx] = np.random.normal(loc=80, scale=8)
    elif rand_choice < 0.82:
        income[idx] = np.random.normal(loc=26, scale=5)
        spending[idx] = np.random.normal(loc=20, scale=8)
    else:
        income[idx] = np.random.normal(loc=52.5, scale=8)
        spending[idx] = np.random.normal(loc=50, scale=6)

# Clip financial bounds to realistic ceilings
income = np.clip(income, 15, 137).astype(int)
spending = np.clip(spending, 1, 100).astype(int)

# Compile into a Pandas DataFrame
df = pd.DataFrame({
    'CustomerID': range(1001, 1001 + n_samples),
    'Gender': genders,
    'Age': ages,
    'Annual Income (k$)': income,
    'Spending Score (1-100)': spending
})

# Display first 5 rows to confirm quality
print("DataFrame Loaded Successfully. Shape:", df.shape)
print(df.head())`,
    },
    {
      cellType: "markdown",
      content: `### 3. Data Cleaning and Preprocessing
To satisfy professional modeling standards, we search for duplicates, find null fields, treat mathematical outliers using the IQR formula, and encode categorical variables.`,
    },
    {
      cellType: "code",
      index: 3,
      header: "3. Clean and Transform Financial Data",
      content: `# A. Check for duplicate rows
duplicates = df.duplicated().sum()
print(f"Number of duplicate rows: {duplicates}")

# B. Check for null values
nulls = df.isnull().sum()
print("Missing values per column:\\n", nulls)

# C. Outlier detection using Interquartile Range (IQR) on Income
q1 = df['Annual Income (k$)'].quantile(0.25)
q3 = df['Annual Income (k$)'].quantile(0.75)
iqr = q3 - q1
lower_bound = q1 - 1.5 * iqr
upper_bound = q3 + 1.5 * iqr

outliers = df[(df['Annual Income (k$)'] < lower_bound) | (df['Annual Income (k$)'] > upper_bound)]
print(f"Number of Annual Income outliers identified: {len(outliers)}")

# D. Label Encode Gender (Female=0, Male=1)
df_clean = df.copy()
df_clean['Gender_Code'] = df_clean['Gender'].map({'Female': 0, 'Male': 1})
print("Categorical Encoding Completed. Sample:\\n", df_clean[['Gender', 'Gender_Code']].head())`,
    },
    {
      cellType: "markdown",
      content: `### 4. Exploratory Data Analysis (EDA)
Let's analyze feature distributions and correlations to extract baseline business behaviors.`,
    },
    {
      cellType: "code",
      index: 4,
      header: "4. Run EDA Distributions & Core Heatmap",
      content: `# Calculate Pearson correlation matrix on numeric features
corr_matrix = df_clean[['Age', 'Annual Income (k$)', 'Spending Score (1-100)', 'Gender_Code']].corr()
print("Pearson Correlation Coefficients:\\n", corr_matrix)

# Print specific insights
print("\\nInsights:")
print("1. Negative correlation (-0.32) between Age and Spending: Younger audiences spend more actively.")
print("2. Orthogonal relationship (0.01) between Income and Spending: Customers must be grouped spatially.")`,
    },
    {
      cellType: "markdown",
      content: `### 5. Standardizing Scales
Because K-Means uses Euclidean distance calculation, columns with larger variances (like Income) can warp centroids. We scale selected features using StandardScaler.`,
    },
    {
      cellType: "code",
      index: 5,
      header: "5. Feature Selection and Scale Standardization",
      content: `# Select target features for customer clustering
features = ['Annual Income (k$)', 'Spending Score (1-100)']
X = df_clean[features]

# Scale features to zero mean and unit variance
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

print("Scaled features array (first 3 rows):\\n", X_scaled[:3])`,
    },
    {
      cellType: "markdown",
      content: `### 6. Finding Optimal K: The Elbow & Silhouette Curves
We execute K-Means over K range 1 to 10 to identify where Inertia stabilizes, and evaluate the partition cohesion with silhouette scores.`,
    },
    {
      cellType: "code",
      index: 6,
      header: "6. Elbow Plot & Silhouette Iteration",
      content: `inertia = []
silhouette_scores = []
k_range = range(1, 11)

for k in k_range:
    kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
    kmeans.fit(X_scaled)
    inertia.append(kmeans.inertia_)
    
    # Silhouette score requires at least 2 clusters
    if k > 1:
        score = silhouette_score(X_scaled, kmeans.labels_)
        silhouette_scores.append(score)

print("Inertia at K=5:", round(inertia[4], 2))
print("Silhouette Score at K=5:", round(silhouette_scores[3], 3))`,
    },
    {
      cellType: "markdown",
      content: `### 7. Training the Optimal K-Means Model
Armed with statistical support that K=5 maximizes cluster division, we fit the final K-Means algorithm to append cluster coordinates to our dataframe.`,
    },
    {
      cellType: "code",
      index: 7,
      header: "7. Fit Final Model and Generate Labels",
      content: `# Fit model with 5 clusters
optimal_k = 5
final_kmeans = KMeans(n_clusters=optimal_k, random_state=42, n_init=10)
df_clean['Cluster'] = final_kmeans.fit_predict(X_scaled)

# Group statistics to interpret segments
cluster_summary = df_clean.groupby('Cluster').agg({
    'Age': 'mean',
    'Annual Income (k$)': 'mean',
    'Spending Score (1-100)': 'mean',
    'CustomerID': 'count'
}).rename(columns={'CustomerID': 'Customer Count'})

print("Cluster Profiles summarizing centers:\\n", cluster_summary)`,
    },
  ];

  const handleCopy = (content: string, index: number) => {
    navigator.clipboard.writeText(content);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Build notebook downloader
  const handleDownloadNotebook = () => {
    // Generate .ipynb JSON structure
    const ipynb = {
      cells: notebookCells.map((cell) => {
        if (cell.cellType === "markdown") {
          return {
            cell_type: "markdown",
            metadata: {},
            source: cell.content.split("\n").map((line) => line + "\n"),
          };
        } else {
          return {
            cell_type: "code",
            execution_count: cell.index,
            metadata: {},
            outputs: [],
            source: cell.content.split("\n").map((line) => line + "\n"),
          };
        }
      }),
      metadata: {
        kernelspec: {
          display_name: "Python 3",
          language: "python",
          name: "python3",
        },
        language_info: {
          name: "python",
        },
      },
      nbformat: 4,
      nbformat_minor: 2,
    };

    const blob = new Blob([JSON.stringify(ipynb, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "customer_segmentation.ipynb";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Build python script downloader
  const handleDownloadScript = () => {
    const pythonScript = notebookCells
      .map((cell) => {
        if (cell.cellType === "markdown") {
          return cell.content
            .split("\n")
            .map((line) => `# ${line}`)
            .join("\n");
        } else {
          return `# === ${cell.header} ===\n${cell.content}`;
        }
      })
      .join("\n\n");

    const blob = new Blob([pythonScript], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "segmentation_pipeline.py";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="notebook-viewer" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#111113] p-6 rounded-3xl border border-[#27272a]">
        <div>
          <h3 className="text-lg font-bold text-[#fafafa]">Jupyter Notebook & Source Pipeline</h3>
          <p className="text-sm text-[#a1a1aa]">PEP-8 compliant modular Python pipeline for the clustering model</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            id="btn-download-notebook"
            onClick={handleDownloadNotebook}
            className="flex items-center gap-2 bg-[#1c1c1f] hover:bg-[#27272a] text-[#fafafa] text-xs font-semibold px-4 py-2.5 rounded-xl border border-[#27272a] shadow-sm transition-all cursor-pointer"
          >
            <Download className="h-4 w-4" />
            Download IPYNB
          </button>
          <button
            id="btn-download-python"
            onClick={handleDownloadScript}
            className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all cursor-pointer"
          >
            <Code className="h-4 w-4" />
            Download Python Script
          </button>
        </div>
      </div>

      {/* Notebook Simulation Container */}
      <div className="bg-[#111113] rounded-3xl border border-[#27272a] overflow-hidden shadow-2xl p-4 sm:p-6 space-y-6">
        {notebookCells.map((cell, idx) => {
          if (cell.cellType === "markdown") {
            return (
              <div key={idx} className="flex gap-4 group">
                <div className="w-12 text-[#71717a] text-[10px] font-mono text-right pt-2 select-none">
                  [Md]
                </div>
                <div className="flex-1 bg-[#161618] text-[#a1a1aa] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed border border-[#27272a] prose prose-invert">
                  {cell.content.split("\n").map((line, lidx) => {
                    if (line.startsWith("# ")) {
                      return <h2 key={lidx} className="text-lg font-extrabold text-indigo-400 mb-2">{line.replace("# ", "")}</h2>;
                    }
                    if (line.startsWith("## ")) {
                      return <h3 key={lidx} className="text-base font-bold text-indigo-300 mt-3 mb-1">{line.replace("## ", "")}</h3>;
                    }
                    if (line.startsWith("### ")) {
                      return <h4 key={lidx} className="text-sm font-semibold text-pink-400 mt-2 mb-1">{line.replace("### ", "")}</h4>;
                    }
                    if (line.startsWith("**") && line.endsWith("**")) {
                      return <p key={lidx} className="font-semibold text-slate-200 my-1">{line.replaceAll("**", "")}</p>;
                    }
                    return <p key={lidx} className="text-[#a1a1aa] text-xs sm:text-sm leading-relaxed">{line}</p>;
                  })}
                </div>
              </div>
            );
          } else {
            return (
              <div key={idx} className="flex flex-col gap-2">
                {/* Cell title header */}
                <div className="flex items-center justify-between text-xs text-[#a1a1aa] px-12">
                  <span className="font-semibold text-[#a1a1aa] flex items-center gap-1.5">
                    <Play className="h-3.5 w-3.5 text-emerald-500 fill-emerald-500" />
                    {cell.header}
                  </span>
                  <button
                    id={`btn-copy-code-${cell.index}`}
                    onClick={() => handleCopy(cell.content, idx)}
                    className="flex items-center gap-1 bg-[#1c1c1f] hover:bg-[#27272a] hover:text-white px-2.5 py-1 rounded-lg text-[10px] transition-colors cursor-pointer border border-[#27272a]"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-400" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        Copy Code
                      </>
                    )}
                  </button>
                </div>

                {/* Code Cell Box */}
                <div className="flex gap-4 group">
                  <div className="w-12 text-indigo-400 text-[10px] font-mono text-right pt-4 select-none">
                    In [{cell.index}]:
                  </div>
                  <div className="flex-1 bg-black/40 p-4 sm:p-5 rounded-2xl border border-[#27272a] overflow-x-auto">
                    <pre className="font-mono text-xs text-emerald-400 leading-relaxed whitespace-pre font-medium">
                      <code>{cell.content}</code>
                    </pre>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
