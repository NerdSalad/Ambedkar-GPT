/**
 * Platform + tone aware social media post generator.
 *
 * No external API — this is a deterministic-with-variation template engine.
 * Given a topic, a platform id (instagram | twitter | facebook | linkedin),
 * and a tone (Professional | Casual | Friendly | Inspirational), it returns
 * a post shaped for that platform's norms (length, hashtag style, emoji use,
 * paragraph breaks).
 *
 * Each call randomly picks one phrasing variant per slot so successive
 * "Generate Post" clicks produce different output.
 */

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const capitalize = (s = '') =>
  s ? s.charAt(0).toUpperCase() + s.slice(1) : s;

const normalizeTopic = (raw) => {
  const t = (raw || '').trim();
  if (!t) return 'your topic';
  return t.replace(/\s+/g, ' ');
};

const hashtagify = (raw) =>
  raw
    .trim()
    .split(/\s+/)
    .map((w) => w.replace(/[^a-zA-Z0-9]/g, ''))
    .filter(Boolean)
    .map((w, i) => (i === 0 ? w.toLowerCase() : capitalize(w)))
    .join('');

// ─────────────────────────────────────────────────────────────
// Tone-specific phrase banks
// ─────────────────────────────────────────────────────────────
const TONE = {
  Professional: {
    opener: [
      'A closer look at',
      'Key insights on',
      'Unpacking',
      'Perspectives on',
      'The state of',
    ],
    body: [
      'Organizations that invest in {topic} consistently outperform peers on adaptability, retention, and long-term growth. The data makes the case clearly.',
      'When leaders prioritize {topic}, teams gain clarity on what matters — and execution follows. It is less about strategy and more about discipline.',
      'Progress in {topic} is rarely accidental. It is the product of deliberate choices made early, communicated widely, and revisited often.',
    ],
    takeawaysLabel: 'Key takeaways',
    takeaways: [
      ['strategic clarity', 'cross-functional execution', 'measurable outcomes'],
      ['sustainable growth', 'disciplined prioritization', 'stakeholder alignment'],
      ['operational resilience', 'data-driven decisions', 'long-term value'],
    ],
    closers: [
      'What has worked in your experience?',
      'Curious what others are seeing — happy to compare notes.',
      'Would love to hear how your team is approaching this.',
    ],
  },
  Casual: {
    opener: [
      "So here's the thing about",
      "Quick thoughts on",
      "Been thinking about",
      "Real talk:",
      "Hot take on",
    ],
    body: [
      'Honestly, {topic} is everywhere right now — and most of the hot takes are missing the point. The interesting stuff is in the details.',
      "{topic} doesn't have to be complicated. Start small, ship something, learn from it, repeat. That's the whole playbook.",
      "Everyone talks about {topic} like it's a silver bullet. It isn't — but paired with a bit of patience, it actually works.",
    ],
    takeawaysLabel: 'tl;dr',
    takeaways: [
      ['keep it simple', 'ship early', 'iterate often'],
      ['listen more', 'ship faster', 'stay curious'],
      ['start small', 'learn loudly', 'stay human'],
    ],
    closers: [
      'What am I missing?',
      'Drop your thoughts below 👇',
      'Agree? Disagree? Let me know.',
    ],
  },
  Friendly: {
    opener: [
      'Hey friends — a little something on',
      'Sharing a quick note about',
      "Here's a warm take on",
      'Just wanted to share some thoughts on',
    ],
    body: [
      "I've been learning a lot about {topic} lately, and one thing stands out: the people who grow fastest are the ones who ask the best questions.",
      'Every time I dig into {topic}, I find another small idea that makes a big difference. Wanted to share a few of those today.',
      "There's something really lovely about watching a community engage with {topic} — so much to learn from each other.",
    ],
    takeawaysLabel: 'Three things worth holding onto',
    takeaways: [
      ['be curious', 'be generous', 'be patient'],
      ['listen well', 'share openly', 'show up consistently'],
      ['ask more', 'assume less', 'celebrate small wins'],
    ],
    closers: [
      'Sending good vibes to everyone building something today. 💙',
      'Hope this helps someone today!',
      "What's been on your mind lately?",
    ],
  },
  Inspirational: {
    opener: [
      'Never underestimate the power of',
      'The best time to commit to',
      "Here's what I've learned about",
      'If you take one thing from today, let it be this —',
    ],
    body: [
      '{topic} is not a destination — it is a practice. Show up for it on the days nobody is watching, and the results will compound quietly.',
      'The people who go furthest in {topic} are not the most talented. They are the ones who refuse to stop — long after the applause has faded.',
      'Every giant leap in {topic} began as a quiet, uncertain first step. Take yours today.',
    ],
    takeawaysLabel: 'Remember',
    takeaways: [
      ['start before you are ready', 'stay longer than is comfortable', 'trust the compounding'],
      ['consistency beats intensity', 'progress over perfection', 'keep the faith'],
      ['small steps, big direction', 'patience is a strategy', 'the work is the reward'],
    ],
    closers: [
      'Keep going. 🚀',
      'Your future self is watching.',
      'One step at a time — but every single day.',
    ],
  },
};

