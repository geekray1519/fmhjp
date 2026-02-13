"use client";

import { useEffect, useState } from "react";
import { X, Keyboard } from "lucide-react";

const SHORTCUTS = [
  { keys: ["⌘", "K"], description: "コマンドパレットを開く" },
  { keys: ["?"], description: "ショートカット一覧を表示" },
  { keys: ["Esc"], description: "ダイアログを閉じる" },
  { keys: ["↑", "↓"], description: "検索結果を移動" },
  { keys: ["Enter"], description: "選択したリソースを開く" },
  { keys: ["/"], description: "検索ページで検索入力にフォーカス" },
];

export function KeyboardShortcuts() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      if (e.key === "?" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={() => setOpen(false)}
      />
      <div className="relative w-full max-w-sm mx-4 bg-background border border-border rounded-2xl shadow-2xl shadow-black/20 animate-scale-in overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Keyboard size={16} className="text-accent" />
            <h2 className="font-semibold text-sm">キーボードショートカット</h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-1 rounded-md text-muted hover:text-foreground transition-colors"
          >
            <X size={16} />
          </button>
        </div>
        <div className="p-4 space-y-3">
          {SHORTCUTS.map((shortcut, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-4"
            >
              <span className="text-sm text-muted">
                {shortcut.description}
              </span>
              <div className="flex items-center gap-1 shrink-0">
                {shortcut.keys.map((key, i) => (
                  <span key={i}>
                    <kbd className="inline-flex items-center justify-center min-w-[24px] px-1.5 py-0.5 text-[10px] font-mono bg-card border border-border rounded text-foreground">
                      {key}
                    </kbd>
                    {i < shortcut.keys.length - 1 && (
                      <span className="text-[10px] text-muted mx-0.5">+</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="px-5 py-3 border-t border-border bg-card/50 text-[10px] text-muted text-center">
          <kbd className="px-1 py-0.5 font-mono bg-background border border-border rounded">?</kbd> で開閉
        </div>
      </div>
    </div>
  );
}
