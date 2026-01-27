import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Loader2, CheckCircle, AlertCircle, Languages } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

type AuthMode = 'login' | 'register';

export const AuthScreen: React.FC = () => {
    const { signIn, signUp } = useAuth();
    const { t, language, setLanguage } = useLanguage();

    const [mode, setMode] = useState<AuthMode>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showVerificationMessage, setShowVerificationMessage] = useState(false);
    const [isFirstVisit, setIsFirstVisit] = useState(false);

    // 检查是否是首次访问
    React.useEffect(() => {
        const visited = localStorage.getItem('sml_has_visited');
        if (!visited) {
            setIsFirstVisit(true);
            localStorage.setItem('sml_has_visited', 'true');
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (mode === 'login') {
                await signIn(email, password);
                // 登录成功后，App.tsx 会自动跳转到主页
            } else {
                // 注册
                if (!nickname.trim()) {
                    setError(t.auth.errors.nicknameRequired);
                    setLoading(false);
                    return;
                }

                const result = await signUp(email, password, nickname);

                if (result.needsVerification) {
                    // 显示验证邮件提示
                    setShowVerificationMessage(true);
                }
            }
        } catch (err: any) {
            console.error('Auth error:', err);
            // 处理常见错误信息
            if (err.message?.includes('Invalid login credentials')) {
                setError(t.auth.errors.invalidCredentials);
            } else if (err.message?.includes('Email not confirmed')) {
                setError(t.auth.errors.emailNotConfirmed);
            } else if (err.message?.includes('User already registered')) {
                setError(t.auth.errors.userAlreadyRegistered);
            } else if (err.message?.includes('Password should be at least')) {
                setError(t.auth.errors.passwordTooShort);
            } else {
                setError(err.message || t.auth.errors.genericError);
            }
        } finally {
            setLoading(false);
        }
    };

    const switchMode = () => {
        setMode(mode === 'login' ? 'register' : 'login');
        setError(null);
        setShowVerificationMessage(false);
    };

    // 验证邮件发送成功提示
    if (showVerificationMessage) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
                <div className="w-full max-w-sm text-center">
                    <div className="flex justify-center mb-6">
                        <div className="size-20 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="text-green-600" size={40} />
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold font-serif text-textMain mb-3">
                        {t.auth.verifySentTitle}
                    </h1>

                    <p className="text-textSub mb-8 leading-relaxed">
                        {t.auth.verifySentDesc.replace('{email}', email)}
                        <br />
                        {t.auth.verifySentAction}
                    </p>

                    <button
                        onClick={() => {
                            setShowVerificationMessage(false);
                            setMode('login');
                        }}
                        className="text-oldGold font-semibold hover:underline"
                    >
                        {t.auth.backToLogin}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Header */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
                {/* Logo / Brand */}
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-bold font-serif text-textMain tracking-tight">
                        SML
                    </h1>
                    <p className="text-textSub text-sm mt-2 tracking-wide">
                        Sheet Music Library
                    </p>
                </div>

                {/* Form Card */}
                <div className="w-full max-w-sm">
                    <h2 className="text-2xl font-bold font-serif text-textMain mb-8 text-center">
                        {mode === 'login'
                            ? (isFirstVisit ? t.auth.welcome : t.auth.welcomeBack)
                            : t.auth.join
                        }
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Nickname (Register Only) */}
                        {mode === 'register' && (
                            <div className="relative">
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400">
                                    <User size={20} />
                                </div>
                                <input
                                    type="text"
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                    placeholder={t.auth.nickname}
                                    className="w-full pl-8 pr-4 py-3 border-b-2 border-gray-200 bg-transparent text-textMain placeholder-gray-400 focus:border-oldGold focus:outline-none transition-colors text-lg"
                                    autoComplete="name"
                                />
                            </div>
                        )}

                        {/* Email */}
                        <div className="relative">
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400">
                                <Mail size={20} />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t.auth.email}
                                className="w-full pl-8 pr-4 py-3 border-b-2 border-gray-200 bg-transparent text-textMain placeholder-gray-400 focus:border-oldGold focus:outline-none transition-colors text-lg"
                                autoComplete="email"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400">
                                <Lock size={20} />
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={t.auth.password}
                                className="w-full pl-8 pr-4 py-3 border-b-2 border-gray-200 bg-transparent text-textMain placeholder-gray-400 focus:border-oldGold focus:outline-none transition-colors text-lg"
                                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                                required
                                minLength={6}
                            />
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 px-4 py-3 rounded-lg">
                                <AlertCircle size={18} />
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`
                w-full py-4 rounded-full font-bold text-lg text-white
                flex items-center justify-center gap-2
                transition-all active:scale-[0.98]
                ${loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-oldGold hover:bg-[#d4ac26] shadow-lg shadow-oldGold/30'}
              `}
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    {t.auth.processing}
                                </>
                            ) : (
                                <>
                                    {mode === 'login' ? t.auth.login : t.auth.register}
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm">
                        <span className="text-textSub">
                            {mode === 'login' ? t.auth.noAccount : t.auth.hasAccount}
                        </span>
                        <button
                            onClick={switchMode}
                            className="ml-2 text-oldGold font-semibold hover:underline"
                        >
                            {mode === 'login' ? t.auth.registerNow : t.auth.backToLogin}
                        </button>
                    </div>

                    {/* Language Switcher */}
                    <div className="mt-10 flex justify-center gap-4">
                        <button
                            onClick={() => setLanguage('zh')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${language === 'zh'
                                ? 'bg-oldGold/10 text-oldGold border border-oldGold/20'
                                : 'text-textSub hover:text-textMain'
                                }`}
                        >
                            中文
                        </button>
                        <div className="w-px h-3 bg-gray-200 self-center" />
                        <button
                            onClick={() => setLanguage('en')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${language === 'en'
                                ? 'bg-oldGold/10 text-oldGold border border-oldGold/20'
                                : 'text-textSub hover:text-textMain'
                                }`}
                        >
                            English
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="py-6 text-center text-gray-400 text-xs">
                © 2025 SML Sheet Music Library
            </div>
        </div>
    );
};
