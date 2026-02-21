import React from 'react';
import { GameStage } from '../../types';
import { Shield } from 'lucide-react';

interface Props {
  onConfirm: () => void;
}

export const RulesLayer: React.FC<Props> = ({ onConfirm }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-[#eaddcf] text-[#2c1810] p-10 rounded-sm shadow-2xl transform transition-all duration-500 scale-100">
        {/* Parchment effect */}
        <div className="absolute inset-0 border-[12px] border-[#5d2e1e] rounded-sm pointer-events-none opacity-80" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-50 mix-blend-multiply pointer-events-none" />
        
        <div className="relative z-10">
          <div className="text-center border-b-2 border-[#5d2e1e]/30 pb-4 mb-6">
            <h2 className="font-cinzel text-4xl font-bold text-[#7c2d12] flex items-center justify-center gap-3">
              <Shield className="w-8 h-8" />
              Rules of Engagement
              <Shield className="w-8 h-8" />
            </h2>
          </div>

          <div className="space-y-4 font-playfair text-xl leading-relaxed max-h-[50vh] overflow-y-auto pr-4 mb-8">
            <ul className="list-disc pl-6 space-y-3 marker:text-[#b45309]">
              <li>You face the <strong>Chakravyuh</strong>, a 7-layer defensive formation.</li>
              <li>There are <strong>10 questions</strong> per layer (70 total).</li>
              <li>You have a total of <strong>30 minutes</strong> to breach all layers.</li>
              <li>Each correct answer grants <strong>10 points</strong>.</li>
              <li>Incorrect answers do not deduct points, but impede your progress.</li>
              <li>Upon answering 10 questions in a layer, you advance inward.</li>
              <li>Reach the center to claim victory.</li>
            </ul>
          </div>

          <div className="text-center">
            <button 
              onClick={onConfirm}
              className="px-12 py-4 bg-[#7c2d12] text-[#fef3c7] font-cinzel font-bold text-xl hover:bg-[#92400e] transition-colors shadow-lg border-2 border-[#b45309]"
            >
              ENTER THE CHAKRAVYUH
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
