# Ambedkar GPT — Frontend

React + Vite + Tailwind CSS authentication UI (Login & Signup pages).

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:5173 — lands on `/login`. `/signup` is reachable via the "Sign Up" link.

## Dropping in the Ambedkar images

See [`src/assets/images/README.md`](src/assets/images/README.md) for exact filenames and dimensions.

Drop these two files into `src/assets/images/`:

| File                    | Page        |
|-------------------------|-------------|
| `ambedkar-portrait.jpg` | Login page  |
| `ambedkar-statue.jpg`   | Signup page |

Restart `npm run dev` after adding files. The layout will not shift — image slots are fixed aspect-ratio containers.

## Project structure

```
src/
  components/
    AuthLayout.jsx          split-screen wrapper
    BrandPanel.jsx          logo + image + quote + tagline
    BackgroundDecorations   SVG wave/dot overlays
    AnimatedInput.jsx       email/phone with typewriter placeholder
    PasswordInput.jsx       password field with show/hide toggle
    GoogleButton.jsx        Google OAuth button (stub)
    PrimaryButton.jsx       gradient CTA button
    ImagePlaceholder.jsx    fallback when image is missing
  pages/
    Login.jsx
    Signup.jsx
  assets/images/            drop Ambedkar images here
  App.jsx                   router
  index.css                 Tailwind v4 + theme tokens
```
