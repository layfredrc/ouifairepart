"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { InvitationCanvas } from "@/components/invitation/InvitationCanvas";
import { demoDraft } from "@/lib/data/demoDraft";
import { useStudioStore } from "@/lib/store/useStudioStore";

export function MobilePreviewSheet() {
  const [open, setOpen] = useState(false);
  const { draft } = useStudioStore();
  const effectiveDraft = draft.designId ? draft : demoDraft;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-30 rounded-full bg-ink px-5 py-3 text-sm text-paper shadow-lg lg:hidden"
      >
        Voir l&rsquo;aperçu
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-paper lg:hidden"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 z-10 rounded-full border border-line bg-paper px-4 py-2 text-xs"
            >
              Fermer ✕
            </button>
            <div className="h-full overflow-y-auto">
              <InvitationCanvas draft={effectiveDraft} mode="full" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
