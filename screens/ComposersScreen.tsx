import React, { useState } from 'react';
import { ChevronRight, Plus, Camera, Library } from 'lucide-react';
import { Composer } from '../types';
import { Modal } from '../components/Modal';

interface ComposersScreenProps {
  composers: Composer[];
  onComposerSelect: (id: string) => void;
  onAddComposer: (composer: Composer) => void;
}

export const ComposersScreen: React.FC<ComposersScreenProps> = ({ composers, onComposerSelect, onAddComposer }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [period, setPeriod] = useState('');

  const handleSave = () => {
    if (!name || !period) return;

    // NOTE: 不传递 id，让数据库自动生成 UUID
    const newComposer = {
      name,
      period,
      image: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=256`,
    };

    onAddComposer(newComposer as Composer);
    setIsModalOpen(false);
    setName('');
    setPeriod('');
  };

  return (
    <div className="min-h-screen w-full bg-background pb-24 relative">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-md px-6 pt-14 pb-4 border-b border-transparent transition-all duration-300">
        <h1 className="text-4xl font-bold tracking-tight text-textMain font-serif">
          Composers
        </h1>
      </header>

      <main className="px-4 py-2">
        {composers.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-32 animate-in fade-in zoom-in-95 duration-500">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#EBEAE6] text-oldGold shadow-soft">
              <Library size={48} strokeWidth={1} />
            </div>
            <h3 className="text-2xl font-serif font-bold text-textMain mb-3">No Composers Yet</h3>
            <p className="text-textSub font-sans text-base leading-relaxed text-center max-w-[250px]">
              Tap the <span className="font-bold text-oldGold">+</span> button to add your first composer to the library.
            </p>
          </div>
        ) : (
          composers.map((composer) => (
            <div
              key={composer.id}
              onClick={() => onComposerSelect(composer.id)}
              className="group flex items-center gap-5 p-4 cursor-pointer hover:bg-black/[0.03] transition-colors duration-200 rounded-xl"
            >
              {/* Image */}
              <div className="shrink-0 relative">
                <div className="bg-[#F0F0EB] aspect-square rounded-full size-16 overflow-hidden shadow-inner ring-1 ring-black/5">
                  <img
                    src={composer.image}
                    alt={composer.name}
                    className="h-full w-full object-cover grayscale sepia-[.3] contrast-[1.1] opacity-90 mix-blend-multiply"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="flex flex-col justify-center flex-1 border-b border-divider pb-4 group-hover:border-transparent transition-colors">
                <p className="text-textMain text-[19px] font-bold leading-snug tracking-tight font-serif">
                  {composer.name}
                </p>
                <p className="text-textSub text-[13px] font-medium mt-1 font-sans tracking-wide">
                  {composer.sheetMusicCount} Sheet Music · {composer.recordingCount} Recordings
                </p>
              </div>

              {/* Arrow */}
              <div className="shrink-0 pb-4 flex items-center justify-center">
                <ChevronRight className="text-gray-300" size={20} />
              </div>
            </div>
          ))
        )}
      </main>

      {/* FAB - Add Composer */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-24 right-6 size-14 bg-oldGold text-white rounded-full shadow-xl flex items-center justify-center hover:bg-opacity-90 active:scale-95 transition-all z-30 ring-2 ring-white/20 animate-in zoom-in duration-300 delay-300"
      >
        <Plus size={28} />
      </button>

      {/* Add Composer Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        variant="bottom"
        title="Add Composer"
      >
        <div className="px-6 pt-6 pb-32">
          {/* Avatar Placeholder */}
          <div className="flex justify-center mb-8">
            <div className="h-32 w-32 bg-[#F2F2F7] rounded-full flex items-center justify-center shadow-inner ring-4 ring-white relative overflow-hidden cursor-pointer hover:bg-gray-200 transition-colors">
              <Camera size={40} className="text-gray-400 opacity-50" strokeWidth={1.5} />
            </div>
          </div>

          <div className="space-y-8 font-sans">
            <div className="group relative">
              <label className="ml-1 mb-1 block text-sm font-medium text-textSub">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border-0 border-b border-gray-300 bg-transparent px-1 py-2 text-xl font-medium text-textMain placeholder-gray-300 focus:border-oldGold focus:ring-0 transition-colors"
                placeholder="e.g. Franz Liszt"
                autoFocus
              />
            </div>

            <div className="group relative">
              <label className="ml-1 mb-1 block text-sm font-medium text-textSub">Period</label>
              <input
                type="text"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="w-full border-0 border-b border-gray-300 bg-transparent px-1 py-2 text-xl font-medium text-textMain placeholder-gray-300 focus:border-oldGold focus:ring-0 transition-colors"
                placeholder="e.g. Romantic Period"
              />
            </div>
          </div>

          <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-background via-background/95 to-transparent px-6 pb-8 pt-12 z-20">
            <button
              onClick={handleSave}
              disabled={!name || !period}
              className={`
                 flex w-full items-center justify-center gap-2 rounded-full py-4 text-lg font-bold text-white shadow-lg transition-all
                 ${name && period
                  ? 'bg-oldGold shadow-oldGold/30 hover:bg-[#d4ac26] active:scale-[0.98]'
                  : 'bg-gray-300 cursor-not-allowed'}
               `}
            >
              Add Composer
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};