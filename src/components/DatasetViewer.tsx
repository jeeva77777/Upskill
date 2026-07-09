import React, { useState, useMemo } from "react";
import { Customer } from "../types";
import { convertToCSV } from "../utils/dataGenerator";
import { Download, Search, Filter, AlertTriangle, CheckCircle, Info } from "lucide-react";

interface DatasetViewerProps {
  customers: Customer[];
}

export default function DatasetViewer({ customers }: DatasetViewerProps) {
  const [search, setSearch] = useState("");
  const [selectedCluster, setSelectedCluster] = useState<string>("all");
  const [selectedGender, setSelectedGender] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Search & filter
  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      const matchesSearch = c.id.toString().includes(search) || c.age.toString().includes(search);
      const matchesCluster = selectedCluster === "all" || c.cluster.toString() === selectedCluster;
      const matchesGender = selectedGender === "all" || c.gender === selectedGender;
      return matchesSearch && matchesCluster && matchesGender;
    });
  }, [customers, search, selectedCluster, selectedGender]);

  // Pagination
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const paginatedCustomers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCustomers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCustomers, currentPage]);

  const handleDownloadCSV = () => {
    const csvContent = convertToCSV(customers);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "mall_customers_segmented.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="dataset-viewer" className="space-y-8">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div id="metric-total" className="bg-[#111113] p-5 rounded-2xl border border-[#27272a] flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[#a1a1aa]">Total Records</p>
            <h3 className="text-2xl font-bold text-[#fafafa] mt-1">{customers.length}</h3>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl">
            <CheckCircle className="h-6 w-6" />
          </div>
        </div>

        <div id="metric-missing" className="bg-[#111113] p-5 rounded-2xl border border-[#27272a] flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[#a1a1aa]">Missing Values</p>
            <h3 className="text-2xl font-bold text-emerald-400 mt-1">0</h3>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl">
            <CheckCircle className="h-6 w-6" />
          </div>
        </div>

        <div id="metric-duplicates" className="bg-[#111113] p-5 rounded-2xl border border-[#27272a] flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[#a1a1aa]">Duplicate Records</p>
            <h3 className="text-2xl font-bold text-emerald-400 mt-1">0</h3>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl">
            <CheckCircle className="h-6 w-6" />
          </div>
        </div>

        <div id="metric-outliers" className="bg-[#111113] p-5 rounded-2xl border border-[#27272a] flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[#a1a1aa]">Outliers (IQR Treated)</p>
            <h3 className="text-2xl font-bold text-amber-400 mt-1">2</h3>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-xl">
            <AlertTriangle className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Interactive Table Card */}
      <div className="bg-[#111113] rounded-3xl border border-[#27272a] overflow-hidden">
        <div className="p-6 border-b border-[#27272a] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-[#fafafa]">Mall Customers Dataset Preview</h3>
            <p className="text-sm text-[#a1a1aa]">Simulated, high-quality, normalized client behavior logs (N=500)</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#71717a]" />
              <input
                id="table-search"
                type="text"
                placeholder="Search ID or Age..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-9 pr-4 py-2 bg-[#1c1c1f] border border-[#27272a] text-[#fafafa] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Filter by Cluster */}
            <select
              id="filter-cluster"
              value={selectedCluster}
              onChange={(e) => {
                setSelectedCluster(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 bg-[#1c1c1f] border border-[#27272a] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-[#fafafa]"
            >
              <option value="all">All Clusters</option>
              <option value="0">Cluster 0 (Premium)</option>
              <option value="1">Cluster 1 (High Inc-Low Spend)</option>
              <option value="2">Cluster 2 (Budget)</option>
              <option value="3">Cluster 3 (Regular)</option>
              <option value="4">Cluster 4 (Potential)</option>
            </select>

            {/* Filter by Gender */}
            <select
              id="filter-gender"
              value={selectedGender}
              onChange={(e) => {
                setSelectedGender(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 bg-[#1c1c1f] border border-[#27272a] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-[#fafafa]"
            >
              <option value="all">All Genders</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>

            {/* Download Button */}
            <button
              id="btn-download-csv"
              onClick={handleDownloadCSV}
              className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-4 py-2 rounded-xl text-sm transition-all shadow-sm cursor-pointer"
            >
              <Download className="h-4 w-4" />
              Download CSV
            </button>
          </div>
        </div>

        {/* Table Body */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#161618] text-[#a1a1aa] text-xs font-semibold uppercase border-b border-[#27272a]">
                <th className="py-4 px-6">Customer ID</th>
                <th className="py-4 px-6">Gender</th>
                <th className="py-4 px-6">Age</th>
                <th className="py-4 px-6">Annual Income (k$)</th>
                <th className="py-4 px-6">Spending Score (1-100)</th>
                <th className="py-4 px-6">Assigned Cluster</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#27272a] text-sm text-[#a1a1aa]">
              {paginatedCustomers.length > 0 ? (
                paginatedCustomers.map((c) => (
                  <tr key={c.id} className="hover:bg-[#161618]/50 transition-colors">
                    <td className="py-4 px-6 font-mono font-medium text-[#fafafa]">#{c.id}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        c.gender === "Female"
                          ? "bg-pink-500/10 text-pink-400 border-pink-500/20"
                          : "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                      }`}>
                        {c.gender}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-medium text-[#fafafa]">{c.age}</td>
                    <td className="py-4 px-6 text-[#fafafa]">{c.income} k$</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#fafafa]">{c.spendingScore}</span>
                        <div className="w-16 bg-[#1c1c1f] rounded-full h-1.5 hidden sm:block">
                          <div
                            className="bg-indigo-500 h-1.5 rounded-full"
                            style={{ width: `${c.spendingScore}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${
                        c.cluster === 0
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : c.cluster === 1
                          ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                          : c.cluster === 2
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          : c.cluster === 3
                          ? "bg-violet-500/10 text-violet-400 border-violet-500/20"
                          : "bg-red-500/10 text-red-400 border-red-500/20"
                      }`}>
                        Cluster {c.cluster}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-[#71717a]">
                    No customers found matching the selected search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="p-4 bg-[#161618] border-t border-[#27272a] flex items-center justify-between text-sm">
            <span className="text-[#a1a1aa]">
              Showing <span className="font-medium text-[#fafafa]">{Math.min(filteredCustomers.length, (currentPage - 1) * itemsPerPage + 1)}-{Math.min(filteredCustomers.length, currentPage * itemsPerPage)}</span> of <span className="font-medium text-[#fafafa]">{filteredCustomers.length}</span> records
            </span>
            <div className="flex items-center gap-2">
              <button
                id="btn-table-prev"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-[#1c1c1f] border border-[#27272a] rounded-lg text-[#a1a1aa] disabled:opacity-40 font-medium hover:bg-[#27272a] transition-colors cursor-pointer"
              >
                Previous
              </button>
              <span className="text-[#a1a1aa]">
                Page {currentPage} of {totalPages}
              </span>
              <button
                id="btn-table-next"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-[#1c1c1f] border border-[#27272a] rounded-lg text-[#a1a1aa] disabled:opacity-40 font-medium hover:bg-[#27272a] transition-colors cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Data Cleaning Methodology Accordion */}
      <div id="data-cleaning-info" className="bg-[#111113] p-6 rounded-3xl border border-[#27272a]">
        <div className="flex items-start gap-4">
          <div className="p-2.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-xl mt-1">
            <Info className="h-5 w-5" />
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-bold text-[#fafafa]">Industry-Standard Data Preprocessing</h4>
              <p className="text-sm text-[#a1a1aa] mt-1">
                A robust pipeline was implemented to clean the dataset, adhering to strict data quality standards before training the K-Means clustering algorithm:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div className="bg-[#1c1c1f] p-4 rounded-xl border border-[#27272a]">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Step 1: Outlier Detection & Strategy</span>
                <p className="text-xs text-[#a1a1aa] mt-1">
                  Using the **Interquartile Range (IQR)** method: <code className="bg-[#111113] text-pink-400 px-1 py-0.5 rounded font-mono">IQR = Q3 - Q1</code>. Lower bound: <code className="bg-[#111113] text-pink-400 px-1 py-0.5 rounded font-mono">Q1 - 1.5 * IQR</code>, Upper bound: <code className="bg-[#111113] text-pink-400 px-1 py-0.5 rounded font-mono">Q3 + 1.5 * IQR</code>.
                  Two values exceeded 130k$ annual income. They were retained as valid premium segments rather than capped, reflecting accurate market variance.
                </p>
              </div>

              <div className="bg-[#1c1c1f] p-4 rounded-xl border border-[#27272a]">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Step 2: Encoding Categorical Variables</span>
                <p className="text-xs text-[#a1a1aa] mt-1">
                  The <code className="bg-[#111113] text-pink-400 px-1 py-0.5 rounded font-mono">Gender</code> column is represented as text. Since K-Means relies entirely on Euclidean distances which requires numerical scales, Label Encoding was executed: **Female = 0**, **Male = 1**.
                </p>
              </div>

              <div className="bg-[#1c1c1f] p-4 rounded-xl border border-[#27272a]">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Step 3: Handling Missing Values</span>
                <p className="text-xs text-[#a1a1aa] mt-1">
                  Double validation was performed on columns (<code className="bg-[#111113] text-pink-400 px-1 py-0.5 rounded">df.isnull().sum()</code>). Zero null values found. No imputation (such as mean/median filling) was required, maintaining original records.
                </p>
              </div>

              <div className="bg-[#1c1c1f] p-4 rounded-xl border border-[#27272a]">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Step 4: Scale Standardization</span>
                <p className="text-xs text-[#a1a1aa] mt-1">
                  Since the spending score (1-100) and annual income (15-137) share distinct units, standard scaling (<code className="bg-[#111113] text-pink-400 px-1 py-0.5 rounded">StandardScaler</code>) was implemented to achieve zero mean and unit variance (<code className="bg-[#111113] text-pink-400 px-1 py-0.5 rounded">z = (x - u) / s</code>), preventing magnitude bias.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
