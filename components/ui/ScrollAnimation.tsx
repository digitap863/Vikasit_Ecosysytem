"use client";

import React from "react";
import { motion, Variants, HTMLMotionProps } from "framer-motion";

export type AnimationVariant =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "zoom-in"
  | "scale-up"
  | "fade";

export interface ScrollAnimationProps {
  children: React.ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  amount?: number | "some" | "all";
  className?: string;
  staggerChildren?: number;
}

export default function ScrollAnimation({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.7,
  distance = 35,
  once = true,
  amount = 0.15,
  className = "",
  staggerChildren,
}: ScrollAnimationProps) {
  const getVariants = (): Variants => {
    switch (variant) {
      case "fade-up":
        return {
          hidden: { opacity: 0, y: distance },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration,
              delay,
              ease: [0.215, 0.61, 0.355, 1], // easeOutCubic
              ...(staggerChildren && { staggerChildren, delayChildren: delay }),
            },
          },
        };
      case "fade-down":
        return {
          hidden: { opacity: 0, y: -distance },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration,
              delay,
              ease: [0.215, 0.61, 0.355, 1],
              ...(staggerChildren && { staggerChildren, delayChildren: delay }),
            },
          },
        };
      case "fade-left":
        return {
          hidden: { opacity: 0, x: distance },
          visible: {
            opacity: 1,
            x: 0,
            transition: {
              duration,
              delay,
              ease: [0.215, 0.61, 0.355, 1],
              ...(staggerChildren && { staggerChildren, delayChildren: delay }),
            },
          },
        };
      case "fade-right":
        return {
          hidden: { opacity: 0, x: -distance },
          visible: {
            opacity: 1,
            x: 0,
            transition: {
              duration,
              delay,
              ease: [0.215, 0.61, 0.355, 1],
              ...(staggerChildren && { staggerChildren, delayChildren: delay }),
            },
          },
        };
      case "zoom-in":
      case "scale-up":
        return {
          hidden: { opacity: 0, scale: 0.92 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: {
              duration,
              delay,
              ease: [0.215, 0.61, 0.355, 1],
              ...(staggerChildren && { staggerChildren, delayChildren: delay }),
            },
          },
        };
      case "fade":
      default:
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              duration,
              delay,
              ease: "easeOut",
              ...(staggerChildren && { staggerChildren, delayChildren: delay }),
            },
          },
        };
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={getVariants()}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Child item component for staggered lists/grids
export function ScrollAnimationItem({
  children,
  className = "",
  variant = "fade-up",
  distance = 30,
  duration = 0.6,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: AnimationVariant;
  distance?: number;
  duration?: number;
}) {
  const itemVariants: Variants = {
    hidden:
      variant === "fade-up"
        ? { opacity: 0, y: distance }
        : variant === "fade-down"
        ? { opacity: 0, y: -distance }
        : variant === "fade-left"
        ? { opacity: 0, x: distance }
        : variant === "fade-right"
        ? { opacity: 0, x: -distance }
        : variant === "zoom-in"
        ? { opacity: 0, scale: 0.92 }
        : { opacity: 0 },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
