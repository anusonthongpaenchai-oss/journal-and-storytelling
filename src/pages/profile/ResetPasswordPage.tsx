import { useState } from "react";
import axios from "axios";

import ProfileTemplate from "./ProfileTemplate";
import ResetPasswordFormCard from "./resetPassword/ResetPasswordFormCard";
import ConfirmDialog from "@/components/layout/ConfirmDialog";
import { Alert } from "@/components/feedback/Alert";

type FormErrors = {
  currentPassword?: boolean;
  newPassword?: boolean;
  confirmPassword?: boolean;
};

type Feedback = {
  title: string;
  description: string;
  variant: "primary" | "secondary";
};

function ResetPasswordPage() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [isConfirm, setIsConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState<FormErrors>({});
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function validate(): boolean {
    const nextErrors: FormErrors = {};

    if (!currentPassword.trim()) {
      nextErrors.currentPassword = true;
    }

    if (!newPassword.trim() || newPassword.length < 6) {
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

  async function handleReset() {
    if (!API_BASE_URL) {
      setFeedback({
        title: "Reset password failed",
        description: "API base URL is not configured",
        variant: "secondary",
      });
      setIsConfirm(false);
      return;
    }

    try {
      setIsSubmitting(true);

      await axios.patch(`${API_BASE_URL}/setting/reset-password`, {
        oldPassword: currentPassword,
        newPassword,
      });

      setFeedback({
        title: "Password updated",
        description: "Your password has been successfully updated",
        variant: "primary",
      });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsError({});
    } catch (error) {
      let message = "Please try again later.";
      let isInvalidCurrentPassword = false;

      if (axios.isAxiosError<{ error?: string }>(error)) {
        message = error.response?.data?.error || message;
        isInvalidCurrentPassword = message.toLowerCase().includes("old password");
      }

      if (isInvalidCurrentPassword) {
        setIsError((prev) => ({
          ...prev,
          currentPassword: true,
        }));
      }

      setFeedback({
        title: "Reset password failed",
        description: message,
        variant: "secondary",
      });
    } finally {
      setIsSubmitting(false);
      setIsConfirm(false);
    }
  }

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
            isSubmitting={isSubmitting}
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
          onConfirm={() => {
            void handleReset();
          }}
        />
      )}

      {feedback && (
        <div
          className="
            sticky bottom-2
            px-2
            z-50
            md:fixed md:bottom-6 md:right-6
          "
        >
          <Alert
            title={feedback.title}
            description={feedback.description}
            variant={feedback.variant}
            onClose={() => setFeedback(null)}
            timeout={3000}
          />
        </div>
      )}
    </div>
  );
}

export default ResetPasswordPage;
