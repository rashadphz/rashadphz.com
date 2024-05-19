import React, { FC } from "react";
import NextLink from "next/link";
import { cn } from "@/lib/utils";
import { ArrowTopRightIcon, ExternalLinkIcon } from "@radix-ui/react-icons";

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  hideArrow?: boolean;
}

const Link: FC<LinkProps> = ({
  href,
  children,
  className,
  hideArrow = false,
}) => {
  const isExternal = href.startsWith("http");
  return (
    <NextLink
      href={href}
      className={cn(
        "underline underline-offset-4 decoration-accent-foreground/80 text-foreground font-medium decoration-[2px] hover:decoration-accent-foreground hover:text-accent-foreground",
        className
      )}
      target={isExternal ? "_blank" : undefined}
    >
      {children}
      {isExternal && !hideArrow && (
        <ArrowTopRightIcon className="w-3 h-3 inline-block ml-1 mb-1" />
      )}
    </NextLink>
  );
};

export default Link;
