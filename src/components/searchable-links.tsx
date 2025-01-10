"use client";

import Link from "@/components/link";
import Favicon from "@/components/favicon";
import Fuse from "fuse.js";
import type { FuseResult } from "fuse.js";
import { useState } from "react";
import { z } from "zod";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { LinkType } from "@/app/links/page";

export default function SearchableLinks({ links }: { links: LinkType[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const domainCount = links.reduce((acc, link) => {
    const domain = new URL(link.url).host.replace(/^www\./, "");
    acc[domain] = (acc[domain] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const formatDomain = (domain: string) => {
    return domain.replace(/\.(com|org|io|net)$/, "");
  };

  const domains = Object.keys(domainCount).sort((a, b) => domainCount[b] - domainCount[a]);
  
  const fuse = new Fuse(links, {
    keys: ["title", "url"],
    threshold: 0.3,
  });

  const filteredLinks = searchQuery
    ? fuse.search(searchQuery).map((result: FuseResult<LinkType>) => result.item)
    : links;

  return (
    <div className="flex flex-col">
      <div className="space-y-1 mb-6">
        <h2 className="text-2xl font-bold">links</h2>
        <span className="text-sm">Things I&apos;ve found interesting on the internet.</span>
      </div>
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search links..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 border-accent"
          />
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {domains.slice(0, 5).map((domain) => (
            <button
              key={domain}
              onClick={() => setSearchQuery(domain)}
              className="inline-flex items-center px-2.5 py-1 rounded-full font-mono text-xxs font-medium border border-dashed bg-muted/40 transition-colors hover:bg-muted/60"
            >
              <Favicon url={`https://${domain}`} title={domain} />
              <span className="ml-1.5">{formatDomain(domain)}</span>
            </button>
          ))}
        </div>
      </div>
      {filteredLinks.length > 0 ? (
        <ul className="space-y-4">
          {filteredLinks.map((link: LinkType) => (
            <li key={link.url}>
            <Link href={link.url} key={link.url} className="no-underline" hideArrow>
              <div className="flex items-center gap-2">
                <Favicon url={link.url} title={link.title} />
                <div className="no-underline text-sm">{link.title}
                    </div>
            <div className="text-xxs text-muted-foreground font-mono">
                [{new URL(link.url).host.replace(/^www\./, "")}]
            </div>
                </div>
            </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted-foreground">No links found.</p>
      )}
    </div>
  );
} 