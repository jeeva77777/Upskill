export interface Customer {
  id: number;
  gender: "Male" | "Female";
  age: number;
  income: number; // in k$
  spendingScore: number; // 1-100
  cluster: number;
}

export interface SegmentInfo {
  cluster: number;
  name: string;
  color: string;
  borderColor: string;
  textColor: string;
  bgColor: string;
  incomeRange: string;
  spendingRange: string;
  description: string;
  characteristics: string[];
  strategies: string[];
}

export interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  content: string[];
  visualType?: "intro" | "table" | "chart" | "insights" | "architecture" | "conclusion";
}

export interface ReportSection {
  id: string;
  title: string;
  content: string;
  subsections?: { title: string; content: string }[];
}
