import { Customer, SegmentInfo } from "../types";

export const segments: SegmentInfo[] = [
  {
    cluster: 0,
    name: "Premium Customers (High Income, High Spending)",
    color: "#10b981", // Emerald
    borderColor: "border-emerald-500",
    textColor: "text-emerald-700",
    bgColor: "bg-emerald-50",
    incomeRange: "70k$ - 137k$",
    spendingRange: "70 - 100",
    description: "These are the highly lucrative customers. They have high purchasing power and actively shop. They value quality, exclusive privileges, and personalized luxury.",
    characteristics: [
      "Loyal brand advocates who respond well to VIP perks.",
      "High average order value (AOV) and transaction frequency.",
      "Early adopters of new product lines or premium offerings.",
    ],
    strategies: [
      "Launch an exclusive VIP loyalty tier with personalized benefits.",
      "Offer early access to new collections and high-end collections.",
      "Provide premium concierge or 24/7 priority customer support.",
    ],
  },
  {
    cluster: 1,
    name: "High Income - Low Spending (Targetable Premium)",
    color: "#3b82f6", // Blue
    borderColor: "border-blue-500",
    textColor: "text-blue-700",
    bgColor: "bg-blue-50",
    incomeRange: "70k$ - 137k$",
    spendingRange: "1 - 40",
    description: "Often termed 'Mizers'. They have deep pockets but are highly conservative spenders. They require deliberate engagement, value-justified items, and premier rewards.",
    characteristics: [
      "Skeptical of typical marketing hype; demand proof of value.",
      "Rarely impulse-buy, prioritizing utility and quality over trend.",
      "Engage primarily during major seasonal sales or curated events.",
    ],
    strategies: [
      "Send highly personalized, quality-focused newsletters emphasizing product utility.",
      "Provide custom-tailored bundles that offer massive price-to-value rewards.",
      "Promote premium membership cash-back models to incentivize trial.",
    ],
  },
  {
    cluster: 2,
    name: "Budget Customers (Low Income, High Spending)",
    color: "#f59e0b", // Amber
    borderColor: "border-amber-500",
    textColor: "text-amber-700",
    bgColor: "bg-amber-50",
    incomeRange: "15k$ - 40k$",
    spendingRange: "60 - 99",
    description: "Enthusiastic but price-sensitive shoppers. They love spending on trendy goods but have limited financial bandwidth. Highly responsive to sales, flash campaigns, and discounts.",
    characteristics: [
      "Incredibly active on mobile apps and social channels.",
      "Extremely price-sensitive but highly prone to emotional impulse buys.",
      "Prone to high brand-switching based entirely on coupons.",
    ],
    strategies: [
      "Implement aggressive flash-sale campaigns with limited-time coupons.",
      "Deploy flexible financing terms, such as Buy Now Pay Later (BNPL) options.",
      "Incentivize refer-a-friend discount systems to expand customer base.",
    ],
  },
  {
    cluster: 3,
    name: "Regular Customers (Average Income, Average Spending)",
    color: "#8b5cf6", // Violet
    borderColor: "border-violet-500",
    textColor: "text-violet-700",
    bgColor: "bg-violet-50",
    incomeRange: "40k$ - 70k$",
    spendingRange: "40 - 60",
    description: "The core backbone of stable, recurring business. They represent average shoppers with steady income. They value familiarity, simple transactions, and reliable benefits.",
    characteristics: [
      "Balanced demographic profiles with consistent, predictable schedules.",
      "Usually purchase essential products with occasional mid-tier splurges.",
      "Highly loyal to comfortable, frictionless user experiences.",
    ],
    strategies: [
      "Offer bulk-buy incentives or monthly subscription box options.",
      "Implement standard cumulative point-based cashback cards.",
      "Engage via steady, non-intrusive product recommendation newsletters.",
    ],
  },
  {
    cluster: 4,
    name: "Potential Customers (Low Income, Low Spending)",
    color: "#ef4444", // Red
    borderColor: "border-red-500",
    textColor: "text-red-700",
    bgColor: "bg-red-50",
    incomeRange: "15k$ - 40k$",
    spendingRange: "1 - 40",
    description: "The least engaged demographic. They have low disposable income and shop rarely. They represent either dormant accounts or highly cautious buyers who need heavy nurturing.",
    characteristics: [
      "Extremely low engagement across newsletters, apps, and web portals.",
      "High cart abandonment rates due to strict price boundaries.",
      "Unfamiliar with full brand scope and catalog offerings.",
    ],
    strategies: [
      "Incentivize activation with heavily subsidized 'Welcome' promo codes.",
      "Distribute short satisfaction surveys to find friction points.",
      "Deploy basic educational campaigns to explain brand accessibility.",
    ],
  },
];

