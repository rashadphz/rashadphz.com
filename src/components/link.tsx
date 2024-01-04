import React, { FC } from "react";
import NextLink from "next/link";
import { cn } from "@/lib/utils";

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const Link: FC<LinkProps> = ({ href, children, className }) => {
  const isExternal = href.startsWith("http");
  return (
    <NextLink
      href={href}
      className={cn(
        "underline underline-offset-4 decoration-muted-foreground/50 text-foreground font-medium",
        className
      )}
      target={isExternal ? "_blank" : undefined}
    >
      {children}
    </NextLink>
  );
};

export default Link;
