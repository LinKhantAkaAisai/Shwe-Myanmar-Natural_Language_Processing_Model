import type { ReactNode } from "react";
import { useState } from "react";

import type { AnalysisResult } from "../types/analysis";
import { getPosLabel } from "../utils/posLabels";
import {
  AudioWaveform,
  Check,
  Copy,
  FileText,
  Layers3,
  Tag,
} from "lucide-react";

/* =========================================================
   POS COLOR FUNCTION
========================================================= */

function getPosColor(tag: string) {
  switch (tag.toLowerCase()) {
    case "n":
      return `
        border-blue-200
        bg-blue-50
        text-blue-700
      `;

    case "v":
      return `
        border-emerald-200
        bg-emerald-50
        text-emerald-700
      `;

    case "pron":
      return `
        border-violet-200
        bg-violet-50
        text-violet-700
      `;

    case "adj":
      return `
        border-pink-200
        bg-pink-50
        text-pink-700
      `;

    case "adv":
      return `
        border-orange-200
        bg-orange-50
        text-orange-700
      `;

    case "conj":
      return `
        border-yellow-200
        bg-yellow-50
        text-yellow-700
      `;

    case "ppm":
      return `
        border-purple-200
        bg-purple-50
        text-purple-700
      `;

    case "part":
      return `
        border-amber-200
        bg-amber-50
        text-amber-700
      `;

    case "num":
      return `
        border-cyan-200
        bg-cyan-50
        text-cyan-700
      `;

    case "punc":
      return `
        border-stone-200
        bg-stone-50
        text-stone-600
      `;

    case "abb":
      return `
        border-slate-200
        bg-slate-50
        text-slate-700
      `;

    case "fw":
      return `
        border-indigo-200
        bg-indigo-50
        text-indigo-700
      `;

    case "int":
      return `
        border-rose-200
        bg-rose-50
        text-rose-700
      `;

    case "sb":
      return `
        border-neutral-200
        bg-neutral-50
        text-neutral-700
      `;

    case "tn":
      return `
        border-teal-200
        bg-teal-50
        text-teal-700
      `;

    default:
      return `
        border-stone-200
        bg-stone-50
        text-stone-700
      `;
  }
}

/* =========================================================
   MAIN COMPONENT
========================================================= */
interface AnalysisResultsProps {
  result: AnalysisResult;
}

