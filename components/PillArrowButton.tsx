"use client";

import Link from "next/link";

type PillArrowButtonProps = {
  href: string;
  label: string;
  id?: string;
  className?: string;
  tone?: "light" | "dark";
};

export function PillArrowButton({
  href,
  label,
  id,
  className = "",
  tone = "dark",
}: PillArrowButtonProps) {
  const isLight = tone === "light";
  const surfaceClass = isLight ? "bg-white" : "bg-[#273149]";
  const textClass = isLight ? "text-[#273149]" : "text-white";

  return (
    <Link
      id={id}
      href={href}
      className={`group inline-flex items-center font-sans text-[clamp(0.8rem,1.08vw,0.95rem)] font-medium ${textClass} ${className}`.trim()}
    >
      <span
        className={`inline-flex items-center rounded-full px-[clamp(1.05rem,1.95vw,1.4rem)] py-[clamp(0.44rem,0.98vw,0.66rem)] ${surfaceClass}`}
      >
        {label}
      </span>
      <span
        className={`ml-[clamp(0.32rem,0.6vw,0.5rem)] inline-flex h-[clamp(2rem,3vw,2.45rem)] w-[clamp(2rem,3vw,2.45rem)] flex-shrink-0 items-center justify-center rounded-full transition-[margin-left] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:ml-[-0.6rem] ${surfaceClass}`}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-[clamp(0.92rem,1.32vw,1.1rem)] w-[clamp(0.92rem,1.32vw,1.1rem)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-[24deg]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M7 17L17 7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}
