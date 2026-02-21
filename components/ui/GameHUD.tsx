import React, { useEffect } from 'react';
import { GameState, LayerData, Question } from '../../types';
import { Clock, Trophy, Target, AlertTriangle, RefreshCcw } from 'lucide-react';

interface Props {
  gameState: GameState;
  currentLayerData: LayerData;
  onAnswer: (index: number) => void;
  onReset: () => void;
}

export const GameHUD: React.FC<Props> = ({ gameState, currentLayerData, onAnswer, onReset }) => {
  const currentQuestion = currentLayerData.questions[gameState.currentQuestionIndex % 10];
  const minutes = Math.floor(gameState.timeLeft / 60);
  const seconds = gameState.timeLeft % 60;
  
  // Format timer color
  const timerColor = gameState.timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-amber-100';

  if (!gameState.isGameActive && gameState.timeLeft <= 0) {
    return (
      <div className="absolute inset-0 z-50 bg-black/90 flex items-center justify-center flex-col text-center p-8 animate-fade-in">
        <AlertTriangle className="w-24 h-24 text-red-600 mb-6" />
        <h1 className="font-cinzel text-6xl text-red-600 font-bold mb-4">DEFEAT</h1>
        <p className="font-playfair text-2xl text-amber-100 mb-8">Time has conquered the warrior.</p>
        <div className="text-amber-300 text-xl mb-8">
            <p>Team: {gameState.teamName}</p>
            <p>Layers Breached: {gameState.currentLayer - 1}</p>
            <p>Score: {gameState.score}</p>
        </div>
        <button onClick={onReset} className="flex items-center gap-2 px-8 py-3 bg-amber-800 text-amber-100 rounded hover:bg-amber-700 transition">
            <RefreshCcw className="w-5 h-5" /> Try Again
        </button>
      </div>
    );
  }

  if (!gameState.isGameActive && gameState.currentLayer > 7) {
    return (
      <div className="absolute inset-0 z-50 bg-gradient-to-t from-amber-900/90 to-black/90 flex items-center justify-center flex-col text-center p-8 animate-fade-in">
        <Trophy className="w-24 h-24 text-yellow-400 mb-6 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
        <h1 className="font-cinzel text-6xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 font-bold mb-4">VICTORY</h1>
        <p className="font-playfair text-2xl text-amber-100 mb-8 italic">"The Yuddh of Intellect is Won."</p>
        
        <div className="bg-black/50 p-8 rounded-lg border border-amber-500/30 backdrop-blur-md min-w-[300px]">
            <h3 className="text-2xl font-cinzel text-amber-400 mb-4 border-b border-amber-700 pb-2">{gameState.teamName}</h3>
            <div className="space-y-2 text-left text-lg text-amber-100">
                <div className="flex justify-between"><span>Final Score:</span> <span className="font-bold text-yellow-400">{gameState.score}</span></div>
                <div className="flex justify-between"><span>Time Remaining:</span> <span>{minutes}:{seconds.toString().padStart(2, '0')}</span></div>
            </div>
        </div>
        
        <button onClick={onReset} className="mt-8 px-8 py-3 border border-amber-500 text-amber-400 hover:bg-amber-900/30 transition uppercase tracking-widest font-bold text-sm">
            Return to Sabha
        </button>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6">
      {/* Top Bar */}
      <div className="flex justify-between items-start pointer-events-auto">
        <div className="bg-black/60 backdrop-blur border-l-4 border-amber-500 p-4 rounded-r-lg text-amber-100 shadow-lg">
          <h3 className="font-cinzel font-bold text-lg text-amber-400">{gameState.teamName || "Warrior"}</h3>
          <div className="flex items-center gap-4 mt-1 text-sm font-mono">
            <span className="flex items-center gap-1"><Trophy className="w-4 h-4 text-yellow-500" /> {gameState.score}</span>
            <span className="flex items-center gap-1"><Target className="w-4 h-4 text-red-400" /> Layer {gameState.currentLayer} / 7</span>
          </div>
        </div>

        <div className={`bg-black/60 backdrop-blur border border-amber-900/50 p-3 px-6 rounded-lg text-2xl font-mono font-bold shadow-lg flex items-center gap-3 ${timerColor}`}>
          <Clock className="w-6 h-6" />
          {minutes}:{seconds.toString().padStart(2, '0')}
        </div>
      </div>

      {/* Center - Question Card */}
      <div className="flex-1 flex items-center justify-center pointer-events-none">
         {/* Only show question if game is active */}
         {gameState.isGameActive && (
            <div className="pointer-events-auto w-full max-w-2xl bg-gradient-to-b from-gray-900 to-black border-2 border-amber-700/60 rounded-xl overflow-hidden shadow-2xl transform transition-all hover:scale-[1.01]">
                {/* Header */}
                <div className="bg-amber-900/30 p-4 border-b border-amber-700/50 flex justify-between items-center">
                    <span className="font-cinzel text-amber-500 font-bold tracking-widest uppercase text-sm">
                        Question {(gameState.currentQuestionIndex % 10) + 1} / 10
                    </span>
                    <span className="text-xs text-amber-700 uppercase tracking-widest">Analytics Chakravyuh</span>
                </div>
                
                {/* Content */}
                <div className="p-6 md:p-8">
                    <h3 className="font-playfair text-xl md:text-2xl text-amber-50 leading-relaxed mb-6 font-semibold">
                        {currentQuestion.text}
                    </h3>
                    
                    <div className="grid grid-cols-1 gap-3">
                        {currentQuestion.options.map((opt, idx) => (
                            <button
                                key={idx}
                                onClick={() => onAnswer(idx)}
                                className="group relative text-left p-4 rounded bg-gray-800/50 hover:bg-amber-900/40 border border-gray-700 hover:border-amber-500 transition-all duration-200"
                            >
                                <span className="absolute left-0 top-0 bottom-0 w-1 bg-amber-600 transform scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom" />
                                <div className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full border border-amber-700/50 text-amber-500 text-xs flex items-center justify-center font-mono group-hover:bg-amber-500 group-hover:text-black transition-colors">
                                        {String.fromCharCode(65 + idx)}
                                    </span>
                                    <span className="text-gray-300 group-hover:text-amber-100 font-sans text-lg">{opt}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
                
                {/* Footer Progress Bar */}
                <div className="h-1 bg-gray-800 w-full">
                    <div 
                        className="h-full bg-amber-500 transition-all duration-300 ease-out shadow-[0_0_10px_#f59e0b]" 
                        style={{ width: `${((gameState.currentQuestionIndex % 10) / 10) * 100}%` }} 
                    />
                </div>
            </div>
         )}
      </div>

      {/* Bottom Status */}
      <div className="text-center pb-4 opacity-50 text-xs text-amber-200/40 font-mono tracking-widest uppercase">
        Use intellect to pierce the formation
      </div>
    </div>
  );
};
