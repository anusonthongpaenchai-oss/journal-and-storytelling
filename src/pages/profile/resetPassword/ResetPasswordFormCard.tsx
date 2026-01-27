import { FormInput } from "@/components/layout/FormInput";
import { Button } from "@/components/ui/Button";

type FormErrors = {
  currentPassword?: boolean;
  newPassword?: boolean;
  confirmPassword?: boolean;
};

type ResetPasswordFormCardProps = {
  isError: FormErrors;
  currentPassword: string;
  setCurrentPassword: (value: string) => void;
  newPassword: string;
  setNewPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

function ResetPasswordFormCard({
  isError,
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  onSubmit,
}: ResetPasswordFormCardProps) {
  return (
    <div
      className="
        flex flex-col
        gap-[24px] md:gap-[40px]
        px-[16px] pt-[24px] pb-[40px]
        w-[375px]
        bg-brown-200
        md:w-[550px]
        md:p-[40px]
        md:rounded-[16px]
      "
    >
      <form
        id="reset-form"
        onSubmit={onSubmit}
        className="flex flex-col gap-[24px]"
      >
        {/* Browser autocomplete workaround:
            provide hidden username/email fields so password managers
            correctly associate current/new password inputs */}
        <input
          type="text"
          name="username"
          autoComplete="username"
          className="hidden"
        />
        <input
          type="text"
          name="email"
          autoComplete="email"
          className="hidden"
        />

        <FormInput
          label="Current password"
          type="password"
          placeholder="Current password"
          value={currentPassword}
          variant={isError.currentPassword ? "secondary" : "primary"}
          onChange={setCurrentPassword}
          autoComplete="current-password"
        />

        <FormInput
          label="New password"
          type="password"
          placeholder="New password"
          value={newPassword}
          variant={isError.newPassword ? "secondary" : "primary"}
          onChange={setNewPassword}
          autoComplete="new-password"
        />

        <FormInput
          label="Confirm new password"
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          variant={isError.confirmPassword ? "secondary" : "primary"}
          onChange={setConfirmPassword}
          autoComplete="new-password"
        />
      </form>

      <Button
        type="submit"
        label="Reset password"
        form="reset-form"
        variant="primary"
        width="w-[208px]"
      />
    </div>
  );
}

export default ResetPasswordFormCard;
