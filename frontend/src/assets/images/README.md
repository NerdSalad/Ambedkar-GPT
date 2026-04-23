# Ambedkar GPT — Image Assets

Drop the two image files into **this folder** (`src/assets/images/`) using the exact filenames below.
Once present, they will be picked up automatically — no code changes needed.

---

## Expected Files

| Filename                | Used on     | Description                              | Recommended Dimensions |
|-------------------------|-------------|------------------------------------------|------------------------|
| `ambedkar-portrait.jpg` | Login page  | AI-illustrated portrait of Dr. Ambedkar  | 480 × 560 px (3:3.5 ratio, portrait) |
| `ambedkar-statue.jpg`   | Signup page | Bronze statue of Dr. Ambedkar            | 360 × 480 px (3:4 ratio, portrait)   |

---

## Notes

- **Format**: JPEG or PNG both work. Rename to the exact filename above.
- **Aspect ratio**: The image slot uses a fixed aspect ratio container (`aspect-[3/4]`), so any portrait-oriented image will fill it cleanly.
- **No code change required**: BrandPanel.jsx uses a try/catch import fallback. If the file is missing it shows a styled placeholder; once you add the file the real image appears on next `npm run dev` restart.
- **Performance tip**: Compress images to ≤ 200 KB before dropping them in.
