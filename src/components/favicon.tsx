'use client';

import Image from "next/image";

interface FaviconProps {
  url: string;
  title: string;
}

export default function Favicon({ url, title }: FaviconProps) {
  return (
    <>
      <Image
        src={`https://www.google.com/s2/favicons?domain=${url}&sz=32`}
        alt=""
        className="mt-0.5 w-4 h-4 shrink-0 rounded-sm"
        width={16}
        height={16}
        onError={(e) => {
          // @ts-ignore
          e.target.style.display = 'none';
          // @ts-ignore
          e.target.nextSibling.style.display = 'flex';
        }}
      />
      <div 
        className="hidden mt-0.5 w-4 h-4 shrink-0 bg-accent-foreground text-white text-[10px] items-center justify-center rounded-sm"
        aria-hidden="true"
      >
        {title.charAt(0)}
      </div>
    </>
  );
}
