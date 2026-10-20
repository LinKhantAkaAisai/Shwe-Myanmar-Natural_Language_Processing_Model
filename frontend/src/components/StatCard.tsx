import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  variant: "gold" | "rose" | "green" | "purple";
}

const variants = {
  gold: {
    card: "bg-amber-50/70 border-amber-100",
    icon: "bg-amber-100 text-amber-600",
  },

  rose: {
    card: "bg-rose-50/70 border-rose-100",
    icon: "bg-rose-100 text-rose-500",
  },

  green: {
    card: "bg-emerald-50/70 border-emerald-100",
    icon: "bg-emerald-100 text-emerald-600",
  },

  purple: {
    card: "bg-violet-50/70 border-violet-100",
    icon: "bg-violet-100 text-violet-600",
  },
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  variant,
}: StatCardProps) {
  const style = variants[variant];

  return (
    <div
      className={`
        rounded-xl
        border
        p-4
        ${style.card}
      `}
    >
      <div className="flex items-center gap-3">
        <div
          className={`
            flex h-10 w-10
            items-center justify-center
            rounded-full
            ${style.icon}
          `}
        >
          <Icon size={18} />
        </div>

        <p className="text-sm text-stone-500">{title}</p>
      </div>

      <p className="mt-3 pl-1 font-serif text-3xl font-bold text-[#3D2914]">
        {value}
      </p>
    </div>
  );
}
