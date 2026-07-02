export type AiInsightKind = 'ADVICE' | 'FOCUS_PREDICTION' | 'RISK_ALERT';

/** A single AI Coach insight card. */
export interface AiInsight {
  kind: AiInsightKind;
  title: string;
  body: string;
}

/** The short recommendation shown in the dashboard hero. */
export interface AiRecommendation {
  text: string;
}
