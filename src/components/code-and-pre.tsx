//github.com/hasparus/zaduma/blob/ff292ff824a333ca14488227a934b8a58b67edc1/src/lib/prose/code-and-pre.module.css

import { cn } from "@/lib/utils";
import React from "react";

export function Code({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      className={cn(
        "font-mono text-[0.97em] [-0.02em] before:content-['`'] after:content-['`'] before:text-gray-400 after:text-gray-400 before:font-black after:font-black dark:before:text-gray-600 dark:after:text-gray-600",
        className
      )}
      {...props}
    />
  );
}

export function Pre({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <pre
      className={cn(
        "md:rounded-md text-sm -mx-4 p-4 overflow-x-auto [padding-right:calc(1rem-1px)] [tab-size:2]",
        className
      )}
      {...props}
    />
  );
}
