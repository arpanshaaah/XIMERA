import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChakravyuhScene } from './components/3d/ChakravyuhScene';
import { IntroLayer } from './components/ui/IntroLayer';
import { RulesLayer } from './components/ui/RulesLayer';
import { GameHUD } from './components/ui/GameHUD';
import { GameState, GameStage, TOTAL_TIME_SEC, QUESTIONS_PER_LAYER, TOTAL_LAYERS } from './types';
import { MOCK_LAYERS } from './constants';

const INITIAL_STATE: GameState = {
  stage: GameStage.INTRO,
  teamName: "",
  currentLayer: 1,
  currentQuestionIndex: 0,
  score: 0,
  timeLeft: TOTAL_TIME_SEC,
  isGameActive: false,
  answersHistory: []
};

function App() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Timer Logic
  useEffect(() => {
    let interval: number;
    if (gameState.isGameActive && gameState.timeLeft > 0) {
      interval = window.setInterval(() => {
        setGameState(prev => {
          if (prev.timeLeft <= 1) {
             return { ...prev, timeLeft: 0, isGameActive: false, stage: GameStage.GAME_OVER };
          }
          return { ...prev, timeLeft: prev.timeLeft - 1 };
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState.isGameActive, gameState.timeLeft]);

  // Audio Placeholder
  useEffect(() => {
    // In a real app, we would load an audio file here.
    // audioRef.current = new Audio('/assets/bgm_epic.mp3');
  }, []);

  const handleStart = () => {
    setGameState(prev => ({ ...prev, stage: GameStage.TEAM_ENTRY }));
  };

  const handleTeamSubmit = (name: string) => {
    setGameState(prev => ({ ...prev, teamName: name, stage: GameStage.RULES }));
  };

  const handleRulesConfirm = () => {
    setGameState(prev => ({ ...prev, stage: GameStage.PLAYING, isGameActive: true }));
  };

  const handleReset = () => {
    setGameState(INITIAL_STATE);
  };

  const handleAnswer = useCallback((optionIndex: number) => {
    setGameState(prev => {
      // 1. Check Correctness
      const layerIdx = prev.currentLayer - 1;
      const qIdx = prev.currentQuestionIndex % 10;
      const currentQuestion = MOCK_LAYERS[layerIdx].questions[qIdx];
      const isCorrect = optionIndex === currentQuestion.correctIndex;

      // 2. Update Score
      const newScore = isCorrect ? prev.score + 10 : prev.score;

      // 3. Logic for next question or next layer
      let nextLayer = prev.currentLayer;
      let nextQIndex = prev.currentQuestionIndex + 1;
      let nextStage = prev.stage;
      let gameActive = prev.isGameActive;

      // If finished 10 questions for this layer
      if (nextQIndex % QUESTIONS_PER_LAYER === 0) {
        nextLayer = prev.currentLayer + 1;
        // Check Victory
        if (nextLayer > TOTAL_LAYERS) {
           nextStage = GameStage.VICTORY;
           gameActive = false;
        }
      }

      return {
        ...prev,
        score: newScore,
        currentLayer: nextLayer,
        currentQuestionIndex: nextQIndex,
        stage: nextStage,
        isGameActive: gameActive
      };
    });
  }, []);

  const currentLayerData = MOCK_LAYERS[Math.min(gameState.currentLayer - 1, TOTAL_LAYERS - 1)];

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden select-none">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <ChakravyuhScene gameStage={gameState.stage} currentLayer={gameState.currentLayer} />
      </div>

      {/* UI Layers */}
      <div className="relative z-10 w-full h-full">
        {(gameState.stage === GameStage.INTRO || gameState.stage === GameStage.TEAM_ENTRY) && (
          <IntroLayer 
            stage={gameState.stage} 
            onStart={handleStart} 
            onTeamSubmit={handleTeamSubmit} 
          />
        )}

        {gameState.stage === GameStage.RULES && (
          <RulesLayer onConfirm={handleRulesConfirm} />
        )}

        {(gameState.stage === GameStage.PLAYING || gameState.stage === GameStage.VICTORY || gameState.stage === GameStage.GAME_OVER) && (
           <GameHUD 
             gameState={gameState} 
             currentLayerData={currentLayerData}
             onAnswer={handleAnswer}
             onReset={handleReset}
           />
        )}
      </div>
    </div>
  );
}

export default App;