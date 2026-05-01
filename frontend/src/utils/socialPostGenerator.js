const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const capitalize = (s = '') => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
const normalizeTopic = (raw) => (raw || '').trim().replace(/\s+/g, ' ') || 'your topic';

// Detect Devanagari script → Hindi article
function isHindi(text) {
  return /[ऀ-ॿ]/.test(text || '');
}

// Map saved preference value → internal tone key
function resolveTone(uiTone, prefTone) {
  if (prefTone) {
    const p = prefTone.toLowerCase();
    if (p.includes('assertive') || p.includes('academic') || p.includes('formal') || p.includes('analytical')) return 'Professional';
    if (p.includes('empathetic') || p.includes('friendly') || p.includes('conversational')) return 'Friendly';
    if (p.includes('hopeful') || p.includes('motivational') || p.includes('passionate') || p.includes('inspirational')) return 'Inspirational';
    if (p.includes('confrontational')) return 'Confrontational';
  }
  return uiTone || 'Professional';
}

// Map saved content-length preference → post length variant
function resolveLength(prefLength) {
  if (!prefLength) return 'medium';
  const p = prefLength.toLowerCase();
  if (p.includes('ultra') || p.includes('tweet') || p.includes('caption') || p.includes('short')) return 'short';
  if (p.includes('long') || p.includes('essay') || p.includes('article') || p.includes('extended') || p.includes('detailed') || p.includes('comprehensive')) return 'long';
  return 'medium';
}

// Map saved call-to-action preference → closing style
function resolveCta(prefCta) {
  if (!prefCta) return 'engage';
  const p = prefCta.toLowerCase();
  if (p.includes('action') || p.includes('mobiliz')) return 'action';
  if (p.includes('institutional') || p.includes('legal')) return 'institutional';
  if (p.includes('awareness') || p.includes('passive')) return 'engage';
  if (p.includes('educational') || p.includes('informative')) return 'educational';
  return 'engage';
}

// ── Hindi phrase banks ─────────────────────────────────────────────────────────

