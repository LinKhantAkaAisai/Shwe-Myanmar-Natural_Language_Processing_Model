export interface PosTag {
  word: string;
  tag: string;
}

export interface AnalysisStatistics {
  characters: number;
  syllables: number;
  words: number;
  uniquePosTags: number;
}

export interface AnalysisResult {
  originalText: string;

  syllables: string[];

  words: string[];

  posTags: PosTag[];

  statistics: AnalysisStatistics;
}
