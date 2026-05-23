"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type MotionContainerProps = {
  children: ReactNode;
  className?: string;
};

export function MotionContainer({ children, className }: MotionContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}