const HINDI = {
  Professional: {
    opener: [
      'डॉ. आंबेडकर के संविधान में स्पष्ट है —',
      'एक महत्वपूर्ण विषय पर ध्यान दें:',
      'सामाजिक न्याय की दिशा में:',
      'तथ्य और संविधान की बात:',
    ],
    body: [
      '{topic} — यह विषय हमारे संविधान की मूल भावना से सीधे जुड़ा है। डॉ. आंबेडकर ने हर नागरिक के लिए समान अधिकारों की नींव रखी थी।',
      '{topic} को समझना आज की ज़रूरत है। सामाजिक परिवर्तन तथ्यों, संविधान और सामूहिक जागरूकता से आता है।',
      'जब हम {topic} की बात करते हैं, तो स्पष्ट होता है कि संरचनात्मक बदलाव के बिना न्याय संभव नहीं।',
    ],
    cta: {
      engage:       'आपकी राय साझा करें। संविधान हमारी ढाल है।',
      action:       'इस जानकारी को आगे फैलाएं। जागरूकता पहला कदम है।',
      institutional:'संबंधित अधिकारियों तक यह बात पहुँचाना आवश्यक है।',
      educational:  'इसे पढ़ें, समझें और दूसरों को भी बताएं।',
    },
    hashtags: '#JaiBhim #SamajikNyay #Ambedkar #SamvidhanHamaraHai',
  },
  Inspirational: {
    opener: [
      'जागो, संगठित हो, संघर्ष करो —',
      'बदलाव की शुरुआत हम से होती है:',
      'डॉ. भीमराव आंबेडकर का संदेश आज भी प्रासंगिक है:',
      'समानता का सपना, संघर्ष की राह:',
    ],
    body: [
      '{topic} — यह संघर्ष हमारी पहचान है। बाबासाहेब ने कहा था — "शिक्षित करो, संगठित करो, संघर्ष करो।" यही हमारा मार्ग है।',
      '{topic} के लिए उठ खड़े होना इस पीढ़ी का कर्तव्य है। हर आवाज़ मायने रखती है, हर कदम इतिहास बनाता है।',
      '{topic} पर लड़ाई तब तक जारी रहेगी जब तक समाज में सच्ची समानता नहीं आती। बाबासाहेब का सपना हमें आगे ले जाए।',
    ],
    cta: {
      engage:       'जय भीम! ✊🔵 इसे शेयर करें।',
      action:       'शिक्षित करो, संगठित करो, संघर्ष करो! 💙',
      institutional:'संस्थागत बदलाव के लिए एकजुट हों।',
      educational:  'बाबासाहेब की विचारधारा फैलाओ — यही सच्ची श्रद्धांजलि है।',
    },
    hashtags: '#JaiBhim #Ambedkar #DalitPride #SamajikParivatan #NayaBharat',
  },
  Friendly: {
    opener: [
      'दोस्तों, एक ज़रूरी बात —',
      'थोड़ा समय निकालकर इस पर सोचें:',
      'आज की एक अहम जानकारी आपके साथ:',
      'मिलकर सीखें, मिलकर बढ़ें —',
    ],
    body: [
      '{topic} — इस मुद्दे को समझना हम सभी के लिए ज़रूरी है। जब हम मिलकर सोचते हैं, तो बेहतर रास्ते निकलते हैं।',
      '{topic} के बारे में जानकर एहसास होता है कि जागरूकता ही पहला कदम है। आइए इसे आगे बढ़ाएं।',
      '{topic} की बात आते ही मन में एक उम्मीद जागती है — कि बदलाव मुमकिन है।',
    ],
    cta: {
      engage:       'आपके विचार नीचे साझा करें। 💬',
      action:       'इसे उन लोगों तक पहुंचाएं जिन्हें ज़रूरत है।',
      institutional:'मिलकर सही कदम उठाएं।',
      educational:  'साथ मिलकर जागरूकता फैलाएं। 💙',
    },
    hashtags: '#JaiBhim #Ambedkar #Jagrukta #SamajikNyay',
  },
  Confrontational: {
    opener: [
      'सवाल पूछना ज़रूरी है —',
      'यह व्यवस्था कब बदलेगी?',
      'सच्चाई से मुँह मत मोड़ो:',
      'जवाब चाहिए — अभी:',
    ],
    body: [
      '{topic} — यह सिर्फ एक खबर नहीं, यह हमारी व्यवस्था का आईना है। कब तक यह चलता रहेगा?',
      '{topic} पर जो हो रहा है वह संविधान की भावना के विरुद्ध है। बाबासाहेब की विरासत की रक्षा के लिए आवाज़ उठानी होगी।',
      'जब {topic} जैसी घटनाएं होती हैं, तो चुप रहना एक अपराध है। बोलो — क्योंकि तुम्हारी आवाज़ मायने रखती है।',
    ],
    cta: {
      engage:       'जवाबदेही माँगो। चुप मत रहो। ✊',
      action:       'यह स्वीकार्य नहीं। आवाज़ उठाओ। #JaiBhim',
      institutional:'संविधान की रक्षा हमारा कर्तव्य है। कानूनी रास्ता अपनाओ।',
      educational:  'तथ्य जानो, सवाल पूछो, जवाब लो।',
    },
    hashtags: '#JaiBhim #Ambedkar #Accountability #DalitRights #SamajikNyay',
  },
};

function buildHindi(topic, tone, length, cta) {
  const T = HINDI[tone] ?? HINDI.Professional;
  const opener = pick(T.opener);
  const body = pick(T.body).replace('{topic}', topic);
  const closer = T.cta[cta] ?? T.cta.engage;

  if (length === 'short') {
    return [opener, '', body.split('।')[0] + '।', '', closer, '', T.hashtags].join('\n');
  }
  if (length === 'long') {
    const body2 = pick(T.body).replace('{topic}', topic);
    return [opener, '', body, '', body2, '', closer, '', T.hashtags].join('\n');
  }
  return [opener, '', body, '', closer, '', T.hashtags].join('\n');
}

// ── English phrase banks ───────────────────────────────────────────────────────

