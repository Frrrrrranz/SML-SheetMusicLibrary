import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { backdropFade, scaleIn } from '../utils/animations';

// NOTE: localStorage key 用于持久化用户的同意选择
const CONSENT_KEY = 'sml_consent_accepted';

interface ConsentBannerProps {
    onAccept: () => void;
}

/**
 * 隐私政策/使用条款同意弹窗
 * 首次访问时展示，用户点击同意后写入 localStorage，后续不再弹出
 */
export const ConsentBanner: React.FC<ConsentBannerProps> = ({ onAccept }) => {
    const { t } = useLanguage();
    const [isExiting, setIsExiting] = useState(false);

    const handleAccept = () => {
        localStorage.setItem(CONSENT_KEY, 'true');
        setIsExiting(true);
        // NOTE: 等待退出动画完成后再通知父组件
        setTimeout(() => onAccept(), 300);
    };

    return (
        <AnimatePresence>
            {!isExiting && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    {/* 背景遮罩 */}
                    <motion.div
                        variants={backdropFade}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    />

                    {/* 弹窗内容 */}
                    <motion.div
                        variants={scaleIn}
                        className="relative z-10 w-full max-w-sm mx-6 bg-background rounded-3xl p-6 shadow-2xl"
                    >
                        {/* 图标 */}
                        <div className="flex justify-center mb-4">
                            <div className="w-14 h-14 rounded-2xl bg-oldGold/10 flex items-center justify-center">
                                <Shield className="w-7 h-7 text-oldGold" />
                            </div>
                        </div>

                        {/* 标题 */}
                        <h2 className="text-xl font-bold font-serif text-textMain text-center mb-3">
                            {t.common.consent.title}
                        </h2>

                        {/* 政策内容 */}
                        <div className="bg-gray-50 rounded-2xl p-4 mb-5 space-y-3">
                            <p className="text-sm text-textMain leading-relaxed">
                                {t.common.consent.notice}
                            </p>
                            <p className="text-sm text-textSub leading-relaxed">
                                {t.common.consent.dataCollection}
                            </p>
                        </div>

                        {/* 同意按钮 */}
                        <button
                            onClick={handleAccept}
                            className="w-full py-3 rounded-xl bg-oldGold text-white font-semibold text-base
                                hover:bg-oldGold/90 active:scale-[0.98] transition-all duration-200"
                        >
                            {t.common.consent.agree}
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

/**
 * 同意门控包装组件
 * 未同意时渲染 ConsentBanner，已同意时渲染 children
 */
export const ConsentGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [hasConsented, setHasConsented] = useState(() => {
        return localStorage.getItem(CONSENT_KEY) === 'true';
    });

    if (!hasConsented) {
        return <ConsentBanner onAccept={() => setHasConsented(true)} />;
    }

    return <>{children}</>;
};