// ─────────────────────────────────────────────────────────────
// Platform-specific layout
// ─────────────────────────────────────────────────────────────

function buildTwitter(topic, tone) {
  const T = TONE[tone] ?? TONE.Professional;
  const hook   = pick(T.opener);
  const punch  = pick(T.body).replace('{topic}', topic);
  const tag    = hashtagify(topic);
  // Twitter caps around ~280; keep it tight (no takeaways).
  let out = `${hook} ${topic}.\n\n${punch}\n\n#${tag} #${tone.toLowerCase()}`;
  if (out.length > 275) out = out.slice(0, 272).trimEnd() + '…';
  return out;
}

function buildInstagram(topic, tone) {
  const T = TONE[tone] ?? TONE.Professional;
  const hook   = pick(T.opener);
  const punch  = pick(T.body).replace('{topic}', topic);
  const closer = pick(T.closers);
  const tag    = hashtagify(topic);
  // Instagram: shorter paragraphs, more emoji, lots of hashtags.
  return [
    `✨ ${hook} ${topic} ✨`,
    '',
    punch,
    '',
    closer,
    '',
    `#${tag} #${tone.toLowerCase()} #content #growth #creators #inspiration`,
  ].join('\n');
}

function buildFacebook(topic, tone) {
  const T = TONE[tone] ?? TONE.Professional;
  const hook   = pick(T.opener);
  const punch  = pick(T.body).replace('{topic}', topic);
  const takes  = pick(T.takeaways);
  const closer = pick(T.closers);
  const tag    = hashtagify(topic);
  // Facebook: conversational, medium length.
  return [
    `${hook} ${topic} —`,
    '',
    punch,
    '',
    `${T.takeawaysLabel}:`,
    ...takes.map((t) => `• ${t}`),
    '',
    closer,
    '',
    `#${tag} #${tone.toLowerCase()}`,
  ].join('\n');
}

function buildLinkedIn(topic, tone) {
  const T = TONE[tone] ?? TONE.Professional;
  const hook   = pick(T.opener);
  const punch  = pick(T.body).replace('{topic}', topic);
  const takes  = pick(T.takeaways);
  const closer = pick(T.closers);
  const tag    = hashtagify(topic);
  // LinkedIn: long-form, structured.
  return [
    `${hook} ${topic}.`,
    '',
    punch,
    '',
    `${T.takeawaysLabel}:`,
    ...takes.map((t) => `  - ${t}`),
    '',
    closer,
    '',
    `#${tag} #${tone.toLowerCase()} #leadership #growth`,
  ].join('\n');
}

const BUILDERS = {
  twitter:   buildTwitter,
  instagram: buildInstagram,
  facebook:  buildFacebook,
  linkedin:  buildLinkedIn,
};

/**
 * Generate a post for a given topic/platform/tone.
 */
export function generateSocialPost({ topic, platform, tone }) {
  const t = normalizeTopic(topic);
  const build = BUILDERS[platform] ?? buildLinkedIn;
  return build(t, tone);
}
