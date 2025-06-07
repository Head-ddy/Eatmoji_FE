export type Recommendation = {
  food: string;
  reason: string;
};

export interface HistoryItem {
  id: string;
  email: string;
  emotion: string;
  recommendation: Recommendation;
  createdAt: string;
  liked: boolean;
}