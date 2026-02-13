"use client";

import { Resource } from "@/lib/types";
import { ExternalLink, Star } from "lucide-react";

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block p-4 rounded-xl border border-border bg-card hover:bg-card-hover hover:border-accent/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5"
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
          <p className="mt-1 text-xs text-muted leading-relaxed line-clamp-2">
            {resource.description}
          </p>
          {resource.tags && resource.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {resource.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-accent/10 text-accent"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <ExternalLink
          size={14}
          className="text-muted group-hover:text-accent transition-colors shrink-0 mt-1"
        />
      </div>
    </a>
  );
}
