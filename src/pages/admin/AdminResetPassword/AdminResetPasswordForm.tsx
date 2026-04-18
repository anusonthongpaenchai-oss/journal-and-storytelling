import { FormInput } from "@/components/layout/FormInput";
import { Button } from "@/components/ui/Button";

type FormErrors = {
  currentPassword?: boolean;
  newPassword?: boolean;
  confirmPassword?: boolean;
};

type AdminResetPasswordFormProps = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  isError: FormErrors;
  isSubmitting?: boolean;
  onCurrentPasswordChange: (value: string) => void;
  onNewPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

function AdminResetPasswordForm({
  currentPassword,
  newPassword,
  confirmPassword,
  isError,
  isSubmitting = false,
  onCurrentPasswordChange,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
}: AdminResetPasswordFormProps) {
  return (
    <section className="bg-brown-100">
      <header className="flex items-center justify-between border-b border-brown-300 bg-white px-[40px] py-[24px]">
        <h1 className="text-headline-3 text-brown-600">Reset password</h1>

        <Button
          label={isSubmitting ? "Resetting..." : "Reset password"}
          type="submit"
          form="admin-reset-password-form"
          variant="primary"
          width="w-[172px]"
          disabled={isSubmitting}
        />
      </header>

      <div className="px-[40px] py-[28px]">
        <form
          id="admin-reset-password-form"
          onSubmit={onSubmit}
          className="flex max-w-[368px] flex-col gap-[24px]"
        >
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
            onChange={onCurrentPasswordChange}
            autoComplete="current-password"
          />

          <FormInput
            label="New password"
            type="password"
            placeholder="New password"
            value={newPassword}
            variant={isError.newPassword ? "secondary" : "primary"}
            onChange={onNewPasswordChange}
            autoComplete="new-password"
          />

          <FormInput
            label="Confirm new password"
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            variant={isError.confirmPassword ? "secondary" : "primary"}
            onChange={onConfirmPasswordChange}
            autoComplete="new-password"
          />
        </form>
      </div>
    </section>
  );
}

export default AdminResetPasswordForm;
