export default function SectionHeading({ eyebrow, title, description, centered = false }) {
  return (
    <div className={centered ? 'text-center' : ''}>
      {eyebrow ? (
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-[#64b5ff]">{eyebrow}</p>
      ) : null}
      <h1 className="text-4xl font-semibold text-white md:text-5xl">{title}</h1>
      {description ? (
        <p className={`mt-5 text-lg leading-8 text-[#d0d9ea] ${centered ? 'mx-auto max-w-3xl' : 'max-w-4xl'}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
