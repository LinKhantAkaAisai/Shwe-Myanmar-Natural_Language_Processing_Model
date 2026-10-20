import {
  BarChart3,
  FileText,
  Layers3,
  Tags,
  AudioWaveform,
} from "lucide-react";

import StatCard from "./StatCard";
import type { AnalysisResult } from "../types/analysis";

interface AnalysisOverviewProps {
  result: AnalysisResult | null;
}

export default function AnalysisOverview({ result }: AnalysisOverviewProps) {
  return (
    <aside
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
            flex h-11 w-11
            items-center justify-center
            rounded-xl
            bg-gradient-to-br
            from-amber-400
            to-amber-600
            text-white
          "
        >
          <BarChart3 size={18} />
        </div>

        <div>
          <h2 className="font-serif text-xl font-bold text-[#3D2914]">
            Analysis Overview
          </h2>

          <p className="text-sm text-stone-500">
            Key statistics of the analyzed text.
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <StatCard
          title="Characters"
          value={result ? String(result.statistics.characters) : "—"}
          icon={FileText}
          variant="gold"
        />

        <StatCard
          title="Syllables"
          value={result ? String(result.statistics.syllables) : "—"}
          icon={AudioWaveform}
          variant="rose"
        />

        <StatCard
          title="Words"
          value={result ? String(result.statistics.words) : "—"}
          icon={Layers3}
          variant="green"
        />
        <StatCard
          title="POS Tags"
          value={result ? String(result.statistics.uniquePosTags) : "—"}
          icon={Tags}
          variant="purple"
        />
      </div>
    </aside>
  );
}
