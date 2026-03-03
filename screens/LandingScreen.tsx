import React, { useEffect, useRef, useCallback } from 'react';
import { Download, Github, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';



const GITHUB_RELEASE_URL = 'https://github.com/Frrrrrranz/SML-APP/releases/latest';
const GITHUB_REPO_URL = 'https://github.com/Frrrrrranz/SML-APP';

// =============================================
// 粒子 Canvas — 金色音符粒子飘浮效果
// =============================================
const ParticlesCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置 canvas 尺寸
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // 粒子数组
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      opacityDir: number;
    }

    const particles: Particle[] = [];
    const PARTICLE_COUNT = 40;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: -Math.random() * 0.2 - 0.05,
        opacity: Math.random() * 0.5 + 0.1,
        opacityDir: Math.random() > 0.5 ? 0.003 : -0.003,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // 呼吸闪烁
        p.opacity += p.opacityDir;
        if (p.opacity > 0.6 || p.opacity < 0.05) p.opacityDir *= -1;

        // 边界循环
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(197, 160, 89, ${p.opacity})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[5]"
      style={{ opacity: 0.5 }}
    />
  );
};

// =============================================
// 自定义光标 — 仅桌面端
// =============================================
const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // NOTE: 移动端跳过自定义光标
    if (window.innerWidth <= 768) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    document.addEventListener('mousemove', handleMouseMove);

    const updateCursor = () => {
      const cursor = cursorRef.current;
      const follower = followerRef.current;
      if (!cursor || !follower) return;

      // 主光标紧跟
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.2;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.2;

      // 跟随光标延迟
      followerPos.current.x += (mousePos.current.x - followerPos.current.x) * 0.08;
      followerPos.current.y += (mousePos.current.y - followerPos.current.y) * 0.08;

      cursor.style.transform = `translate(${cursorPos.current.x - 4}px, ${cursorPos.current.y - 4}px)`;
      follower.style.transform = `translate(${followerPos.current.x - 18}px, ${followerPos.current.y - 18}px)`;

      requestAnimationFrame(updateCursor);
    };
    requestAnimationFrame(updateCursor);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // 移动端不渲染
  if (typeof window !== 'undefined' && window.innerWidth <= 768) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-oldGold rounded-full pointer-events-none z-[10000] mix-blend-difference hidden md:block"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-9 h-9 border border-oldGold/40 rounded-full pointer-events-none z-[9999] hidden md:block"
      />
    </>
  );
};

