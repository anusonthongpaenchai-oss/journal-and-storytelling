import type { FormEvent } from "react";
import { TextAreaField } from "./TextAreaField";
import { Button } from "@/components/ui/Button";

type CommentBoxProps = {
  value?: string;
  gap?: string;
  onChange?: (value: string) => void;
  onSubmit: () => void;
};

export function CommentBox({
  value,
  gap = 'gap-[8px]',
  onChange,
  onSubmit,
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
      />

      <div className="flex w-[121px] self-end">
          <Button
            type="submit"
            label="Send"
            variant="primary"
          />
      </div>

    </form>
  );
}
