import type { FormEvent } from "react";
import { TextAreaField } from "./TextAreaField";
import { Button } from "@/components/ui/Button";

type CommentBoxProps = {
  value?: string;
  gap?: string;
  onChange?: (value: string) => void;
  onSubmit: () => void | Promise<void>;
  isInvalid?: boolean;
  isSubmitting?: boolean;
};

export function CommentBox({
  value,
  gap = 'gap-[8px]',
  onChange,
  onSubmit,
  isInvalid = false,
  isSubmitting = false,
}: CommentBoxProps) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`
        flex flex-col
        ${gap}
      `}
    >
      <TextAreaField
        label="Comment"
        placeholder="What are your thoughts?"
        value={value}
        onChange={onChange}
        isInvalid={isInvalid}
      />

      <div className="flex w-[121px] self-end">
        <Button
          type="submit"
          label={isSubmitting ? "Sending..." : "Send"}
          variant="primary"
          disabled={isSubmitting}
        />
      </div>

    </form>
  );
}