// =============================================
// 主页面组件
// =============================================
export const LandingScreen: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const landing = t.landing;

  // GSAP 初始化 — 所有滚动驱动动画在组件挂载后触发
  const initGSAP = useCallback(() => {
    // NOTE: GSAP 通过 CDN 加载，挂载在 window 全局对象上
    // 使用简单类型断言避免 Vite/TS 尝试解析 gsap npm 模块
    const win = window as unknown as Record<string, any>;
    const gsap = win.gsap;
    const ScrollTrigger = win.ScrollTrigger;

    if (!gsap || !ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);

    // ========== HERO 入场 ==========
    const heroTl = gsap.timeline({ delay: 0.3 });

    heroTl.to('#hero-eyebrow', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0.3);
    heroTl.to('.hero-title-char', {
      opacity: 1, y: 0, duration: 1.2, stagger: 0.12, ease: 'power3.out',
    }, 0.5);
    heroTl.to('#hero-slogan', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 1.0);
    heroTl.to('#hero-subtitle', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 1.2);
    heroTl.to('#scroll-indicator', { opacity: 1, duration: 1, ease: 'power2.out' }, 1.8);

    // Hero 滚动 — 内容上移渐隐
    gsap.to('.hero-content', {
      y: -100, opacity: 0,
      scrollTrigger: { trigger: '#hero', start: '30% top', end: '80% top', scrub: 1 },
    });
    gsap.to('#scroll-indicator', {
      opacity: 0,
      scrollTrigger: { trigger: '#hero', start: '10% top', end: '30% top', scrub: 1 },
    });

    // ========== 功能揭示 — 视口触发淡入 ==========
    gsap.to('#reveal-glow', {
      opacity: 1, scale: 1.1,
      scrollTrigger: { trigger: '#reveal-section', start: 'top 80%', end: 'top 30%', scrub: 1 },
    });
    gsap.to('#reveal-text', {
      opacity: 1, y: 0,
      scrollTrigger: { trigger: '#reveal-section', start: 'top 75%', end: 'top 45%', scrub: 1 },
    });
    // NOTE: 每个 feature-text 独立触发，纯文字模式避免方框渲染开销
    document.querySelectorAll('.feature-text').forEach((el) => {
      gsap.to(el, {
        opacity: 1, y: 0,
        scrollTrigger: { trigger: el, start: 'top 90%', end: 'top 65%', scrub: 1 },
      });
    });

    // ========== 故事叙述 — 逐行淡入 ==========
    gsap.to('#story-label', {
      opacity: 1,
      scrollTrigger: { trigger: '#story-section', start: 'top 80%', end: 'top 50%', scrub: 1 },
    });
    document.querySelectorAll('.story-line').forEach((line) => {
      gsap.to(line, {
        opacity: 1, y: 0,
        scrollTrigger: { trigger: line, start: 'top 85%', end: 'top 60%', scrub: 1 },
      });
    });

    // ========== 技术展示 — 视差浮现 ==========
    gsap.to('.tech-card', {
      opacity: 1, y: 0, scale: 1,
      scrollTrigger: { trigger: '#tech-section', start: 'top 70%', end: 'top 30%', scrub: 1 },
    });
    // NOTE: 每个 stat-text 独立触发，纯文字模式避免方框渲染开销
    document.querySelectorAll('.stat-text').forEach((el) => {
      gsap.to(el, {
        opacity: 1, y: 0,
        scrollTrigger: { trigger: el, start: 'top 90%', end: 'top 65%', scrub: 1 },
      });
    });

    // ========== CTA 结尾 ==========
    gsap.to('.cta-title-line', {
      opacity: 1, y: 0, stagger: 0.2,
      scrollTrigger: { trigger: '#cta-section', start: 'top 75%', end: 'top 45%', scrub: 1 },
    });
    gsap.to('#cta-buttons', {
      opacity: 1, y: 0,
      scrollTrigger: { trigger: '#cta-section', start: '20% 70%', end: '40% 50%', scrub: 1 },
    });
    gsap.to('#cta-footer', {
      opacity: 1,
      scrollTrigger: { trigger: '#cta-section', start: '50% 80%', end: '70% 60%', scrub: 1 },
    });

    // NOTE: 底部光晕随滚动增强
    gsap.to('#cta-glow', {
      opacity: 0.6, scale: 1.2,
      scrollTrigger: { trigger: '#cta-section', start: 'top 50%', end: 'bottom bottom', scrub: 2 },
    });
  }, []);

  useEffect(() => {
    // 检测 GSAP 加载状态
    const checkGSAP = () => {
      if ((window as unknown as { gsap: unknown }).gsap && (window as unknown as { ScrollTrigger: unknown }).ScrollTrigger) {
        initGSAP();
      } else {
        setTimeout(checkGSAP, 100);
      }
    };
    // 短暂延迟确保 DOM 就绪
    setTimeout(checkGSAP, 300);
  }, [initGSAP]);

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  return (
    <div className="relative bg-bgDeep min-h-screen">
      <ParticlesCanvas />
      <CustomCursor />

      {/* 语言切换 — 固定右上角 */}
      <button
        onClick={toggleLanguage}
        className="fixed top-6 right-6 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-lg text-xs text-textSecondary hover:text-oldGold transition-colors border border-white/10 hover:border-oldGold/30"
      >
        <Globe size={12} />
        {language === 'zh' ? 'EN' : '中文'}
      </button>

      {/* ===================== SECTION 1: HERO ===================== */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* 背景渐变 */}
        <div className="absolute inset-0 bg-gradient-to-b from-bgDeep via-bgSection to-bgDeep" />
        {/* 顶部微光 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-oldGold/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="hero-content relative z-10 text-center flex flex-col items-center gap-3">
          {/* 上方标签 */}
          <div
            id="hero-eyebrow"
            className="font-sans text-[0.6rem] tracking-[0.5em] text-textSecondary font-light opacity-0 translate-y-5"
          >
            {landing.eyebrow}
          </div>

          {/* 超大标题 — 逐字动画 */}
          <h1 className="flex gap-[0.15em] leading-none mt-2">
            {landing.title.split('').map((char: string, i: number) => (
              <span
                key={i}
                className="hero-title-char font-serif font-black text-transparent bg-clip-text opacity-0 translate-y-[60px]"
                style={{
                  fontSize: 'clamp(5rem, 18vw, 14rem)',
                  backgroundImage: 'linear-gradient(180deg, #f0ece4 0%, #e8c878 40%, #C5A059 100%)',
                  filter: 'drop-shadow(0 0 80px rgba(197, 160, 89, 0.2))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {char}
              </span>
            ))}
          </h1>

          {/* 中文标语 */}
          <div
            id="hero-slogan"
            className="font-serif text-xl md:text-2xl tracking-[0.2em] text-textPrimary font-normal opacity-0 translate-y-5 mt-2"
          >
            {landing.slogan}
          </div>

          {/* 副标题 */}
          <div
            id="hero-subtitle"
            className="font-sans text-sm tracking-[0.15em] text-textSecondary font-light opacity-0 translate-y-5 mt-1"
          >
            {landing.subtitle}
          </div>
        </div>

        {/* 滚动提示 */}
        <div id="scroll-indicator" className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10 opacity-0">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-oldGold animate-scroll-pulse" />
          <span className="text-[0.5rem] tracking-[0.4em] text-textSecondary font-light">{landing.scrollHint}</span>
        </div>
      </section>

      {/* ===================== SECTION 2: 功能揭示 ===================== */}
      <section id="reveal-section" className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bgDeep via-bgSection to-bgDeep" />
        {/* 中心光晕 — 滚动时放大 */}
        <div
          id="reveal-glow"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-0"
          style={{ background: 'radial-gradient(circle, rgba(197, 160, 89, 0.1) 0%, transparent 70%)' }}
        />

        <div className="relative z-10 flex flex-col items-center">
          {/* 标题区域 */}
          <div id="reveal-text" className="text-center mb-12 opacity-0 translate-y-10">
            <span className="block text-[0.6rem] tracking-[0.4em] text-oldGold font-semibold mb-4">
              {landing.revealLabel}
            </span>
            <h2
              className="font-serif font-bold text-transparent bg-clip-text mb-4"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                backgroundImage: 'linear-gradient(135deg, #f0ece4, #e8c878)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {landing.revealTitle}
            </h2>
            <p className="text-sm md:text-base text-textSecondary font-light max-w-md leading-relaxed">
              {landing.revealDesc}
            </p>
          </div>

          {/* 功能列表 — 纯文字，避免方框渲染开销 */}
          <div className="flex flex-col items-center gap-6 max-w-md w-full">
            {landing.features.map((feature: { title: string; desc: string }, index: number) => (
              <div
                key={index}
                className="feature-text opacity-0 translate-y-7 text-center"
              >
                <h4 className="font-serif text-lg font-bold text-textPrimary mb-1">{feature.title}</h4>
                <p className="text-xs text-textSecondary font-light tracking-wide">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== SECTION 3: 故事叙述 ===================== */}
      <section id="story-section" className="relative min-h-screen flex items-center justify-center px-6 py-20">
        {/* 背景渐变 */}
        <div className="absolute inset-0 bg-gradient-to-b from-bgDeep via-bgSection to-bgDeep" />
        {/* 侧面微光 */}
        <div className="absolute top-1/2 left-[20%] -translate-y-1/2 w-[300px] h-[400px] bg-oldGold/[0.03] rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-xl text-center">
          <span
            id="story-label"
            className="block text-[0.6rem] tracking-[0.5em] text-oldGold font-semibold mb-12 opacity-0"
          >
            {landing.storyLabel}
          </span>

          <div className="space-y-1">
            {landing.storyLines.map((line: string, index: number) => (
              line === '' ? (
                <div key={index} className="h-6" />
              ) : (
                <p
                  key={index}
                  className="story-line font-serif text-lg md:text-xl leading-[2.2] font-normal text-textPrimary opacity-0 translate-y-7"
                >
                  {line}
                </p>
              )
            ))}
          </div>
        </div>
      </section>

      {/* ===================== SECTION 4: 技术展示 ===================== */}
      <section id="tech-section" className="relative min-h-[70vh] flex items-center justify-center px-6 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-bgDeep" />
        {/* 底部微光 */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-oldGold/[0.04] rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 text-center">
          {/* 毛玻璃卡片 */}
          <div className="tech-card opacity-0 translate-y-16 scale-95 px-8 md:px-16 py-10 mb-8">
            <span className="block text-[0.6rem] tracking-[0.5em] text-oldGold font-semibold mb-4">
              {landing.techLabel}
            </span>
            <h2
              className="font-serif font-bold text-transparent bg-clip-text"
              style={{
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                backgroundImage: 'linear-gradient(135deg, #f0ece4, #e8c878)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {landing.techTitle}
            </h2>
          </div>

          {/* 技术统计 — 纯文字，避免方框渲染开销 */}
          <div className="flex flex-col items-center gap-8 mt-4">
            {landing.stats.map((stat: { value: string; label: string }, index: number) => (
              <div key={index} className="stat-text opacity-0 translate-y-7 text-center">
                <span className="block font-sans text-3xl md:text-4xl font-bold text-textPrimary tracking-wider">
                  {stat.value}
                </span>
                <span className="block text-[0.6rem] tracking-[0.3em] text-textSecondary font-light uppercase mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== SECTION 5: CTA 结尾 ===================== */}
      <section id="cta-section" className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-bgDeep" />
        {/* 底部暖色光晕 */}
        <div
          id="cta-glow"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 opacity-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(197, 160, 89, 0.12) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 text-center flex flex-col items-center gap-8">
          {/* 标签 */}
          <span className="cta-title-line text-[0.6rem] tracking-[0.5em] text-oldGold font-semibold opacity-0 translate-y-5">
            {landing.ctaLabel}
          </span>

          {/* 双行大标题 */}
          <h2 className="flex flex-col gap-1">
            <span
              className="cta-title-line font-serif font-bold text-transparent bg-clip-text opacity-0 translate-y-7"
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                backgroundImage: 'linear-gradient(135deg, #f0ece4 0%, #e8c878 50%, #C5A059 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {landing.ctaTitle}
            </span>
          </h2>

          <p className="cta-title-line text-sm text-textSecondary font-light tracking-wider opacity-0 translate-y-5">
            {landing.ctaSubtitle}
          </p>

          {/* 按钮组 */}
          <div id="cta-buttons" className="flex flex-col sm:flex-row gap-4 mt-4 opacity-0 translate-y-5">
            <a
              href={GITHUB_RELEASE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 px-10 py-4 bg-oldGold text-bgDeep font-bold text-base rounded-sm hover:bg-goldLight transition-colors shadow-lg shadow-oldGold/20"
            >
              <Download size={18} />
              {landing.downloadBtn}
            </a>
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 px-10 py-4 border border-oldGold/30 text-oldGold font-semibold text-base rounded-sm hover:bg-oldGold/10 transition-colors"
            >
              <Github size={18} />
              {landing.githubBtn}
            </a>
          </div>
        </div>

        {/* 页脚 */}
        <div
          id="cta-footer"
          className="absolute bottom-8 left-0 w-full flex justify-center px-8 text-[0.55rem] tracking-[0.3em] text-textSecondary/30 font-light opacity-0"
        >
          <span>{landing.copyright}</span>
        </div>
      </section>
    </div>
  );
};
