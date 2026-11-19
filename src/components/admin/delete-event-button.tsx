
"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, Trash2 } from "lucide-react";

import { deleteSchoolEvent } from
  "@/app/admin/(protected)/events/actions";

type DeleteEventButtonProps = {
  id: string;
  title: string;
};

export default function DeleteEventButton({
  id,
  title,
}: DeleteEventButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"?\n\nThis action cannot be undone.`
    );

    if (!confirmed) return;

    startTransition(async () => {
      try {
        const result = await deleteSchoolEvent(id);

        if (!result.success) {
          window.alert(result.message);
          return;
        }

        router.refresh();
      } catch {
        window.alert(
          "Unable to delete the event. Please try again."
        );
      }
    });
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
    >
      {isPending ? (
        <LoaderCircle
          size={15}
          className="animate-spin"
        />
      ) : (
        <Trash2 size={15} />
      )}

      Delete
    </button>
  );
}
