import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

type AuthMode = 'login' | 'register';

export const AuthScreen: React.FC = () => {
    const { signIn, signUp } = useAuth();

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
                    setError('请输入昵称');
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
                setError('邮箱或密码错误');
            } else if (err.message?.includes('Email not confirmed')) {
                setError('请先验证您的邮箱');
            } else if (err.message?.includes('User already registered')) {
                setError('该邮箱已注册');
            } else if (err.message?.includes('Password should be at least')) {
                setError('密码至少需要 6 个字符');
            } else {
                setError(err.message || '操作失败，请重试');
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
                        验证邮件已发送
                    </h1>

                    <p className="text-textSub mb-8 leading-relaxed">
                        我们已向 <span className="font-semibold text-textMain">{email}</span> 发送了一封验证邮件。
                        <br />
                        请点击邮件中的链接完成注册。
                    </p>

                    <button
                        onClick={() => {
                            setShowVerificationMessage(false);
                            setMode('login');
                        }}
                        className="text-oldGold font-semibold hover:underline"
                    >
                        返回登录
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
                            ? (isFirstVisit ? '欢迎使用 SML' : '欢迎回来')
                            : '加入 SML'
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
                                    placeholder="昵称"
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
                                placeholder="邮箱"
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
                                placeholder="密码"
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
                                    处理中...
                                </>
                            ) : (
                                <>
                                    {mode === 'login' ? '登录' : '注册'}
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Switch Mode */}
                    <div className="mt-8 text-center">
                        <span className="text-textSub">
                            {mode === 'login' ? '还没有账号？' : '已有账号？'}
                        </span>
                        <button
                            onClick={switchMode}
                            className="ml-2 text-oldGold font-semibold hover:underline"
                        >
                            {mode === 'login' ? '立即注册' : '返回登录'}
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
