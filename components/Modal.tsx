import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  variant?: 'center' | 'bottom';
  title?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, variant = 'center', title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Content Container */}
      <div
        className={`
          relative z-10 w-full max-w-md bg-background shadow-2xl transition-all duration-300
          ${
            variant === 'bottom'
              ? 'absolute bottom-0 h-[92vh] rounded-t-[2rem]' 
              : 'mx-6 rounded-3xl p-6 md:p-8 animate-in zoom-in-95 fade-in duration-200'
          }
        `}
      >
        {variant === 'bottom' && (
          <div className="flex w-full flex-col items-center pt-3 pb-1" onClick={onClose}>
            <div className="h-1.5 w-12 rounded-full bg-gray-300" />
          </div>
        )}

        {variant === 'center' && (
           <button 
             onClick={onClose}
             className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
           >
             <X size={20} />
           </button>
        )}

        {/* Header for Bottom Sheet */}
        {variant === 'bottom' && (
          <div className="flex items-center justify-between px-6 pb-4 pt-2 border-b border-gray-100">
            <button 
              onClick={onClose}
              className="text-lg font-medium text-oldGold hover:opacity-80 transition-opacity"
            >
              Cancel
            </button>
            <h2 className="text-xl font-bold font-serif text-textMain">{title}</h2>
            <div className="w-[58px]" /> {/* Spacer */}
          </div>
        )}

        {/* Content */}
        <div className={`h-full ${variant === 'bottom' ? 'overflow-y-auto pb-safe' : ''}`}>
           {children}
        </div>
      </div>
    </div>
  );
};