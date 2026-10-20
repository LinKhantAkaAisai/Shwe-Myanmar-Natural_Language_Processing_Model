export default function Hero() {
  return (
    <section
      className="
        relative overflow-hidden
        border-b border-amber-100
        bg-gradient-to-b
        from-[#FFF8E8]
        via-[#FFFAF2]
        to-[#FFFDF8]
      "
    >
      {/* Decorative background */}
      <div className="absolute -left-20 top-8 h-52 w-52 rounded-full bg-amber-200/20 blur-3xl" />

      <div className="absolute -right-16 top-4 h-64 w-64 rounded-full bg-yellow-200/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-12 text-center">
        {/* <p className="text-xs font-semibold tracking-[0.28em] text-amber-700">
          AI-POWERED BURMESE LANGUAGE ANALYSIS
        </p> */}

        <h2
          className="
            mt-3
            font-serif
            text-4xl
            font-bold
            text-[#3D2914]
            md:text-5xl
          "
        >
          Shwe Myanmar
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-stone-600">
          Explore Burmese text with syllable segmentation, word segmentation,
          POS tagging and linguistic insights.
        </p>
      </div>
    </section>
  );
}
