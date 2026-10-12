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
        "underline underline-offset-[3px] decoration-muted-foreground/40 text-foreground decoration-1 hover:decoration-foreground hover:text-foreground transition-colors duration-300 ease-in-out",
        className
      )}
      target={isExternal ? "_blank" : undefined}
    >
      {children}
      {isExternal && !hideArrow && (
        <ArrowTopRightIcon className="w-3 h-3 inline-block ml-0.5" />
      )}
    </NextLink>
  );
};

export default Link;