export function generateCustomers(count: number = 500): Customer[] {
  const customers: Customer[] = [];
  const genders: Array<"Male" | "Female"> = ["Male", "Female"];

  // Seeding randomness using basic LCG or Math.random
  for (let i = 1; i <= count; i++) {
    // Determine cluster category based on randomized weighting
    // to build clear boundaries
    const rand = Math.random();
    let cluster = 3; // Default Regular
    let age = 30;
    let income = 50;
    let spendingScore = 50;

    if (rand < 0.22) {
      // Premium (Cluster 0)
      cluster = 0;
      age = Math.floor(Math.random() * 20) + 25; // 25-45
      income = Math.floor(Math.random() * 55) + 75; // 75-130
      spendingScore = Math.floor(Math.random() * 25) + 70; // 70-95
    } else if (rand < 0.42) {
      // High Income - Low Spending (Cluster 1)
      cluster = 1;
      age = Math.floor(Math.random() * 30) + 30; // 30-60
      income = Math.floor(Math.random() * 55) + 75; // 75-130
      spendingScore = Math.floor(Math.random() * 30) + 10; // 10-40
    } else if (rand < 0.62) {
      // Budget Customers (Cluster 2)
      cluster = 2;
      age = Math.floor(Math.random() * 15) + 18; // 18-33
      income = Math.floor(Math.random() * 22) + 15; // 15-37
      spendingScore = Math.floor(Math.random() * 30) + 65; // 65-95
    } else if (rand < 0.82) {
      // Potential Customers (Cluster 4)
      cluster = 4;
      age = Math.floor(Math.random() * 25) + 35; // 35-60
      income = Math.floor(Math.random() * 22) + 15; // 15-37
      spendingScore = Math.floor(Math.random() * 30) + 5; // 5-35
    } else {
      // Regular (Cluster 3)
      cluster = 3;
      age = Math.floor(Math.random() * 30) + 20; // 20-50
      income = Math.floor(Math.random() * 25) + 40; // 40-65
      spendingScore = Math.floor(Math.random() * 20) + 40; // 40-60
    }

    const gender = genders[Math.floor(Math.random() * genders.length)];

    customers.push({
      id: 1000 + i,
      gender,
      age,
      income,
      spendingScore,
      cluster,
    });
  }

  return customers;
}

// Simple euclidean distance based prediction module
export function predictCluster(age: number, gender: "Male" | "Female", income: number, spendingScore: number): number {
  // Let's model centroid locations (normalized approximately or directly calculated from our generators)
  const centroids = [
    { income: 105, spending: 82.5 },  // Premium Cluster 0
    { income: 105, spending: 25 },    // High Income - Low Spending Cluster 1
    { income: 26, spending: 80 },     // Budget Cluster 2
    { income: 52.5, spending: 50 },   // Regular Cluster 3
    { income: 26, spending: 20 },     // Potential Cluster 4
  ];

  let minDistance = Infinity;
  let assignedCluster = 3;

  centroids.forEach((c, idx) => {
    // Normalization factors to balance scales:
    // Income: ranges from 15 to 137 (range ~ 122)
    // Spending: ranges from 1 to 100 (range ~ 99)
    const dIncome = (income - c.income) / 122;
    const dSpending = (spendingScore - c.spending) / 99;
    const distance = Math.sqrt(dIncome * dIncome + dSpending * dSpending);

    if (distance < minDistance) {
      minDistance = distance;
      assignedCluster = idx;
    }
  });

  return assignedCluster;
}

// Convert dataset to CSV
export function convertToCSV(data: Customer[]): string {
  const headers = "Customer ID,Gender,Age,Annual Income (k$),Spending Score (1-100),Cluster Label\n";
  const rows = data
    .map(
      (c) =>
        `${c.id},${c.gender},${c.age},${c.income},${c.spendingScore},${c.cluster}`
    )
    .join("\n");
  return headers + rows;
}
