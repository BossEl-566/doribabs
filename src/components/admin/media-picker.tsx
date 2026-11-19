
"use client";

import { useEffect } from "react";
import { Images, X } from "lucide-react";

import MediaLibrary from "./media-library";
import type { MediaAsset } from "@/lib/media";

type MediaPickerProps = {
  open: boolean;
  onClose: () => void;
  onSelect: (asset: MediaAsset) => void;
};

export default function MediaPicker({
  open,
  onClose,
  onSelect,
}: MediaPickerProps) {
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      <button
        type="button"
        aria-label="Close media picker"
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/70"
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="media-picker-heading"
        className="relative z-10 max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-2xl bg-[#F5F7F5] p-5 shadow-2xl sm:p-8"
      >
        <div className="mb-7 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-green-50 p-3 text-green-700">
              <Images size={23} />
            </div>

            <div>
              <h2
                id="media-picker-heading"
                className="text-xl font-bold text-slate-950"
              >
                Media Library
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Choose an existing school photograph
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close media picker"
            className="rounded-xl border border-slate-200 bg-white p-3 text-slate-600 hover:bg-slate-50"
          >
            <X size={20} />
          </button>
        </div>

        <MediaLibrary
          mode="picker"
          onSelect={(asset) => {
            onSelect(asset);
            onClose();
          }}
        />
      </section>
    </div>
  );
}
