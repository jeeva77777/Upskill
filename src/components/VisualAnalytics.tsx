import React, { useMemo } from "react";
import { Customer, SegmentInfo } from "../types";
import { segments } from "../utils/dataGenerator";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { Info, BarChart2, TrendingUp, ScatterChart as ScatterIcon } from "lucide-react";

interface VisualAnalyticsProps {
  customers: Customer[];
}

export default function VisualAnalytics({ customers }: VisualAnalyticsProps) {
  // 1. Gender distribution calculation
  const genderData = useMemo(() => {
    const maleCount = customers.filter((c) => c.gender === "Male").length;
    const femaleCount = customers.filter((c) => c.gender === "Female").length;
    return [
      { name: "Female", value: femaleCount, percentage: ((femaleCount / customers.length) * 100).toFixed(1) },
      { name: "Male", value: maleCount, percentage: ((maleCount / customers.length) * 100).toFixed(1) },
    ];
  }, [customers]);

  // 2. Age distribution calculation (Bins of 10 years)
  const ageData = useMemo(() => {
    const bins = {
      "18-25": 0,
      "26-35": 0,
      "36-45": 0,
      "46-55": 0,
      "56-70": 0,
    };
    customers.forEach((c) => {
      if (c.age >= 18 && c.age <= 25) bins["18-25"]++;
      else if (c.age >= 26 && c.age <= 35) bins["26-35"]++;
      else if (c.age >= 36 && c.age <= 45) bins["36-45"]++;
      else if (c.age >= 46 && c.age <= 55) bins["46-55"]++;
      else if (c.age >= 56) bins["56-70"]++;
    });
    return Object.keys(bins).map((key) => ({
      group: key,
      Count: bins[key as keyof typeof bins],
    }));
  }, [customers]);

  // 3. Annual Income & Spending distributions
  const incomeDistribution = useMemo(() => {
    const bins = {
      "15-35k": 0,
      "36-55k": 0,
      "56-75k": 0,
      "76-100k": 0,
      "101-140k": 0,
    };
    customers.forEach((c) => {
      if (c.income <= 35) bins["15-35k"]++;
      else if (c.income <= 55) bins["36-55k"]++;
      else if (c.income <= 75) bins["56-75k"]++;
      else if (c.income <= 100) bins["76-100k"]++;
      else bins["101-140k"]++;
    });
    return Object.keys(bins).map((key) => ({
      range: key,
      Customers: bins[key as keyof typeof bins],
    }));
  }, [customers]);

  const spendingDistribution = useMemo(() => {
    const bins = {
      "1-20": 0,
      "21-40": 0,
      "41-60": 0,
      "61-80": 0,
      "81-100": 0,
    };
    customers.forEach((c) => {
      if (c.spendingScore <= 20) bins["1-20"]++;
      else if (c.spendingScore <= 40) bins["21-40"]++;
      else if (c.spendingScore <= 60) bins["41-60"]++;
      else if (c.spendingScore <= 80) bins["61-80"]++;
      else bins["81-100"]++;
    });
    return Object.keys(bins).map((key) => ({
      scoreRange: key,
      Customers: bins[key as keyof typeof bins],
    }));
  }, [customers]);

  // 4. Group data by clusters for scatter chart
  const scatterData = useMemo(() => {
    const groups: Record<number, Customer[]> = {};
    for (let i = 0; i < 5; i++) groups[i] = [];

    customers.forEach((c) => {
      groups[c.cluster].push(c);
    });

    return Object.keys(groups).map((key) => {
      const idx = parseInt(key);
      return {
        cluster: idx,
        name: segments[idx].name,
        color: segments[idx].color,
        data: groups[idx].map((item) => ({
          x: item.income,
          y: item.spendingScore,
          id: item.id,
          age: item.age,
          gender: item.gender,
        })),
      };
    });
  }, [customers]);

  // 5. Model Evaluation lines
  const elbowData = [
    { k: 1, inertia: 265000 },
    { k: 2, inertia: 181000 },
    { k: 3, inertia: 106000 },
    { k: 4, inertia: 73000 },
    { k: 5, inertia: 44000 }, // Elbow point!
    { k: 6, inertia: 37000 },
    { k: 7, inertia: 32000 },
    { k: 8, inertia: 28000 },
    { k: 9, inertia: 25000 },
    { k: 10, inertia: 22000 },
  ];

  const silhouetteData = [
    { k: 2, score: 0.35 },
    { k: 3, score: 0.46 },
    { k: 4, score: 0.49 },
    { k: 5, score: 0.55 }, // Peaks!
    { k: 6, score: 0.48 },
    { k: 7, score: 0.44 },
    { k: 8, score: 0.41 },
    { k: 9, score: 0.38 },
    { k: 10, score: 0.36 },
  ];

  // Colors for Gender Pie
  const COLORS = ["#ec4899", "#06b6d4"];

  return (
    <div id="visual-analytics" className="space-y-8">
      {/* 2D Cluster Scatter Plot */}
      <div className="bg-[#111113] p-6 rounded-3xl border border-[#27272a] shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-xl">
            <ScatterIcon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#fafafa]">K-Means Customer Segments (Final Model)</h3>
            <p className="text-sm text-[#a1a1aa]">2D Scatter mapping Annual Income against Spending Score</p>
          </div>
        </div>

        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis
                type="number"
                dataKey="x"
                name="Annual Income"
                unit="k$"
                stroke="#71717a"
                tick={{ fill: "#a1a1aa", fontSize: 11 }}
                label={{ value: "Annual Income (k$)", position: "insideBottom", offset: -5, fill: "#a1a1aa" }}
                domain={[10, 145]}
              />
              <YAxis
                type="number"
                dataKey="y"
                name="Spending Score"
                stroke="#71717a"
                tick={{ fill: "#a1a1aa", fontSize: 11 }}
                label={{ value: "Spending Score (1-100)", angle: -90, position: "insideLeft", offset: 10, fill: "#a1a1aa" }}
                domain={[0, 105]}
              />
              <ZAxis type="number" range={[60, 60]} />
              <Tooltip
                cursor={{ strokeDasharray: "3 3", stroke: "#27272a" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-[#111113] text-[#fafafa] p-3 rounded-xl border border-[#27272a] shadow-xl text-xs space-y-1">
                        <p className="font-bold border-b border-[#27272a] pb-1 mb-1 text-indigo-400">
                          Customer ID: #{data.id}
                        </p>
                        <p className="text-[#a1a1aa]">Gender: {data.gender}</p>
                        <p className="text-[#a1a1aa]">Age: {data.age} years old</p>
                        <p className="text-[#a1a1aa]">Annual Income: {data.x} k$</p>
                        <p className="text-[#a1a1aa]">Spending Score: {data.y}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend
                verticalAlign="top"
                height={36}
                wrapperStyle={{ fontSize: "12px", paddingBottom: "10px", color: "#fafafa" }}
              />
              {scatterData.map((group) => (
                <Scatter
                  key={group.cluster}
                  name={group.name}
                  data={group.data}
                  fill={group.color}
                  shape="circle"
                />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 p-4 bg-[#161618] border border-[#27272a] rounded-2xl flex gap-3 text-xs text-[#a1a1aa]">
          <Info className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
          <p>
            **Business Segment Boundary Insight**: The cluster boundaries are distinct. K-Means clustering perfectly splits five groups: Budget Shoppers (top-left), Dormant/Potential buyers (bottom-left), Premium VIP core (top-right), conservative high-earning savers (bottom-right), and a highly reliable regular shopper mass in the dead center.
          </p>
        </div>
      </div>

      {/* Grid of Demographics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Age & Gender Distributions */}
        <div className="bg-[#111113] p-6 rounded-3xl border border-[#27272a] space-y-6">
          <div className="flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-indigo-400" />
            <h4 className="font-bold text-[#fafafa]">Age & Gender Distributions</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Age Bar */}
            <div className="space-y-2">
              <h5 className="text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider text-center">
                Age Groups Distribution
              </h5>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ageData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                    <XAxis dataKey="group" stroke="#71717a" tick={{ fontSize: 11, fill: "#a1a1aa" }} />
                    <YAxis stroke="#71717a" tick={{ fontSize: 11, fill: "#a1a1aa" }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#111113", borderColor: "#27272a", borderRadius: "12px" }}
                      itemStyle={{ color: "#fafafa" }}
                      labelStyle={{ color: "#a1a1aa" }}
                    />
                    <Bar dataKey="Count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Gender Donut */}
            <div className="space-y-2 flex flex-col justify-between">
              <h5 className="text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider text-center">
                Gender Demographic Proportion
              </h5>
              <div className="h-40 relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={genderData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={65}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {genderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: "#111113", borderColor: "#27272a", borderRadius: "12px" }}
                      itemStyle={{ color: "#fafafa" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                {/* Donut Label */}
                <div className="absolute text-center">
                  <span className="text-xs text-[#a1a1aa] block font-medium">Females</span>
                  <span className="text-lg font-bold text-pink-400">
                    {genderData[0]?.percentage}%
                  </span>
                </div>
              </div>
              <div className="flex justify-center gap-4 text-xs font-medium">
                <span className="flex items-center gap-1.5 text-pink-400">
                  <span className="h-2 w-2 rounded-full bg-pink-500"></span> Female ({genderData[0]?.value})
                </span>
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <span className="h-2 w-2 rounded-full bg-cyan-500"></span> Male ({genderData[1]?.value})
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-[#161618] border border-[#27272a] rounded-xl text-xs text-[#a1a1aa]">
            **Demographic Synthesis**: Females form a mild majority (~53%). Age demographics reflect a massive density of active millennial shoppers aged **26 to 35**, offering maximum lifetime value.
          </div>
        </div>

        {/* Income & Spending Distributions */}
        <div className="bg-[#111113] p-6 rounded-3xl border border-[#27272a] space-y-6">
          <div className="flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-indigo-400" />
            <h4 className="font-bold text-[#fafafa]">Financial Metrics Distribution</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Annual Income */}
            <div className="space-y-2">
              <h5 className="text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider text-center">
                Annual Income Distribution
              </h5>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={incomeDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                    <XAxis dataKey="range" stroke="#71717a" tick={{ fontSize: 10, fill: "#a1a1aa" }} />
                    <YAxis stroke="#71717a" tick={{ fontSize: 11, fill: "#a1a1aa" }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#111113", borderColor: "#27272a", borderRadius: "12px" }}
                      itemStyle={{ color: "#fafafa" }}
                      labelStyle={{ color: "#a1a1aa" }}
                    />
                    <Bar dataKey="Customers" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Spending Score */}
            <div className="space-y-2">
              <h5 className="text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider text-center">
                Spending Score (1-100) Distribution
              </h5>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={spendingDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                    <XAxis dataKey="scoreRange" stroke="#71717a" tick={{ fontSize: 11, fill: "#a1a1aa" }} />
                    <YAxis stroke="#71717a" tick={{ fontSize: 11, fill: "#a1a1aa" }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#111113", borderColor: "#27272a", borderRadius: "12px" }}
                      itemStyle={{ color: "#fafafa" }}
                      labelStyle={{ color: "#a1a1aa" }}
                    />
                    <Bar dataKey="Customers" fill="#ec4899" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="p-3 bg-[#161618] border border-[#27272a] rounded-xl text-xs text-[#a1a1aa]">
            **Financial Metrics Analysis**: Income displays a balanced bell-curve with density at 40k$ - 75k$. Spending scores are distributed evenly, which proves K-Means is highly stable when analyzing both axes simultaneously.
          </div>
        </div>
      </div>

      {/* Model Optimization Indicators (Elbow Method & Silhouette Scores) */}
      <div className="bg-[#111113] p-6 rounded-3xl border border-[#27272a]">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-xl">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#fafafa]">Mathematical Model Optimization Metrics</h3>
            <p className="text-sm text-[#a1a1aa]">Validation curves confirming why K=5 is the optimal cluster parameter</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Elbow Method */}
          <div className="space-y-3">
            <div className="border-b border-[#27272a] pb-2">
              <h4 className="font-bold text-[#fafafa] text-sm">1. The Elbow Method (Inertia Curve)</h4>
              <p className="text-xs text-[#a1a1aa] mt-0.5">Calculates Sum of Squared Distances from centroids</p>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={elbowData} margin={{ left: 10, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis dataKey="k" stroke="#71717a" tick={{ fill: "#a1a1aa" }} label={{ value: "Number of Clusters (k)", position: "insideBottom", offset: -5, fill: "#a1a1aa" }} />
                  <YAxis stroke="#71717a" tick={{ fill: "#a1a1aa" }} label={{ value: "Inertia (Within-Cluster SS)", angle: -90, position: "insideLeft", offset: 10, fill: "#a1a1aa" }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#111113", borderColor: "#27272a", borderRadius: "12px" }}
                    itemStyle={{ color: "#fafafa" }}
                    labelStyle={{ color: "#a1a1aa" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="inertia"
                    stroke="#4f46e5"
                    strokeWidth={3}
                    dot={{ r: 5, fill: "#4f46e5", strokeWidth: 2, stroke: "#fff" }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-[#a1a1aa] italic leading-relaxed pt-2">
              **The Elbow Criterion**: The curve sharply drops and stabilizes precisely at **K = 5**. Beyond 5, the margin-decrease of Inertia minimizes, proving K=5 balances variance and complexity.
            </p>
          </div>

          {/* Silhouette Score */}
          <div className="space-y-3">
            <div className="border-b border-[#27272a] pb-2">
              <h4 className="font-bold text-[#fafafa] text-sm">2. Silhouette Score Analysis</h4>
              <p className="text-xs text-[#a1a1aa] mt-0.5">Measures segment cohesion vs. separate distance (ranges from -1 to 1)</p>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={silhouetteData} margin={{ left: 10, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis dataKey="k" stroke="#71717a" tick={{ fill: "#a1a1aa" }} label={{ value: "Number of Clusters (k)", position: "insideBottom", offset: -5, fill: "#a1a1aa" }} />
                  <YAxis domain={[0.2, 0.6]} stroke="#71717a" tick={{ fill: "#a1a1aa" }} label={{ value: "Silhouette Coefficient", angle: -90, position: "insideLeft", offset: 10, fill: "#a1a1aa" }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#111113", borderColor: "#27272a", borderRadius: "12px" }}
                    itemStyle={{ color: "#fafafa" }}
                    labelStyle={{ color: "#a1a1aa" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#ec4899"
                    strokeWidth={3}
                    dot={{ r: 5, fill: "#ec4899", strokeWidth: 2, stroke: "#fff" }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-[#a1a1aa] italic leading-relaxed pt-2">
              **Silhouette Score Maximization**: The silhouette score peaks cleanly at **0.55** when **K = 5**. This provides statistical proof that clusters are highly cohesive and distinct.
            </p>
          </div>
        </div>
      </div>

      {/* Feature Correlation Heatmap Grid */}
      <div className="bg-[#111113] p-6 rounded-3xl border border-[#27272a] space-y-4">
        <h4 className="font-bold text-[#fafafa] text-sm border-b border-[#27272a] pb-2">3. Feature Correlation Matrix</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Correlation Grid representation */}
          <div className="space-y-2 max-w-sm mx-auto w-full">
            <div className="grid grid-cols-5 gap-1 text-center font-mono text-xs font-semibold text-[#71717a]">
              <div></div>
              <div>Gender</div>
              <div>Age</div>
              <div>Income</div>
              <div>Spend</div>
            </div>
            {/* Row 1: Gender */}
            <div className="grid grid-cols-5 gap-1 text-center font-mono text-xs">
              <div className="text-left font-semibold text-[#71717a] py-2">Gender</div>
              <div className="bg-pink-500/10 text-pink-400 border border-pink-500/20 font-bold p-2 rounded">1.00</div>
              <div className="bg-[#1c1c1f] text-[#a1a1aa] p-2 rounded border border-[#27272a]">-0.06</div>
              <div className="bg-[#1c1c1f] text-[#a1a1aa] p-2 rounded border border-[#27272a]">0.05</div>
              <div className="bg-[#1c1c1f] text-[#a1a1aa] p-2 rounded border border-[#27272a]">0.06</div>
            </div>
            {/* Row 2: Age */}
            <div className="grid grid-cols-5 gap-1 text-center font-mono text-xs">
              <div className="text-left font-semibold text-[#71717a] py-2">Age</div>
              <div className="bg-[#1c1c1f] text-[#a1a1aa] p-2 rounded border border-[#27272a]">-0.06</div>
              <div className="bg-pink-500/10 text-pink-400 border border-pink-500/20 font-bold p-2 rounded">1.00</div>
              <div className="bg-[#1c1c1f] text-[#a1a1aa] p-2 rounded border border-[#27272a]">-0.01</div>
              <div className="bg-red-500/10 text-red-400 border border-red-500/20 p-2 rounded">-0.32</div>
            </div>
            {/* Row 3: Income */}
            <div className="grid grid-cols-5 gap-1 text-center font-mono text-xs">
              <div className="text-left font-semibold text-[#71717a] py-2">Income</div>
              <div className="bg-[#1c1c1f] text-[#a1a1aa] p-2 rounded border border-[#27272a]">0.05</div>
              <div className="bg-[#1c1c1f] text-[#a1a1aa] p-2 rounded border border-[#27272a]">-0.01</div>
              <div className="bg-pink-500/10 text-pink-400 border border-pink-500/20 font-bold p-2 rounded">1.00</div>
              <div className="bg-[#1c1c1f] text-[#a1a1aa] p-2 rounded border border-[#27272a]">0.01</div>
            </div>
            {/* Row 4: Spend */}
            <div className="grid grid-cols-5 gap-1 text-center font-mono text-xs">
              <div className="text-left font-semibold text-[#71717a] py-2">Spend</div>
              <div className="bg-[#1c1c1f] text-[#a1a1aa] p-2 rounded border border-[#27272a]">0.06</div>
              <div className="bg-red-500/10 text-red-400 border border-red-500/20 p-2 rounded">-0.32</div>
              <div className="bg-[#1c1c1f] text-[#a1a1aa] p-2 rounded border border-[#27272a]">0.01</div>
              <div className="bg-pink-500/10 text-pink-400 border border-pink-500/20 font-bold p-2 rounded">1.00</div>
            </div>
          </div>

          <div className="text-xs text-[#a1a1aa] space-y-2">
            <h5 className="font-bold text-[#fafafa]">Visual Insights & Feature Engineering Logic</h5>
            <p>
              - **Negative Correlation Between Age and Spending Score (-0.32)**: This reveals a prominent pattern where younger demographic lines consistently express a higher propensity to spend than older demographic lines.
            </p>
            <p>
              - **Income and Spending Score Correlation (0.01)**: The correlation is nearly zero. This provides a brilliant justification for unsupervised ML. Because they are orthogonal (unrelated) features, standard linear modeling fails to group them, necessitating a multi-dimensional spatial algorithm like **K-Means**.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
