export const translations = {
    zh: {
        landing: {
            // Hero
            eyebrow: 'YOUR PERSONAL LIBRARY',
            title: 'SML',
            slogan: '你的私人乐谱库',
            subtitle: '为每一段旋律，留一席之地',

            // 滚动提示
            scrollHint: 'SCROLL',

            // 功能揭示
            revealLabel: 'CORE FEATURES',
            revealTitle: '为音乐而生',
            revealDesc: '从乐谱管理到练习录音，SML 为你的音乐旅程提供完整方案',
            features: [
                { title: '乐谱管理', desc: '上传 PDF 曲谱，打造私人数字曲库' },
                { title: '练习录音', desc: '记录每一次练习，见证演奏的蜕变' },
                { title: '分类整理', desc: '按作曲家与作品，系统化管理音乐资产' },
                { title: 'AI 助手', desc: '随时解答乐理、技法与音乐史问题' },
                { title: '多端覆盖', desc: 'Android 手机与 Windows 桌面端，随时随地管理乐谱' },
            ],

            // 故事叙述
            storyLabel: 'THE PHILOSOPHY',
            storyLines: [
                '每一份乐谱，',
                '都承载着作曲家的灵魂。',
                '每一段录音，',
                '都记录着练习者的成长。',
                '',
                '我们相信，',
                '音乐值得被认真对待。',
                '',
                '从巴赫到肖邦，',
                '从初学者到演奏家，',
                'SML 是你的音乐伙伴。',
            ],

            // 数据/技术
            techLabel: 'POWERED BY',
            techTitle: '技术驱动',
            stats: [
                { value: 'React', label: '前端框架' },
                { value: 'Electron + Capacitor', label: '跨平台 · 多端覆盖' },
                { value: 'Supabase', label: '云端服务' },
            ],

            // CTA 结尾
            ctaLabel: 'GET STARTED',
            ctaTitle: '开始你的音乐之旅',
            ctaSubtitle: '免费下载 · 开源 · Android & Windows',
            downloadAndroidBtn: 'Android 下载',
            downloadWindowsBtn: 'Windows 下载',
            githubBtn: 'GitHub',
            copyright: '© 2025-2026 SML · Sheet Music Library',
        },
        common: {
            language: '语言',
            english: 'English',
            chinese: '中文',
        },
    },
    en: {
        landing: {
            // Hero
            eyebrow: 'YOUR PERSONAL LIBRARY',
            title: 'SML',
            slogan: 'Your Personal Sheet Music Library',
            subtitle: 'A place for every melody',

            // 滚动提示
            scrollHint: 'SCROLL',

            // 功能揭示
            revealLabel: 'CORE FEATURES',
            revealTitle: 'Built for Music',
            revealDesc: 'From sheet music management to practice recordings, SML provides a complete solution for your musical journey',
            features: [
                { title: 'Sheet Music', desc: 'Upload PDF scores to build your digital library' },
                { title: 'Recordings', desc: 'Record every practice session, witness your growth' },
                { title: 'Organized', desc: 'Manage systematically by composer and piece' },
                { title: 'AI Assistant', desc: 'Get answers on music theory, technique, and history' },
                { title: 'Multi-Platform', desc: 'Android mobile and Windows desktop, manage your music anywhere' },
            ],

            // 故事叙述
            storyLabel: 'THE PHILOSOPHY',
            storyLines: [
                'Every sheet of music',
                'carries a composer\'s soul.',
                'Every recording',
                'captures a musician\'s growth.',
                '',
                'We believe',
                'music deserves to be taken seriously.',
                '',
                'From Bach to Chopin,',
                'from beginner to virtuoso,',
                'SML is your musical companion.',
            ],

            // 数据/技术
            techLabel: 'POWERED BY',
            techTitle: 'Tech Driven',
            stats: [
                { value: 'React', label: 'Frontend' },
                { value: 'Electron + Capacitor', label: 'Cross-platform' },
                { value: 'Supabase', label: 'Cloud Service' },
            ],

            // CTA 结尾
            ctaLabel: 'GET STARTED',
            ctaTitle: 'Begin Your Musical Journey',
            ctaSubtitle: 'Free · Open Source · Android & Windows',
            downloadAndroidBtn: 'Download Android',
            downloadWindowsBtn: 'Download Windows',
            githubBtn: 'GitHub',
            copyright: '© 2025-2026 SML · Sheet Music Library',
        },
        common: {
            language: 'Language',
            english: 'English',
            chinese: 'Chinese',
        },
    },
};

export type Language = 'zh' | 'en';
export type TranslationKey = typeof translations.zh;
