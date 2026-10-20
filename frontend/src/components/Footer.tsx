import { Leaf } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-amber-100 bg-[#FFFEFA]">
      <div
        className="
          mx-auto flex max-w-7xl
          flex-col gap-5
          px-6 py-5
          md:flex-row
          md:items-center
          md:justify-between
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-full
              bg-gradient-to-br
              from-amber-300
              to-amber-600
              text-white
            "
          >
            <Leaf size={18} />
          </div>

          <div>
            <p className="font-serif font-bold text-[#3D2914]">Shwe Myanmar</p>

            <p className="text-[11px] text-stone-500">
              Understand Burmese, Empower Tomorrow
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap gap-6 text-xs text-stone-500">
          <a href="#about" className="hover:text-amber-700">
            About
          </a>

          <a href="#" className="hover:text-amber-700">
            Documentation
          </a>

          <a href="#" className="hover:text-amber-700">
            GitHub
          </a>

          <a href="#" className="hover:text-amber-700">
            Contact
          </a>
        </nav>

        <p className="font-serif italic text-amber-800">
          For a brighter Myanmar
        </p>
      </div>
    </footer>
  );
}
