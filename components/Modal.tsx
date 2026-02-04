import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { backdropFade, scaleIn, slideUp } from '../utils/animations';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  variant?: 'center' | 'bottom';
  title?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, variant = 'center', title }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <motion.div
            variants={backdropFade}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Content Container */}
          <motion.div
            variants={variant === 'bottom' ? slideUp : scaleIn}
            className={`
              relative z-10 w-full max-w-md bg-background shadow-2xl overflow-hidden
              ${variant === 'bottom'
                ? 'absolute bottom-0 h-[92vh] rounded-t-[2rem]'
                : 'mx-6 rounded-3xl p-6 md:p-8'
              }
            `}
            drag={variant === 'bottom' ? 'y' : false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.2 }}
            onDragEnd={(e, { offset, velocity }) => {
              if (variant === 'bottom' && (offset.y > 100 || velocity.y > 500)) {
                onClose();
              }
            }}
          >
            {variant === 'bottom' && (
              <div className="flex w-full flex-col items-center pt-3 pb-1 cursor-grab active:cursor-grabbing" onClick={onClose}>
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};