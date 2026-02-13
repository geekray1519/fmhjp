"use client";

import { Resource } from "@/lib/types";
import { ExternalLink, Star, Copy } from "lucide-react";

interface ResourceCardProps {
  resource: Resource;
}

function getDomain(url: string): string {
  try {
    const hostname = new URL(url).hostname;
    return hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const domain = getDomain(resource.url);

  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      title={resource.url}
      className={`group block p-4 rounded-xl border border-border bg-card hover:bg-card-hover hover:border-accent/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 card-lift ${resource.starred ? "starred-glow" : ""}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {resource.starred && (
              <Star size={14} className="text-amber-400 fill-amber-400 shrink-0" />
            )}
            <h3 className="font-semibold text-sm group-hover:text-accent transition-colors truncate">
              {resource.name}
            </h3>
          </div>
          {resource.description && (
            <p className="mt-1 text-xs text-muted leading-relaxed line-clamp-2">
              {resource.description}
            </p>
          )}
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            {domain && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] rounded-full bg-card-hover text-muted border border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://www.google.com/s2/favicons?domain=${domain}&sz=16`}
                  alt=""
                  className="favicon-img"
                  loading="lazy"
                />
                {domain}
              </span>
            )}
            {resource.mirrors && resource.mirrors.length > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] rounded-full bg-card-hover text-muted border border-border">
                <Copy size={8} />
                ミラー: {resource.mirrors.length}
              </span>
            )}
            {resource.tags && resource.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-accent/10 text-accent"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <ExternalLink
          size={14}
          className="text-muted/70 group-hover:text-accent transition-colors shrink-0 mt-1"
        />
      </div>
    </a>
  );
}
