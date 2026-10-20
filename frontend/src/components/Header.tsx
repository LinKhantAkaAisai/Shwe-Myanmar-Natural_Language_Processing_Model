import { Leaf } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b border-amber-100 bg-[#FFFEFA]">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="
              flex h-11 w-11 items-center justify-center
              rounded-full
              bg-gradient-to-br from-amber-300 to-amber-600
              text-white
              shadow-sm
            "
          >
            <Leaf size={23} />
          </div>

          <div>
            <h1 className="font-serif text-2xl font-bold leading-none text-[#3D2914]">
              Shwe Myanmar
            </h1>

            <p className="mt-1 text-[11px] tracking-wide text-stone-500">
              Analyze • Learn • Preserve
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden items-center gap-3 md:flex">
          <a
            href="#analyzer"
            className="
              rounded-full
              bg-amber-100/70
              px-6 py-2.5
              text-sm font-medium
              text-amber-900
            "
          >
            Text Analyzer
          </a>

          <a
            href="#dataset"
            className="
              rounded-full px-5 py-2.5
              text-sm text-stone-600
              transition
              hover:bg-amber-50
              hover:text-amber-800
            "
          >
            Dataset
          </a>

          <a
            href="#about"
            className="
              rounded-full px-5 py-2.5
              text-sm text-stone-600
              transition
              hover:bg-amber-50
              hover:text-amber-800
            "
          >
            About
          </a>
        </nav>
      </div>
    </header>
  );
}
