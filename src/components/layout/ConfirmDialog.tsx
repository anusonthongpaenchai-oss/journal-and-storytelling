import { X } from "lucide-react";

import { Button } from "../ui/Button";

type ConfirmDialogProps = {
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({
  title,
  description,
  confirmLabel,
  cancelLabel,
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <div
      className="
        fixed inset-0
        flex items-center justify-center
        px-[16px]
        bg-black/30
      "
    >
      <div
        className="
          flex flex-col
          gap-[24px]
          p-6
          md:w-[477px]
          bg-brown-100
          rounded-[16px]
          md:px-[24px] md:pt-[16px] md:pb-[40px]
        "
      >
        <button
          type="button"
          onClick={onCancel}
          aria-label="Close dialog"
          className="
            flex justify-end
            text-brown-600
          "
        >
          <X />
        </button>

        <div className="flex flex-col items-center gap-[24px] text-center">
          <h2 className="text-headline-3 text-brown-600">
            {title}
          </h2>

          <p className="text-body-1 text-brown-400">
            {description}
          </p>

          <div className="flex gap-[8px]">
            <Button
              label={cancelLabel}
              variant="secondary"
              width="w-[138px]"
              onClick={onCancel}
            />

            <Button
              label={confirmLabel}
              variant="primary"
              width="w-[138px]"
              onClick={onConfirm}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
