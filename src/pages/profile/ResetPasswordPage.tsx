import { useState } from "react";

import ProfileTemplate from "./ProfileTemplate";
import ResetPasswordFormCard from "./resetPassword/ResetPasswordFormCard";
import ConfirmDialog from "@/components/layout/ConfirmDialog";

import { testAccount } from "@/lib/mocks/dataProfile";

type FormErrors = {
  currentPassword?: boolean;
  newPassword?: boolean;
  confirmPassword?: boolean;
};

function ResetPasswordPage() {
  // ===== UI State =====
  // Control confirm dialog visibility
  const [isConfirm, setIsConfirm] = useState(false);

  // ===== Form State =====
  const [isError, setIsError] = useState<FormErrors>({});
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ===== Validation =====
  // Responsibility: validate reset password form before confirmation
  function validate(): boolean {
    const nextErrors: FormErrors = {};

    if (currentPassword !== testAccount.password) {
      nextErrors.currentPassword = true;
    }

    if (!newPassword.trim()) {
      nextErrors.newPassword = true;
    }

    if (!confirmPassword.trim()) {
      nextErrors.confirmPassword = true;
    }

    if (newPassword !== confirmPassword) {
      nextErrors.newPassword = true;
      nextErrors.confirmPassword = true;
    }

    setIsError(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  // ===== Reset Action =====
  // Responsibility: perform password reset after confirmation
  function handleReset() {
    alert("Reset แล้วจ้า");

    setIsConfirm(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }

  // ===== Form Submission =====
  // Responsibility: validate form and open confirmation dialog
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;

    setIsConfirm(true);
  }

  return (
    <div className="flex flex-col">
      <ProfileTemplate
        component={
          <ResetPasswordFormCard
            isError={isError}
            currentPassword={currentPassword}
            setCurrentPassword={setCurrentPassword}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            onSubmit={handleSubmit}
          />
        }
      />

      {isConfirm && (
        <ConfirmDialog
          title="Reset password"
          description="Do you want to reset your password?"
          confirmLabel="Reset"
          cancelLabel="Cancel"
          onCancel={() => setIsConfirm(false)}
          onConfirm={handleReset}
        />
      )}
    </div>
  );
}

export default ResetPasswordPage;
