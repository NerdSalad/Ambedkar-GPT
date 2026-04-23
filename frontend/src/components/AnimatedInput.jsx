import { useState, useEffect, useRef } from 'react';

/**
 * AnimatedInput — email/phone input with typewriter placeholder rotation.
 *
 * Behavior:
 *  - When empty and not focused, cycles through `placeholders` list.
 *  - Each transition: deletes current text char-by-char (40ms/char),
 *    then types the next one char-by-char (40ms/char).
 *  - Freezes while focused or when user has typed something.
 *  - Resumes on blur if value is still empty.
 */
export default function AnimatedInput({
  placeholders = ['Enter your Email', 'Enter your Phone No.'],
  value,
  onChange,
  label = 'Email / Phone No.',
  error,
}) {
  const [displayedPlaceholder, setDisplayedPlaceholder] = useState(placeholders[0]);
  const [isFocused, setIsFocused] = useState(false);

  const animatingRef = useRef(false);
  const pauseRef = useRef(false);       // true while user is interacting
  const currentIndexRef = useRef(0);
  const timeoutRef = useRef(null);

  const CHAR_DELAY = 40;      // ms per character
  const HOLD_DURATION = 2500; // ms to display before deleting

  function clearTimer() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }

  function typePhrase(phrase, charIndex = 0) {
    if (pauseRef.current) return;
    if (charIndex <= phrase.length) {
      setDisplayedPlaceholder(phrase.slice(0, charIndex));
      timeoutRef.current = setTimeout(() => typePhrase(phrase, charIndex + 1), CHAR_DELAY);
    } else {
      // Fully typed — hold, then start deleting
      timeoutRef.current = setTimeout(() => deletePhrase(phrase, phrase.length), HOLD_DURATION);
    }
  }

  function deletePhrase(phrase, charIndex) {
    if (pauseRef.current) return;
    if (charIndex >= 0) {
      setDisplayedPlaceholder(phrase.slice(0, charIndex));
      timeoutRef.current = setTimeout(() => deletePhrase(phrase, charIndex - 1), CHAR_DELAY);
    } else {
      // Fully deleted — advance to next phrase
      currentIndexRef.current = (currentIndexRef.current + 1) % placeholders.length;
      typePhrase(placeholders[currentIndexRef.current]);
    }
  }

  useEffect(() => {
    const shouldAnimate = !isFocused && !value;

    if (shouldAnimate) {
      pauseRef.current = false;
      // Start the cycle from beginning
      clearTimer();
      currentIndexRef.current = 0;
      typePhrase(placeholders[0]);
    } else {
      // Freeze animation
      pauseRef.current = true;
      clearTimer();
      if (!value) {
        // Show the last stable placeholder when focused-but-empty
        setDisplayedPlaceholder(placeholders[currentIndexRef.current]);
      }
    }

    return clearTimer;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, !!value]);

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium" style={{ color: '#e5e7eb' }}>
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={displayedPlaceholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`input-field w-full px-4 py-3 rounded-xl text-sm${error ? ' error' : ''}`}
      />
      {error && (
        <p className="text-xs" style={{ color: '#ef4444' }}>{error}</p>
      )}
    </div>
  );
}
