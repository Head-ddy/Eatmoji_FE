export interface RecommendResponse {
  emotion: string;
  intensity: number;
  recommendations: {
    food: string;
    reason: string;
  }[];
}