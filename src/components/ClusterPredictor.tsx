import React, { useState } from "react";
import { predictCluster, segments } from "../utils/dataGenerator";
import { HelpCircle, UserPlus, ShieldAlert, Sparkles, Target, Users } from "lucide-react";

export default function ClusterPredictor() {
  const [age, setAge] = useState<number>(30);
  const [gender, setGender] = useState<"Male" | "Female">("Female");
  const [income, setIncome] = useState<number>(60);
  const [spending, setSpending] = useState<number>(50);
  const [predictedId, setPredictedId] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnimating(true);
    setTimeout(() => {
      const clusterId = predictCluster(age, gender, income, spending);
      setPredictedId(clusterId);
      setIsAnimating(false);
    }, 450); // slight delay to feel computational
  };

  const selectedSegment = predictedId !== null ? segments[predictedId] : null;

  return (
    <div id="cluster-predictor" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Input Form Column */}
      <form
        onSubmit={handlePredict}
        className="lg:col-span-5 bg-[#111113] p-6 rounded-3xl border border-[#27272a] space-y-6"
      >
        <div>
          <h3 className="text-lg font-bold text-[#fafafa]">Live Customer Profiler</h3>
          <p className="text-xs text-[#a1a1aa]">Input demographic and spending behavior to predict the customer segment</p>
        </div>

        <div className="space-y-4">
          {/* Age Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#a1a1aa] block">
              Customer Age (18 - 70)
            </label>
            <div className="flex items-center gap-3">
              <input
                id="input-age"
                type="range"
                min="18"
                max="70"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value))}
                className="w-full accent-indigo-500"
              />
              <span className="font-mono text-sm font-bold bg-[#1c1c1f] border border-[#27272a] text-[#fafafa] px-3 py-1 rounded-lg w-12 text-center">
                {age}
              </span>
            </div>
          </div>

          {/* Gender Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#a1a1aa] block">
              Gender Demographic
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                id="btn-gender-female"
                onClick={() => setGender("Female")}
                className={`py-2 px-4 rounded-xl text-xs font-semibold border transition-all ${
                  gender === "Female"
                    ? "bg-pink-500/10 border-pink-500 text-pink-400 shadow-sm"
                    : "bg-[#1c1c1f] border-[#27272a] text-[#a1a1aa] hover:bg-[#27272a]/70"
                }`}
              >
                Female
              </button>
              <button
                type="button"
                id="btn-gender-male"
                onClick={() => setGender("Male")}
                className={`py-2 px-4 rounded-xl text-xs font-semibold border transition-all ${
                  gender === "Male"
                    ? "bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-sm"
                    : "bg-[#1c1c1f] border-[#27272a] text-[#a1a1aa] hover:bg-[#27272a]/70"
                }`}
              >
                Male
              </button>
            </div>
          </div>

          {/* Annual Income */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#a1a1aa] block">
              Annual Income (k$)
            </label>
            <div className="flex items-center gap-3">
              <input
                id="input-income"
                type="range"
                min="15"
                max="137"
                value={income}
                onChange={(e) => setIncome(parseInt(e.target.value))}
                className="w-full accent-indigo-500"
              />
              <span className="font-mono text-sm font-bold bg-[#1c1c1f] border border-[#27272a] text-[#fafafa] px-3 py-1 rounded-lg w-16 text-center">
                {income}k
              </span>
            </div>
          </div>

          {/* Spending Score */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#a1a1aa] block">
              Spending Score (1 - 100)
            </label>
            <div className="flex items-center gap-3">
              <input
                id="input-spending"
                type="range"
                min="1"
                max="100"
                value={spending}
                onChange={(e) => setSpending(parseInt(e.target.value))}
                className="w-full accent-indigo-500"
              />
              <span className="font-mono text-sm font-bold bg-[#1c1c1f] border border-[#27272a] text-[#fafafa] px-3 py-1 rounded-lg w-12 text-center">
                {spending}
              </span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          id="btn-predict-submit"
          className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-indigo-500/10"
        >
          {isAnimating ? (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Analyze & Classify Customer
            </>
          )}
        </button>
      </form>

      {/* Result Display Column */}
      <div className="lg:col-span-7 flex flex-col justify-center">
        {selectedSegment ? (
          <div
            id="prediction-result"
            className={`border rounded-3xl p-6 lg:p-8 space-y-6 transition-all ${
              isAnimating ? "opacity-30 scale-95" : "opacity-100 scale-100"
            }`}
            style={{
              backgroundColor: `${selectedSegment.color}10`,
              borderColor: `${selectedSegment.color}50`,
            }}
          >
            {/* Header Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#27272a]/80 pb-4">
              <div>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block mb-1">
                  Model Prediction Output
                </span>
                <h4 className="text-xl font-extrabold text-[#fafafa]">
                  {selectedSegment.name}
                </h4>
              </div>
              <span className="inline-flex items-center px-4 py-1 rounded-full text-xs font-extrabold text-[#fafafa] self-start sm:self-center" style={{ backgroundColor: selectedSegment.color }}>
                Cluster {selectedSegment.cluster}
              </span>
            </div>

            {/* Range Validation */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-black/40 p-3 rounded-2xl border border-white/5">
                <span className="text-[#a1a1aa] block">Class Centroid Income</span>
                <span className="font-bold text-[#fafafa] text-sm">{selectedSegment.incomeRange}</span>
              </div>
              <div className="bg-black/40 p-3 rounded-2xl border border-white/5">
                <span className="text-[#a1a1aa] block">Class Centroid Spending</span>
                <span className="font-bold text-[#fafafa] text-sm">{selectedSegment.spendingRange} / 100</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-[#a1a1aa] uppercase tracking-wider flex items-center gap-1.5">
                <Users className="h-4 w-4 text-indigo-400" /> Segment Persona Profile
              </span>
              <p className="text-sm text-[#a1a1aa] leading-relaxed bg-black/40 p-4 rounded-2xl border border-white/5">
                {selectedSegment.description}
              </p>
            </div>

            {/* Marketing Tactics & Strategies */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#a1a1aa] uppercase tracking-wider flex items-center gap-1.5">
                  <HelpCircle className="h-4 w-4 text-[#71717a]" /> Characteristics
                </span>
                <ul className="space-y-1 text-xs text-[#a1a1aa]">
                  {selectedSegment.characteristics.map((c, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-indigo-400 font-extrabold mt-0.5">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-[#a1a1aa] uppercase tracking-wider flex items-center gap-1.5">
                  <Target className="h-4 w-4 text-[#71717a]" /> Actionable Strategy
                </span>
                <ul className="space-y-1 text-xs text-[#a1a1aa]">
                  {selectedSegment.strategies.map((s, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-indigo-400 font-extrabold mt-0.5">✓</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-[#111113] border border-dashed border-[#27272a] p-12 rounded-3xl text-center space-y-3">
            <div className="inline-flex p-4 bg-[#1c1c1f] border border-[#27272a] rounded-2xl shadow-sm text-[#71717a]">
              <Sparkles className="h-8 w-8" />
            </div>
            <div>
              <h4 className="font-bold text-[#fafafa]">Assign New Customer Profile</h4>
              <p className="text-sm text-[#a1a1aa] max-w-sm mx-auto">
                Use the inputs on the left to set custom age, income, and spending parameters. Press classify to trigger the Euclidean distance calculator.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