const ENGLISH = {
  Professional: {
    opener: ['A closer look at', 'Key insights on', 'Unpacking', 'Perspectives on', 'The state of'],
    body: [
      'Progress in {topic} requires deliberate action, not just awareness. The systems around us shape outcomes — and those systems can be changed.',
      'When communities understand {topic} deeply, they gain the clarity and tools to demand accountability. Knowledge is the first step.',
      '{topic} sits at the heart of constitutional rights and social equity. Engaging with it is not optional — it is a civic duty.',
    ],
    cta: {
      engage:       'What are your thoughts? Share in the comments.',
      action:       'Share this. Spread awareness. Every voice counts.',
      institutional:'Reach out to your representatives. Demand structural change.',
      educational:  'Read, share, and discuss. Education is power.',
    },
    hashtags: (t) => `#JaiBhim #Ambedkar #SocialJustice #${hashtagify(t)} #Constitution`,
  },
  Inspirational: {
    opener: [
      'Never underestimate the power of',
      'The best time to commit to',
      "Here's what we must remember about",
      'The struggle continues —',
    ],
    body: [
      '{topic} is not a destination — it is a practice. Show up for justice on the days nobody is watching, and results will compound quietly.',
      'The people who go furthest in the fight around {topic} are not the most talented. They are the ones who refuse to stop.',
      'Every giant leap toward justice in {topic} began as a quiet, uncertain first step. Take yours today.',
    ],
    cta: {
      engage:       'Keep going. 🔵 Jai Bhim!',
      action:       'Educate. Organise. Agitate. ✊',
      institutional:'Demand institutional change. Now.',
      educational:  'Share Ambedkar\'s teachings. That is the real tribute.',
    },
    hashtags: (t) => `#JaiBhim #Ambedkar #DalitPride #${hashtagify(t)} #SocialChange`,
  },
  Friendly: {
    opener: [
      'Friends — a quick but important thought on',
      'Sharing something worth reading about',
      'Here\'s a warm but honest look at',
      'Just wanted to share some thoughts on',
    ],
    body: [
      "I've been thinking about {topic} a lot — and one thing is clear: the communities most affected deserve to be heard loudest.",
      "Every time I look into {topic}, I find another layer worth understanding. Sharing a few thoughts today.",
      "There's something powerful about communities coming together around {topic} — so much wisdom and strength in unity.",
    ],
    cta: {
      engage:       'Drop your thoughts below. 💬',
      action:       'Pass this on to someone who needs it.',
      institutional:'Let\'s push for change together.',
      educational:  'Share the knowledge. 💙',
    },
    hashtags: (t) => `#JaiBhim #Ambedkar #Awareness #${hashtagify(t)}`,
  },
  Confrontational: {
    opener: [
      'We need to talk about',
      'This cannot be ignored:',
      'The system has failed — again — on',
      'Accountability starts with naming:',
    ],
    body: [
      '{topic} is not just a headline. It is a mirror held up to structures that have failed for generations. How long do we look away?',
      '{topic} demands more than sympathy. It demands structural accountability. Dr Ambedkar built a Constitution for this exact reason.',
      'When {topic} happens, silence is complicity. Our Constitution grants us rights — and the duty to defend them.',
    ],
    cta: {
      engage:       'Demand accountability. Do not stay silent. ✊',
      action:       'This is unacceptable. Raise your voice. #JaiBhim',
      institutional:'Use the legal framework. File complaints. Demand justice.',
      educational:  'Know your rights. Question everything.',
    },
    hashtags: (t) => `#JaiBhim #Ambedkar #Accountability #DalitRights #${hashtagify(t)}`,
  },
};

const hashtagify = (raw) =>
  (raw || '')
    .trim()
    .split(/\s+/)
    .map((w) => w.replace(/[^a-zA-Z0-9ऀ-ॿ]/g, ''))
    .filter(Boolean)
    .map((w, i) => (i === 0 ? w : capitalize(w)))
    .join('');

function buildEnglish(topic, tone, length, cta) {
  const T = ENGLISH[tone] ?? ENGLISH.Professional;
  const opener = pick(T.opener);
  const body = pick(T.body).replace('{topic}', topic);
  const closer = T.cta[cta] ?? T.cta.engage;
  const tags = typeof T.hashtags === 'function' ? T.hashtags(topic) : T.hashtags;

  if (length === 'short') {
    return [`${opener} ${topic}.`, '', body.split('.')[0] + '.', '', closer, '', tags].join('\n');
  }
  if (length === 'long') {
    const body2 = pick(T.body).replace('{topic}', topic);
    return [`${opener} ${topic}.`, '', body, '', body2, '', closer, '', tags].join('\n');
  }
  return [`${opener} ${topic}.`, '', body, '', closer, '', tags].join('\n');
}

// ── Public API ─────────────────────────────────────────────────────────────────

/**
 * Generate a social post.
 * @param {object} opts
 * @param {string} opts.topic         - The article topic/headline
 * @param {string} opts.tone          - UI-selected tone (fallback if no preference)
 * @param {object} [opts.preferences] - User's saved profile answers { question_id: answer }
 */
export function generateSocialPost({ topic, tone, preferences = {} }) {
  const t = normalizeTopic(topic);
  const effectiveTone   = resolveTone(tone, preferences.profile_tone);
  const effectiveLength = resolveLength(preferences.profile_content_length);
  const effectiveCta    = resolveCta(preferences.profile_call_to_action);

  if (isHindi(t)) {
    return buildHindi(t, effectiveTone, effectiveLength, effectiveCta);
  }
  return buildEnglish(t, effectiveTone, effectiveLength, effectiveCta);
}
