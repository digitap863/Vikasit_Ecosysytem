"use client";

import React from "react";
import Link from "next/link";
import { motion, HTMLMotionProps } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

export type ButtonVariant =
  | "primary"
  | "dark"
  | "outline"
  | "outline-emerald"
  | "ghost";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd"
  > {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  target?: string;
  rel?: string;
  showArrow?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
}

const baseVariantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#056826] text-white border border-transparent shadow-md hover:shadow-lg group-hover:text-white",
  dark:
    "bg-[#161616] text-[#EAE3D2] border border-transparent shadow-md hover:shadow-lg group-hover:text-white",
  outline:
    "bg-transparent border border-[#2B2B2C] text-[#1A1A1A] group-hover:text-white shadow-sm hover:shadow-md",
  "outline-emerald":
    "bg-black/40 border border-emerald-500/70 text-white shadow-md group-hover:text-white",
  ghost:
    "bg-transparent border border-transparent text-[#1A1A1A] group-hover:text-white",
};

const fillOverlayStyles: Record<ButtonVariant, string> = {
  primary: "bg-[#04521e]",
  dark: "bg-black",
  outline: "bg-[#161616]",
  "outline-emerald": "bg-emerald-600",
  ghost: "bg-[#161616]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-5 py-2 text-xs rounded-full",
  md: "px-7 py-2.5 text-sm rounded-full sm:rounded-2xl",
  lg: "px-8 py-3.5 sm:py-4 text-base rounded-2xl sm:rounded-3xl",
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  target,
  rel,
  showArrow = false,
  icon,
  fullWidth = false,
  className = "",
  children,
  onClick,
  type = "button",
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = `group relative overflow-hidden inline-flex items-center justify-center gap-2.5 font-bold font-sans tracking-wide transition-all duration-300 cursor-pointer select-none ${
    baseVariantStyles[variant]
  } ${sizeStyles[size]} ${fullWidth ? "w-full" : ""} ${
    disabled ? "opacity-50 pointer-events-none" : ""
  } ${className}`;

  const content = (
    <>
      {/* Smooth Sliding Background Fill Overlay */}
      <span
        className={`absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-400 ease-out pointer-events-none ${fillOverlayStyles[variant]}`}
      />

      {/* Relative Foreground Content with white text transition */}
      <span className="relative z-10 inline-flex items-center justify-center gap-2.5 transition-colors duration-300 text-current group-hover:text-white">
        <span>{children}</span>
        {icon ? (
          <span className="transition-transform duration-300 group-hover:translate-x-1 shrink-0">
            {icon}
          </span>
        ) : showArrow ? (
          <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 shrink-0" />
        ) : null}
      </span>
    </>
  );

  if (href) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={fullWidth ? "w-full" : "inline-block"}
      >
        <Link href={href} target={target} rel={rel} onClick={onClick as any} className={baseClasses}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      {...(props as HTMLMotionProps<"button">)}
    >
      {content}
    </motion.button>
  );
}
