export interface BusinessModel {
  name: string;
  description: string;
  fitScore: number;
  reasoning: string;
}

export interface TechTool {
  tool: string;
  purpose: string;
  isFree: boolean;
}

export interface ExecutionPhase {
  phase: string;
  actions: string[];
  outcome: string;
}

export interface RecommendedStrategy {
  modelName: string;
  uniqueValueProposition: string;
  techStack: TechTool[];
  marketingLoop: string;
  executionPlan: ExecutionPhase[];
  monetizationMechanics: string;
}

export interface StrategyResponse {
  analysis: string;
  businessModels: BusinessModel[];
  recommendedStrategy: RecommendedStrategy;
}

export interface UserInputs {
  monthlyGoal: number;
  hoursPerWeek: number;
  skills: string;
  nicheInterest: string;
}

export interface MarketTrend {
  trendName: string;
  description: string;
  searchUrl: string;
}

export interface MarketAnalysis {
  trends: MarketTrend[];
  competitors: string[];
}

export interface NewsItem {
  title: string;
  snippet: string;
  url: string;
  source: string;
  date: string;
}