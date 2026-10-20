import { useState } from "react";

import Header from "../components/Header";
import Hero from "../components/Hero";
import TextInputCard from "../components/TextInputCard";
import AnalysisOverview from "../components/AnalysisOverview";
import AnalysisResults from "../components/AnalysisResults";
import Footer from "../components/Footer";

import { analyzeText } from "../services/analyzerService";
import type { AnalysisResult } from "../types/analysis";

export default function TextAnalyzer() {
  const [text, setText] = useState("");

  const [result, setResult] = useState<AnalysisResult | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // Runs whenever text changes
  const handleTextChange = (newText: string) => {
    setText(newText);
    setError("");
  };

  // Runs when Analyze Text is clicked
  const handleAnalyze = async () => {
    // Check empty input
    if (!text.trim()) {
      setError("Please enter Burmese text.");
      return;
    }

    try {
      // Start loading
      setLoading(true);

      setError("");

      // Get analysis result
      const analysisResult = await analyzeText(text);

      // Save result
      setResult(analysisResult);
    } catch {
      setError("Something went wrong while analyzing the text.");
    } finally {
      // Stop loading
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFAF0]">
      <Header />

      <Hero />

      <main
        className="
          mx-auto
          grid
          max-w-7xl
          grid-cols-1
          gap-5
          px-6
          py-6
          lg:grid-cols-[minmax(0,2.2fr)_minmax(320px,0.9fr)]
        "
      >
        {/* LEFT SIDE */}

        <div className="space-y-5">
          <TextInputCard
            text={text}
            loading={loading}
            error={error}
            onTextChange={handleTextChange}
            onAnalyze={handleAnalyze}
          />

          {/* Only show results after analysis */}

          {result && <AnalysisResults result={result} />}
        </div>

        {/* RIGHT SIDE */}

        <div className="lg:self-start">
          <AnalysisOverview result={result} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
