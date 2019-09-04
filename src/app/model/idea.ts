export interface Idea {
  id?: string;
  content: string;
  impact: number;
  ease: number;
  confidence: number;
  average_score?: number;
  created_at?: number;
  editing?: boolean;
}
