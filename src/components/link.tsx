import React, { FC } from "react";
import NextLink from "next/link";

interface LinkProps {
  href: string;
  children: React.ReactNode;
}

const Link: FC<LinkProps> = ({ href, children }) => {
  const isExternal = href.startsWith("http");
  return (
    <div className="prose dark:prose-invert">
      <NextLink
        href={href}
        className=""
        target={isExternal ? "_blank" : undefined}
      >
        {children}
      </NextLink>
    </div>
  );
};

export default Link;
