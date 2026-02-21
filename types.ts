export enum GameStage {
  INTRO = 'INTRO',
  TEAM_ENTRY = 'TEAM_ENTRY',
  RULES = 'RULES',
  PLAYING = 'PLAYING',
  VICTORY = 'VICTORY',
  GAME_OVER = 'GAME_OVER'
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface LayerData {
  layerId: number;
  name: string;
  questions: Question[];
}

export interface GameState {
  stage: GameStage;
  teamName: string;
  currentLayer: number; // 1 to 7
  currentQuestionIndex: number; // 0 to 9
  score: number;
  timeLeft: number; // in seconds
  isGameActive: boolean;
  answersHistory: boolean[]; // track correct/incorrect for current layer visual feedback
}

export const TOTAL_LAYERS = 7;
export const QUESTIONS_PER_LAYER = 10;
export const TOTAL_TIME_SEC = 30 * 60; // 30 minutes
