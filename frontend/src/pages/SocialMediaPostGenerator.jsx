import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Copy, Check } from 'lucide-react';

import PlatformToggle    from '../components/generate/PlatformToggle';
import TonePills         from '../components/generate/TonePills';
import PreferencesPanel  from '../components/generate/PreferencesPanel';
import { generateSocialPost } from '../utils/socialPostGenerator';

function Panel({ className = '', children }) {
  return (
    <section
      className={`relative overflow-hidden rounded-2xl border p-6 ${className}`}
      style={{
        background: 'linear-gradient(180deg, rgba(16,25,55,0.80) 0%, rgba(10,16,38,0.80) 100%)',
        borderColor: 'rgba(60,85,155,0.22)',
      }}
    >
      {children}
    </section>
  );
}

export default function SocialMediaPostGenerator() {
  const navigate = useNavigate();

  const [topic,    setTopic]    = useState('Student');
  const [platform, setPlatform] = useState('linkedin');
  const [tone,     setTone]     = useState('Professional');
  const [postState, setPostState] = useState(() => ({
    text:     generateSocialPost({ topic: 'Student', platform: 'linkedin', tone: 'Professional' }),
    topic:    'Student',
    platform: 'linkedin',
    tone:     'Professional',
  }));
  const [copied,     setCopied]     = useState(false);
  const [generating, setGenerating] = useState(false);

  const post = postState.text;

  // A post is "stale" when the live form inputs differ from the snapshot
  // used to produce the current generated text.
  const stale =
    postState.topic    !== topic ||
    postState.platform !== platform ||
    postState.tone     !== tone;

  const { chars, words } = useMemo(() => {
    const trimmed = post.trim();
    return {
      chars: trimmed.length,
      words: trimmed ? trimmed.split(/\s+/).length : 0,
    };
  }, [post]);

  function handleGenerate() {
    if (!topic.trim()) return;
    setGenerating(true);
    setTimeout(() => {
      setPostState({
        text: generateSocialPost({ topic, platform, tone }),
        topic, platform, tone,
      });
      setGenerating(false);
    }, 550);
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(post);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div
      className="relative flex min-h-screen text-[#e5e7eb]"
      style={{ background: 'radial-gradient(1200px 700px at 50% -10%, #0d1636 0%, #070b1c 55%, #05081a 100%)' }}
    >
      {/* ambient glows */}
      <div className="pointer-events-none fixed top-0 right-[320px] h-[500px] w-[500px] rounded-full bg-[#3f9fff]/10 blur-[140px]" />
      <div className="pointer-events-none fixed bottom-0 -left-32 h-[420px] w-[420px] rounded-full bg-[#7b5cff]/10 blur-[140px]" />

      {/* ────────────────────────────────────────────────
         MAIN COLUMN (form + preview + header/hero)
         ──────────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 md:px-10 pt-6">
          <button
            type="button"
            onClick={() => navigate('/generate')}
            className="inline-flex items-center gap-2 rounded-full border border-[#1e3260]/70 bg-[#0d1531]/60 px-4 py-2 text-[12.5px] font-medium text-[#8b94b8] transition hover:border-[#3a6bc4]/60 hover:text-white"
          >
            <ArrowLeft size={13} strokeWidth={2} />
            Services
          </button>

          <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[#1e3260]/70 bg-[#0d1531]/60 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6aa8ff]">
            <Sparkles size={11} strokeWidth={2} />
            AI-Powered Content Creation
          </span>

          <div className="hidden md:block w-[120px]" />
        </header>

        {/* Hero */}
        <div className="px-6 md:px-10 pt-8 text-center">
          <h1 className="font-display text-[38px] md:text-[50px] font-bold leading-[1.05] tracking-tight">
            <span className="gradient-text-blue">Social Media Post Generator</span>
          </h1>
          <p className="mx-auto mt-3 max-w-[560px] text-[13.5px] leading-relaxed text-[#8b94b8]">
            Create engaging social media content in seconds with AI magic.
          </p>
        </div>

        {/* 2-col form + preview */}
        <main className="grid gap-5 px-6 md:px-10 pb-16 pt-10 lg:grid-cols-2">
          {/* ── Left: form ── */}
          <div className="space-y-5">
            <Panel>
              <label className="font-display text-[13.5px] font-semibold text-white">What's your topic?</label>
              <textarea
                rows={4}
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="mt-3 w-full resize-none rounded-xl border border-[#1e3260]/70 bg-[#0a1130]/80 px-4 py-3 text-[13.5px] text-white placeholder-[#6b78a0] outline-none transition focus:border-[#3f9fff]/70 focus:shadow-[0_0_0_3px_rgba(63,159,255,0.18)]"
                placeholder="Describe what you want the post to be about…"
              />
            </Panel>

            <Panel>
              <label className="font-display text-[13.5px] font-semibold text-white">Choose platform</label>
              <div className="mt-3">
                <PlatformToggle value={platform} onChange={setPlatform} />
              </div>
            </Panel>

            <Panel>
              <label className="font-display text-[13.5px] font-semibold text-white">Select tone</label>
              <div className="mt-3">
                <TonePills value={tone} onChange={setTone} />
              </div>
            </Panel>

            <button
              type="button"
              onClick={handleGenerate}
              disabled={generating || !topic.trim()}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl btn-gradient py-3.5 text-[14px] font-semibold text-white shadow-[0_10px_32px_rgba(17,122,255,0.4)] transition disabled:pointer-events-none disabled:opacity-45"
            >
              <Sparkles
                size={15}
                strokeWidth={2.1}
                className={generating ? 'animate-spin' : ''}
              />
              {generating ? 'Generating…' : 'Generate Post'}
            </button>
          </div>

          {/* ── Right (inner): generated post ── */}
          <div>
            <Panel className="h-full">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <h2 className="font-display text-[16px] font-semibold text-white">Generated Post</h2>
                  {stale && !generating && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#5a4a1a]/70 bg-[#2e2614]/80 px-2.5 py-0.5 text-[10.5px] font-medium text-[#ffc94a]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#ffc94a]" />
                      Outdated — regenerate
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#2a4375]/60 bg-[#0d1531]/60 px-3 py-1.5 text-[12px] font-medium text-[#a3b0d4] transition hover:border-[#3f9fff]/60 hover:text-white"
                >
                  {copied ? <Check size={12} strokeWidth={2.4} /> : <Copy size={12} strokeWidth={2} />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>

              <div
                className="mt-4 min-h-[320px] rounded-xl border border-[#1e3260]/60 bg-[#0a1130]/70 p-4 text-[13px] leading-[1.7] text-[#c7d1eb] whitespace-pre-wrap transition-opacity duration-300"
                style={{ opacity: generating ? 0.4 : 1 }}
              >
                {post}
              </div>

              {/* counts */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-[#1e3260]/60 bg-[#0a1130]/60 px-4 py-3 text-center">
                  <div className="text-[11px] text-[#8b94b8]">Characters</div>
                  <div className="mt-1 font-count text-[22px] font-bold text-white tabular-nums">{chars}</div>
                </div>
                <div className="rounded-xl border border-[#1e3260]/60 bg-[#0a1130]/60 px-4 py-3 text-center">
                  <div className="text-[11px] text-[#8b94b8]">Words</div>
                  <div className="mt-1 font-count text-[22px] font-bold text-white tabular-nums">{words}</div>
                </div>
              </div>
            </Panel>
          </div>
        </main>
      </div>

      {/* ────────────────────────────────────────────────
         RIGHT SIDEBAR — Claude/ChatGPT style, always visible
         ──────────────────────────────────────────────── */}
      <div className="sticky top-0 z-20 hidden h-screen w-[320px] shrink-0 lg:block">
        <PreferencesPanel />
      </div>
    </div>
  );
}
