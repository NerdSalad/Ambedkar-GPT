export default function ContactForm() {
  return (
    <form className="grid gap-4 md:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
      <label className="flex flex-col gap-2">
        <span className="text-sm text-[#c5d2eb]">Name</span>
        <input
          className="h-12 rounded-lg border border-[#24314c] bg-[#0f1629] px-4 text-white outline-none focus:border-[#4f6bff]"
          type="text"
          placeholder="Your name"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm text-[#c5d2eb]">Email</span>
        <input
          className="h-12 rounded-lg border border-[#24314c] bg-[#0f1629] px-4 text-white outline-none focus:border-[#4f6bff]"
          type="email"
          placeholder="you@example.com"
        />
      </label>

      <label className="flex flex-col gap-2 md:col-span-2">
        <span className="text-sm text-[#c5d2eb]">Message</span>
        <textarea
          className="min-h-36 rounded-lg border border-[#24314c] bg-[#0f1629] px-4 py-3 text-white outline-none focus:border-[#4f6bff]"
          placeholder="Tell us what you need..."
        />
      </label>

      <div className="md:col-span-2">
        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center rounded-[10px] bg-gradient-to-r from-[#00b8db] to-[#2b7fff] px-6 text-sm font-medium text-white"
        >
          Send Message
        </button>
      </div>
    </form>
  );
}
