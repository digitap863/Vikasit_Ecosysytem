"use client";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelect,
}: CategoryFilterProps) {
  return (
    <section className="hidden sm:flex w-full items-center justify-start pt-2">
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 w-full">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`px-5 sm:px-6 py-2 rounded-full text-xs sm:text-sm transition-all cursor-pointer font-sans ${
              selectedCategory === cat
                ? "bg-[#006020] text-white font-medium border border-[#006020]"
                : "bg-transparent text-[#1a1a1a] border border-[#333333] font-normal hover:bg-[#006020]/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </section>
  );
}
