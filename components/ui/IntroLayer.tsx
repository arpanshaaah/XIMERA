import React, { useState } from 'react';
import { GameStage } from '../../types';
import { Sword, Scroll } from 'lucide-react';

interface Props {
  onStart: () => void;
  onTeamSubmit: (name: string) => void;
  stage: GameStage;
}

export const IntroLayer: React.FC<Props> = ({ onStart, onTeamSubmit, stage }) => {
  const [teamName, setTeamName] = useState("");

  if (stage === GameStage.INTRO) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        <div className="text-center pointer-events-auto bg-black/40 backdrop-blur-sm p-12 rounded-lg border border-amber-900/50 shadow-2xl animate-fade-in">
          <h1 className="font-cinzel text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 font-bold mb-4 tracking-wider text-gold-glow drop-shadow-lg">
            XIMERA
          </h1>
          <h2 className="font-playfair text-2xl text-amber-200 mb-8 tracking-[0.2em] uppercase">
            The Analytics Chakravyuh
          </h2>
          <button 
            onClick={onStart}
            className="group relative px-8 py-4 bg-gradient-to-r from-red-900 to-amber-900 border border-amber-500 text-amber-100 font-bold tracking-widest hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(251,191,36,0.3)]"
          >
            <span className="flex items-center gap-2">
              <Sword className="w-5 h-5 text-amber-400 rotate-90" />
              START THE YUDDH
              <Sword className="w-5 h-5 text-amber-400 -rotate-90" />
            </span>
          </button>
        </div>
      </div>
    );
  }

  if (stage === GameStage.TEAM_ENTRY) {
    return (
      <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/60 backdrop-blur-sm transition-all duration-700">
        <div className="w-full max-w-md p-8 bg-gradient-to-b from-[#2a0f05] to-[#150503] border-2 border-amber-600/50 rounded-xl shadow-2xl relative overflow-hidden">
            {/* Ornamentation */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-amber-500/50 rounded-tl-xl" />
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-amber-500/50 rounded-tr-xl" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-amber-500/50 rounded-bl-xl" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-amber-500/50 rounded-br-xl" />

            <div className="text-center mb-8">
                <Scroll className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                <h3 className="font-cinzel text-3xl text-amber-100">Identity of the Warrior</h3>
                <p className="text-amber-400/80 mt-2 font-playfair italic">"Enter your team name, O Brave One"</p>
            </div>

            <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Team Name"
                className="w-full bg-[#1a0505] border border-amber-700 text-amber-100 text-xl text-center py-4 rounded-lg focus:outline-none focus:border-amber-400 focus:shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all font-serif mb-8 placeholder-amber-900"
                maxLength={20}
            />

            <button 
                onClick={() => teamName.length > 0 && onTeamSubmit(teamName)}
                disabled={teamName.length === 0}
                className="w-full py-4 bg-amber-700 hover:bg-amber-600 disabled:bg-gray-800 disabled:text-gray-500 text-amber-50 font-bold font-cinzel text-lg tracking-widest rounded transition-all flex items-center justify-center gap-3 border border-amber-500"
            >
                PROCEED TO DHARMA SABHA
            </button>
        </div>
      </div>
    );
  }

  return null;
};
