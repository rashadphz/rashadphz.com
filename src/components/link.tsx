import React, { FC } from "react";
import NextLink from "next/link";

interface LinkProps {
  href: string;
  children: React.ReactNode;
}

const Link: FC<LinkProps> = ({ href, children }) => {
  const isExternal = href.startsWith("http");
  return (
    <NextLink
      href={href}
      className="underline underline-offset-4 decoration-muted-foreground/50 text-foreground font-medium"
      target={isExternal ? "_blank" : undefined}
    >
      {children}
    </NextLink>
  );
};

export default Link;