export default function AnalysisResults({ result }: AnalysisResultsProps) {
  const { syllables, words, posTags } = result;
  return (
    <section
      className="
        rounded-2xl
        border
        border-amber-100
        bg-white
        p-5
        shadow-[0_6px_25px_rgba(120,80,10,0.05)]
      "
    >
      {/* =====================================================
          ANALYSIS RESULTS HEADER
      ====================================================== */}

      <div className="mb-5 flex items-center gap-3">
        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-gradient-to-br
            from-amber-400
            to-amber-600
            text-white
            shadow-sm
          "
        >
          <FileText size={20} />
        </div>

        <div>
          <h2
            className="
              font-serif
              text-xl
              font-bold
              text-[#3D2914]
            "
          >
            Analysis Results
          </h2>

          <p className="mt-0.5 text-sm text-stone-500">
            Linguistic analysis of the submitted Burmese text.
          </p>
        </div>
      </div>

      {/* =====================================================
          SYLLABLE SEGMENTATION
      ====================================================== */}

      <ResultSection
        title="Syllable Segmentation"
        description="Text segmented into individual Burmese syllables."
        icon={<AudioWaveform size={18} />}
        iconStyle="
          bg-amber-100
          text-amber-600
        "
        copyText={syllables.join(" | ")}
      >
        <div className="flex flex-wrap gap-2">
          {syllables.map((syllable, index) => (
            <span
              key={`${syllable}-${index}`}
              className="
                rounded-lg
                border
                border-amber-100
                bg-[#FFF8E8]
                px-4
                py-2
                text-[15px]
                text-stone-800
                transition
                hover:border-amber-300
                hover:bg-amber-100
              "
            >
              {syllable}
            </span>
          ))}
        </div>
      </ResultSection>

      {/* =====================================================
          WORD SEGMENTATION
      ====================================================== */}

      <ResultSection
        title="Word Segmentation"
        description="Syllables grouped into meaningful Burmese words."
        icon={<Layers3 size={18} />}
        iconStyle="
          bg-blue-100
          text-blue-600
        "
        copyText={words.join(" | ")}
      >
        <div className="flex flex-wrap gap-2">
          {words.map((word, index) => (
            <span
              key={`${word}-${index}`}
              className="
                rounded-lg
                border
                border-blue-100
                bg-blue-50
                px-4
                py-2
                text-[15px]
                text-blue-900
                transition
                hover:border-blue-300
                hover:bg-blue-100
              "
            >
              {word}
            </span>
          ))}
        </div>
      </ResultSection>

      {/* =====================================================
          POS TAGGING
      ====================================================== */}

      <ResultSection
        title="POS Tagging"
        description="Each segmented word with its predicted part-of-speech tag."
        icon={<Tag size={18} />}
        iconStyle="
          bg-violet-100
          text-violet-600
        "
        copyText={posTags.map((item) => `${item.word}/${item.tag}`).join(" ")}
      >
        <div className="flex flex-wrap gap-3">
          {posTags.map((item, index) => (
            <div
              key={`${item.word}-${index}`}
              className={`
                min-w-[105px]
                rounded-xl
                border
                px-4
                py-3
                text-center
                transition
                hover:-translate-y-0.5
                hover:shadow-sm

                ${getPosColor(item.tag)}
              `}
            >
              {/* Burmese word */}

              <p
                className="
                  text-[15px]
                  font-medium
                "
              >
                {item.word}
              </p>

              {/* POS tag */}

              <p
                className="
                  mt-1
                  text-[10px]
                  font-bold
                  tracking-wider
                "
              >
                {getPosLabel(item.tag)}
              </p>
            </div>
          ))}
        </div>
      </ResultSection>
    </section>
  );
}

/* =========================================================
   RESULT SECTION COMPONENT
========================================================= */

interface ResultSectionProps {
  title: string;
  description: string;
  children: ReactNode;
  icon: ReactNode;
  iconStyle: string;
  copyText: string;
}

function ResultSection({
  title,
  description,
  children,
  icon,
  iconStyle,
  copyText,
}: ResultSectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyText);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };
  return (
    <div
      className="
        mb-3
        rounded-xl
        border
        border-stone-100
        bg-[#FFFEFC]
        p-4
        last:mb-0
      "
    >
      {/* Section Header */}

      <div
        className="
          mb-4
          flex
          flex-col
          gap-3
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        {/* Left */}

        <div className="flex items-center gap-3">
          <div
            className={`
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full

              ${iconStyle}
            `}
          >
            {icon}
          </div>

          <div>
            <h3
              className="
                text-sm
                font-semibold
                text-stone-800
              "
            >
              {title}
            </h3>

            <p
              className="
                mt-0.5
                text-xs
                text-stone-500
              "
            >
              {description}
            </p>
          </div>
        </div>

        {/* Copy Button */}

        <button
          type="button"
          onClick={handleCopy}
          className="
            flex
            shrink-0
            items-center
            justify-center
            gap-2
            self-start
            rounded-lg
            border
            border-amber-100
            bg-amber-50
            px-3
            py-2
            text-xs
            font-medium
            text-stone-600
            transition
            hover:border-amber-200
            hover:bg-amber-100
            hover:text-amber-800
            sm:self-auto
          "
        >
          {copied ? (
            <>
              <Check size={14} />
              Copied!
            </>
          ) : (
            <>
              <Copy size={14} />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Result Content */}

      <div>{children}</div>
    </div>
  );
}
