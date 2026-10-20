import { ArrowRight, PenLine, Sparkles } from "lucide-react";

interface TextInputCardProps {
  text: string;
  loading: boolean;
  error: string;
  onTextChange: (text: string) => void;
  onAnalyze: () => void;
}

const examples = [
  "ကျွန်တော်မနက်ဖြန်ကျောင်းသွားမယ်။",
  "မြန်မာစာကိုလေ့လာတယ်။",
  "အခုမိုးရွာနေတယ်။",
];

export default function TextInputCard({
  text,
  loading,
  error,
  onTextChange,
  onAnalyze,
}: TextInputCardProps) {
  return (
    <section
      id="analyzer"
      className="
        rounded-2xl
        border border-amber-100
        bg-white
        p-5
        shadow-[0_6px_25px_rgba(120,80,10,0.05)]
      "
    >
      <div className="flex items-center gap-3">
        <div
          className="
            flex h-11 w-11 items-center justify-center
            rounded-xl
            bg-gradient-to-br from-amber-400 to-amber-600
            text-white
          "
        >
          <PenLine size={20} />
        </div>

        <div>
          <h2 className="font-serif text-xl font-bold text-[#3D2914]">
            Enter Burmese Text
          </h2>

          <p className="text-sm text-stone-500">
            Type or paste your Burmese text below to analyze.
          </p>
        </div>
      </div>

      <div className="relative mt-4">
        <textarea
          value={text}
          onChange={(event) => onTextChange(event.target.value)}
          maxLength={1000}
          rows={5}
          placeholder="မြန်မာစာ ရိုက်ထည့်ပါ..."
          className="
            w-full resize-none
            rounded-xl
            border border-amber-200
            bg-[#FFFEFB]
            p-5 pb-10
            text-lg leading-8
            text-stone-800
            outline-none
            transition
            placeholder:text-stone-400
            focus:border-amber-500
            focus:ring-4
            focus:ring-amber-100
          "
        />

        <span className="absolute bottom-4 right-4 text-xs text-stone-400">
          {text.length}/1000
        </span>
      </div>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      <div className="mt-3 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="mb-2 text-xs font-medium text-stone-600">
            Try an example:
          </p>

          <div className="flex flex-wrap gap-2">
            {examples.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => onTextChange(example)}
                className="
                  rounded-lg
                  border border-amber-100
                  bg-amber-50
                  px-4 py-2
                  text-sm text-stone-700
                  transition
                  hover:border-amber-300
                  hover:bg-amber-100
                "
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={onAnalyze}
          disabled={loading}
          className="
            flex shrink-0 items-center justify-center gap-2
            rounded-xl
            bg-gradient-to-r
            from-amber-400 to-amber-600
            px-7 py-3
            font-semibold text-white
            shadow-sm transition
            hover:-translate-y-0.5
            hover:shadow-md
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {loading ? "Analyzing..." : "Analyze Text"}

          {!loading && <ArrowRight size={17} />}
        </button>
      </div>
    </section>
  );
}
